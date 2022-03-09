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

  const connectionHandler = wallet => {
    console.log("jgjsdhfjsfhsjfhs")
    switch (wallet) {
      case "MyAlgo":
        connectMyAlgo()
        break;
      case "AlgoSigner":
        connectAlgoSigner()
        break;
      case "Algorand Wallet":
        connectAlgoWallet()
        break;
      default:
        break;
    }
  }

  return wallet === "MyAlgo" ? (
    <li
      onClick={() => connectionHandler("MyAlgo")}
      className="wllListItem algo"
      data-wallet="MyAlgo"
    >
      <img src={MyAlgoBlue} alt="" /> MyAlgo
    </li>
  ) : wallet === "AlgoSigner" ? (
    <li
      onClick={() => connectionHandler("AlgoSigner")}
      data-wallet="AlgoSigner"
      className="wllListItem algo"
    >
      <img src={AlgoSignerIcon} alt="Algor Signer Icon" /> Algo Signer
    </li>
  ) : (
    <li
      onClick={() => connectionHandler("Algorand Wallet")}
      style={OFF}
      data-wallet="Algorand Wallet"
      className="wllListItem algo"
    >
      <img src={AlgorandWalletIcon} alt="Algor Wallet Icon" /> Algorand Wallet
    </li>
  );
}
