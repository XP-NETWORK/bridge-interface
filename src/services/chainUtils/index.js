import {
    Chain as ChainNonce,
    CHAIN_INFO,
    AppConfigs,
    ChainFactory,
    ChainFactoryConfigs,
  } from "xp.network";

export const calcFees = (fees, nonce) => {

    fees =  fees.multipliedBy(1.1)
    .integerValue()
    //.toString(10);

    const decimals = CHAIN_INFO.get(nonce)?.decimals;

    console.log(decimals, 'decimals');

    return {
        fees: fees.toString(10),
        formatedFees: fees.dividedBy(decimals).toNumber()
    }
}