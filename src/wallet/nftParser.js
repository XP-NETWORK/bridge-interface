import { nftGeneralParser } from "nft-parser/dist/src/index";
import store from "../store/store";
import { setEachClaimables, setCurrentNFT } from "../store/reducers/generalSlice";

import CacheService from "../services/cacheService";

import { CHAIN_INFO, v3_ChainId } from "xp.network";

import { v3_bridge_mode } from "../components/values";

const cache = CacheService();

export const parseNFT = async (serviceContainer, nft, index, testnet, claimable) => {
    //const { uri } = nft;

    // console.log(serviceContainer);
    const { bridge, whitelistedPool } = serviceContainer;

    const {
        general: { from, account },
    } = store.getState();

    const chainConfig = CHAIN_INFO.get(Number(from.nonce));
    const v3 = v3_bridge_mode && chainConfig.v3_chainId !== v3_ChainId.DEFAULT;

    if (!claimable) {
        const [nftRes, whitelistedRes] = await Promise.allSettled([
            (async () => {
                const unwraped = v3 ? await bridge.v3_unwrap(nft) : await bridge.unwrap(nft);

                const {
                    chainId,
                    tokenId,
                    contract,
                    nft: { native, isWrappedNft },
                } = unwraped;

                let nftData;

                try {
                    //if (testnet) throw new Error("Testnet exception");
                    const res = await cache.get({ chainId, tokenId, contract }, unwraped.nft);

                    nftData = res.data;
                } catch (e) {
                    nftData = await nftGeneralParser(nft, account, undefined);
                }
                if (!nftData || nftData === "no NFT with that data was found") {
                    nftData = await cache.add(unwraped.nft, account, undefined);

                    if (/(That nft is already caching|key parameter missing)/.test(nftData)) return undefined;
                }

                return {
                    ...nftData,
                    wrapped: isWrappedNft
                        ? {
                              origin: native.chainId,
                              contract: native.contract,
                          }
                        : undefined,
                };
            })(),
            !testnet
                ? !cache.isRestricted(nft.uri)
                    ? whitelistedPool.add(bridge.isWhitelisted.bind(bridge))(from.nonce, nft)
                    : true
                : true,
        ]);

        const nftData = nftRes.status === "fulfilled" ? nftRes.value : undefined;

        const whitelisted = whitelistedRes.status === "fulfilled" ? whitelistedRes.value : undefined;
        //v3 && console.log(nftData?.metaData || nftData);
        const nftObj = {
            ...nft,
            ...(nftData?.metaData || nftData),
            origin: nftData?.wrapped?.origin || nft.native.chainId,
            wrapped: nftData?.wrapped,
            dataLoaded: true,
            whitelisted,
        };

        /*if (
            !NFTList[index]?.dataLoaded ||
            !NFTList[index]?.image ||
            !NFTList[index]?.animation_url
        ) {*/
        store.dispatch(setCurrentNFT({ nft: nftObj, index }));
        //}
    } else {
        const unwraped = await bridge.unwrap(nft);

        const { chainId, tokenId, contract } = unwraped;
        const claimableData = (await cache.get({ chainId, tokenId, contract }, nft)).data;

        store.dispatch(
            setEachClaimables({
                nftObj: {
                    ...nft,
                    ...claimableData,
                    native: {},
                    dataLoaded: true,
                    whitelisted: true,
                },
                index,
            })
        );
    }
};
