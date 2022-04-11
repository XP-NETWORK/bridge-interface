import React from "react";
import {
  connectAlgoSigner,
  connectMyAlgo,
  connectAlgoWallet,
} from "./ConnectWalletHelper";
import AlgorandWalletIcon from "../../assets/img/wallet/AlgorandWallet.svg";
import MyAlgoBlue from "../../assets/img/wallet/MyAlgoBlue.svg";
import AlgoSignerIcon from "../../assets/img/wallet/Algo Signer.png";
import { useSelector } from "react-redux";

export default function AlgorandWallet({ wallet }) {
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const testnet = useSelector((state) => state.general.testNet);

  return wallet === "MyAlgo" ? (
    <li
      onClick={connectMyAlgo}
      style={from ? (from.type === "Algorand" ? {} : OFF) : ""}
      className="wllListItem algo"
      data-wallet="MyAlgo"
    >
      <img src={MyAlgoBlue} alt="" /> MyAlgo
    </li>
  ) : wallet === "AlgoSigner" ? (
    <li
      onClick={() => connectAlgoSigner(testnet)}
      data-wallet="AlgoSigner"
      style={
        from
          ? from.type === "Algorand" && window.innerWidth > 600
            ? {}
            : OFF
          : ""
      }
      className="wllListItem algo"
    >
      <img src={AlgoSignerIcon} alt="Algor Signer Icon" /> Algo Signer
    </li>
  ) : (
    <li
      onClick={connectAlgoWallet}
      style={OFF}
      data-wallet="Algorand Wallet"
      className="wllListItem algo"
    >
      <img src={AlgorandWalletIcon} alt="Algor Wallet Icon" /> Algorand Wallet
    </li>
  );
}
