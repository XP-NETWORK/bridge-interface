import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBigLoader,
  setRefreshSecret,
  setNFTList,
  setPreloadNFTs,
  setError,
} from "../../store/reducers/generalSlice";

import { ReactComponent as RefreshComp } from "../../assets/img/refresh.svg";

import { setIsEmpty } from "../../store/reducers/paginationSlice";

import { withServices } from "../App/hocs/withServices";

export default withServices(function Refresh({ serviceContainer }) {
  const {
    algorandAccount,
    from,
    nfts,
    tronWallet,
    elrondAccount,
    tezosAccount,
    account,
    bigLoader,
    secretAccount,
    secretLoggedIn,
    hederaAccount,
    tonAccount,
  } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  const { bridge } = serviceContainer;

  const refresh = async () => {
    if (!bigLoader || !nfts) {
      let w;
      if (
        from.type === "EVM" ||
        from.type === "VeChain" ||
        from.type === "Skale"
      )
        w = account;
      else if (from.type === "Tezos") w = tezosAccount;
      else if (from.type === "Algorand") w = algorandAccount;
      else if (from.type === "Elrond") w = elrondAccount;
      else if (from.type === "Tron") w = tronWallet;
      else if (from.type === "Hedera") w = hederaAccount;
      else if (from.type === "TON") w = tonAccount;
      else if (from.type === "NEAR") w = account;

      const fromChain = await bridge.getChain(from.nonce);
      dispatch(setBigLoader(true));
      try {
        let nfts = await fromChain.getNFTs(bridge.checkWallet || w);
        nfts = fromChain.filterNFTs(nfts);

        if (nfts.length < 1) {
          dispatch(setIsEmpty(true));
        } else {
          dispatch(setIsEmpty(false));
        }

        dispatch(setPreloadNFTs(nfts.length));
        dispatch(setNFTList(nfts));
        dispatch(setBigLoader(false));
      } catch (error) {
        console.log(error);
        dispatch(setBigLoader(false));
        dispatch(setNFTList([]));
        dispatch(setError(error.data ? error.data.message : error.message));
      }
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
});
