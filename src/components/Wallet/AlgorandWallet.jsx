import React from "react";
import {
  connectAlgoSigner,
  connectMyAlgo,
  connectAlgoWallet,
} from "./ConnectWalletHelper";
import AlgorandWalletIcon from "../../assets/img/wallet/AlgorandWallet.svg";
import MyAlgoBlue from "../../assets/img/wallet/MyAlgoBlue.svg";
import AlgoSignerIcon from "../../assets/img/wallet/Algo Signer.png";
import { useDispatch, useSelector } from "react-redux";
import { id } from "ethers/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { setFrom } from "../../store/reducers/generalSlice";

export default function AlgorandWallet({ wallet, close }) {
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const testnet = useSelector((state) => state.general.testNet);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const truePathname =
    location.pathname === "/" ||
    location.pathname === "/connect" ||
    location.pathname === "/testnet/connect";

  const navigateToAccountRoute = () => {
    navigate(
      testnet
        ? `/testnet/account${location.search ? location.search : ""}`
        : `/account${location.search ? location.search : ""}`
    );
  };

  const connectionHandler = async (wallet) => {
    let connected;
    switch (wallet) {
      case "MyAlgo":
        connected = await connectMyAlgo();
        close();
        if (temporaryFrom) dispatch(setFrom(temporaryFrom));
        if (connected && to) navigateToAccountRoute();
        break;
      case "AlgoSigner":
        connected = await connectAlgoSigner(testnet);
        close();
        if (temporaryFrom) dispatch(setFrom(temporaryFrom));
        if (connected && to) navigateToAccountRoute();
        break;
      case "Algorand Wallet":
        connectAlgoWallet();
        close();
        if (temporaryFrom) dispatch(setFrom(temporaryFrom));
        if (to) navigateToAccountRoute();
        break;
      default:
        break;
    }
  };

  const getStyle = () => {
    // debugger;
    if (temporaryFrom?.type === "Algorand") {
      return {};
    } else if (temporaryFrom && temporaryFrom?.type !== "Algorand") {
      return OFF;
    } else if (!from) {
      return {};
    } else if (from && from.text === "Algorand") {
      return {};
    } else return OFF;
  };

  return wallet === "MyAlgo" ? (
    <li
      style={getStyle()}
      // style={{pointerEvents: "none", opacity: '0.6'}}
      onClick={() => connectionHandler("MyAlgo")}
      className="wllListItem algo"
      data-wallet="MyAlgo"
    >
      <img src={MyAlgoBlue} alt="" />
      <p>MyAlgo</p>
    </li>
  ) : wallet === "AlgoSigner" ? (
    <li
      style={getStyle()}
      // style={{pointerEvents: "none", opacity: '0.6'}}
      onClick={() => connectionHandler("AlgoSigner")}
      data-wallet="AlgoSigner"
      className="wllListItem algo"
    >
      <img src={AlgoSignerIcon} alt="Algor Signer Icon" />
      <p>Algo Signer</p>
    </li>
  ) : (
    <li
      style={getStyle()}
      onClick={() => connectionHandler("Algorand Wallet")}
      data-wallet="Algorand Wallet"
      className="wllListItem algo"
    >
      <img src={AlgorandWalletIcon} alt="Algor Wallet Icon" />
      <p>Algorand Wallet</p>
    </li>
  );
}
