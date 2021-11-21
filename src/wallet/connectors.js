import { InjectedConnector } from "@web3-react/injected-connector";
import {ChainFactory} from "xp.network/dist"
import { ChainData } from "./config";
import {chainsConfig} from '../pages/TransferNFT/components/values'
import { getFactoryParams, getFromParams, moralisParams } from "./helpers";
import {ethers} from 'ethers'
import store from "../store/store";

export const injected = new InjectedConnector({
//   supportedChainIds: [1, 3, 4, 5, 42, 43114, 80001],
});

/**
 * Creates a chain factory from provided params.
 * @param chainParams: {@link ChainParams} - from ChainData(wallet/config.js)
 *
 * @returns a {@link ChainFactory}
 */
export const createChainFactory = (params) => {
  return ChainFactory(moralisParams, params);
};

/**
 * Transfers an NFT.
 * @param fromInnerChain: {@link CrossChainHelper}
 * @param toInnerChain: {@link CrossChainHelper}
 * @param nft: from the nft-list-db
 * @param sender: address/wallet
 * @param receiver: string - receiver address
 * @param factory from {@link createChainFactory}
 * @returns a receipt.
 */
export const transferNft = async (
  fromInnerChain,
  toInnerChain,
  nft,
  sender,
  receiver,
  factory
) => {
  return await factory.transfer(
    toInnerChain,
    fromInnerChain,
    nft,
  sender,
    receiver
  );
};


export const getFactory = async () => {
  const {from, to} = store.getState().general
    const fromParams = await getFromParams()
    const toParams = await getFactoryParams(to)
    console.log(fromParams, toParams,'apramsa')
    return ChainFactory(moralisParams,{
      ...toParams,
      ...fromParams
    })
}