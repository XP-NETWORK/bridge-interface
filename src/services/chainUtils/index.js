/* eslint-disable no-unused-vars */

import {
  Chain as ChainNonce,
  CHAIN_INFO,
  AppConfigs,
  ChainFactory,
  ChainFactoryConfigs,
} from "xp.network";

export const calcFees = (fees, nonce) => {
  fees = fees.multipliedBy(1.1).integerValue();

  const decimals = CHAIN_INFO.get(nonce)?.decimals;

  return {
    fees: fees.toString(10),
    formatedFees: fees.dividedBy(decimals).toNumber(),
  };
};
