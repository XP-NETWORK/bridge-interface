//import requestPool from "./requestPool";
import { isWhiteListed } from "./../components/NFT/NFTHelper";
import axios from "axios";
import { nftGeneralParser } from "nft-parser/dist/src/index";
import store from "../store/store";
import { setEachNFT } from "../store/reducers/paginationSlice";
import { parseEachNFT } from "./helpers";

import CacheService from "../services/cacheService";
import WhiteListedPool from "../services/whiteListedPool";

const cache = CacheService();
const whiteListedPool = WhiteListedPool();

/**
 * 
 * const erc7 = UserNftMinter__factory.connect(id.contract, provider);
        ret.uri = await tryCatchUndef(() => erc7.tokenURI(id.tokenId));
 */

export const parseNFT = (factory) => async (nft, index, testnet, claimable) => {
    const { uri } = nft;

    nft = {
        ...nft,
        collectionIdent: nft.native?.contract || nft.collectionIdent,
    };

    let whitelisted = !testnet
        ? nft?.native?.contract === "0xED1eFC6EFCEAAB9F6d609feC89c9E675Bf1efB0a"
            ? false
            : undefined
        : true;

    let nftObj = {
        uri,
        collectionIdent: nft.collectionIdent || undefined,
        native: { ...nft.native },
        dataLoaded: true,
        whitelisted,
        nftId: nft.nftId || undefined,
        appId: nft.appId || undefined,
    };
    const {
        general: { from, NFTList, account },
    } = store.getState();

    if (!claimable) {
        const [nftObject, wlListed] = await Promise.allSettled([
            (async () => {
                let chainId, tokenId, contract;

                if (/(wnfts\.xp\.network|nft\.xp\.network)/.test(nft.uri)) {
                    const res = await axios(nft.uri);

                    const { data } = res;

                    chainId = data.wrapped?.origin;
                    tokenId = data.wrapped?.tokenId;
                    contract = data.wrapped?.contract;
                } else {
                    chainId = nft.native?.chainId;
                    tokenId = nft.native?.tokenId;
                    contract = nft.collectionIdent;
                }

                const res = await cache.get(
                    { chainId, tokenId, contract },
                    nft
                );

                if (
                    (res && res.data === "no NFT with that data was found") ||
                    res === "error"
                ) {
                    const parsed = await nftGeneralParser(
                        nft,
                        account,
                        whitelisted,
                        factory
                    );
                    return {
                        data: parsed,
                        toCache: true,
                    };
                } else {
                    return {
                        data: res.data,
                        toCache: false,
                    };
                }
            })(),
            !testnet
                ? whiteListedPool.add(isWhiteListed)(from.text, nft)
                : true,
        ]);

        const nftObjectResponse =
            nftObject.status === "fulfilled" ? nftObject.value : undefined;
        whitelisted =
            wlListed.status === "fulfilled" ? wlListed.value : undefined;

        if (nftObjectResponse) {
            const { data, toCache } = nftObjectResponse;
            if (toCache) {
                if (data.metaData?.image || data.metaData?.animation_url) {
                    console.log(
                        `caching Nft ${data?.metaData?.name ||
                            data?.native?.name}`
                    );

                    try {
                        !testnet &&
                            whitelisted !== undefined &&
                            cache.add(data, whitelisted);
                    } catch (error) {
                        console.error("nft-cache add: ", error);
                    }
                }
                const dataLoaded = true;
                nftObj = {
                    ...nft,
                    ...data.metaData,
                    wrapped: data.wrapped,
                    dataLoaded,
                    whitelisted,
                };
            } else {
                const dataLoaded = true;
                nftObj = {
                    ...nft,
                    ...data,
                    dataLoaded,
                    whitelisted,
                };
            }
        }

        if (
            !NFTList[index]?.dataLoaded ||
            !NFTList[index]?.image ||
            !NFTList[index]?.animation_url
        ) {
            store.dispatch(setEachNFT({ nftObj, index }));
        }
    } else {
        await parseEachNFT(nft, index, testnet, claimable);
    }
};
