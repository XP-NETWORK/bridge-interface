import { isWhiteListed } from "./../components/NFT/NFTHelper";
import axios from "axios";
import { nftGeneralParser } from "nft-parser/dist/src/index";
import store from "../store/store";
import { setEachNFT } from "../store/reducers/generalSlice";
import { parseEachNFT } from "./helpers";

import CacheService from "../services/cacheService";
import WhiteListedPool from "../services/whiteListedPool";
import EvmSerivce from "../services/chains/evm";

const cache = CacheService();
const whiteListedPool = WhiteListedPool();
const evm = EvmSerivce();

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
    const [nftRes, whitelistedRes] = await Promise.allSettled([
      (async () => {
        const { chainId, tokenId, contract } = await cache.unwrap(nft);

        let nftData;

        try {
          if (testnet) throw new Error("Testnet exception");
          nftData = (await cache.get({ chainId, tokenId, contract }, nft)).data;
        } catch (e) {
          nftData = await nftGeneralParser(nft, account, whitelisted);
        }

        if (nftData === "no NFT with that data was found") {
          console.log(`caching Nft ${nft?.native?.name}`);

          if (!nft.uri) {
            evm.init(factory);
            nft = await evm.getUri(nft, nft.collectionIdent);
          }

          nftData = await cache.add(nft, account, whitelisted);

          if (nftData === "That nft is already caching") return undefined;
        }

        return nftData;
      })(),
      !testnet
        ? !cache.isRestricted(nft.uri)
          ? whiteListedPool.add(isWhiteListed)(from.text, nft)
          : true
        : true,
    ]);

    const nftData = nftRes.status === "fulfilled" ? nftRes.value : undefined;

    whitelisted =
      whitelistedRes.status === "fulfilled" ? whitelistedRes.value : undefined;

    if (!nftData) return;

    nftObj = {
      ...nft,
      ...(nftData.metaData || nftData),
      wrapped: nftData.wrapped,
      dataLoaded: true,
      whitelisted,
    };

    //if (cache.isRestricted(nftObj?.image)) nft = cache.preventRestricted(nft);

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
