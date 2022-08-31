import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setBigLoader,
    setRefreshSecret,
} from "../../store/reducers/generalSlice";
import { getAlgorandClaimables, setNFTS } from "../../wallet/helpers";
import { ReactComponent as RefreshComp } from "../../assets/img/refresh.svg";

export default function Refresh() {
    const {
        algorandAccount,
        from,
        nfts,
        tronWallet,
        elrondAccount,
        tezosAccount,
        account,
        bigLoader,
        testNet,
        secretAccount,
        secretLoggedIn,
        hederaAccount,
    } = useSelector((state) => state.general);
    const dispatch = useDispatch();

    const refresh = async () => {
        // debugger;
        if (!bigLoader || !nfts) {
            let w;
            if (from.type === "EVM" || from.type === "VeChain") w = account;
            else if (from.type === "Tezos") w = tezosAccount;
            else if (from.type === "Algorand") w = algorandAccount;
            else if (from.type === "Elrond") w = elrondAccount;
            else if (from.type === "Tron") w = tronWallet;
            else if (from.type === "Hedera") w = hederaAccount;
            await setNFTS(w, from.key, testNet, "refresh");
            // if(from.type === "Algorand"){
            //   await getAlgorandClaimables(algorandAccount)
            // }
        }
    };

    const refreshSecret = () => {
        if (secretLoggedIn) {
            dispatch(setBigLoader(true));
            dispatch(setRefreshSecret());
        }
    };

  return (
    <span
      className={bigLoader ? "refresh-button--disabled" : "refresh-button"}
      onClick={secretAccount ? refreshSecret : refresh}
    >
      <RefreshComp className="svgWidget" />
    </span>
  );
}
