import React from 'react'
import { useSelector } from 'react-redux';
import { setNFTS } from "../../wallet/helpers";
// import Refresh from "../../assets/img/refresh.svg";

export default function Refresh() {

    const { algorandAccount, from, nfts, tronWallet, elrondAccount, tezosAccount, account, bigLoader } = useSelector((state) => state.general);


      const refresh = async () => {
        if (!bigLoader || !nfts) {
          let w;
          if (from.type === "EVM") w = account;
          else if (from.type === "Tezos") w = tezosAccount;
          else if (from.type === "Algorand") w = algorandAccount;
          else if (from.type === "Elrond") w = elrondAccount;
          else if (from.type === "Tron") w = tronWallet;
          await setNFTS(w, from.key);
        }
      };

  return (
    <span className={bigLoader ? 'refresh-button--disabled' : 'refresh-button'} onClick={refresh}></span>
  )
}
