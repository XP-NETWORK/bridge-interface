import React from "react";
import { useWeb3React } from "@web3-react/core";
import { connectMetaMask } from "./ConnectWalletHelper";
import { useDispatch, useSelector } from "react-redux";
import MetaMask from "../../assets/img/wallet/MetaMask.svg";
import WalletConnect from "../../assets/img/wallet/WalletConnect 3.svg";
import TrustWallet from "../../assets/img/wallet/TWT.svg";
import { isEVM } from "../../wallet/oldHelper";
import { setAccount, setWrongNetwork } from "../../store/reducers/generalSlice";
import { CHAIN_INFO, TESTNET_CHAIN_INFO } from "../values";

export default function EVMWallet({ wallet }) {
  const { activate } = useWeb3React();
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector(state => state.general.from);
  const dispatch = useDispatch()
  const getMobOps = () =>  /android/i.test(navigator.userAgent || navigator.vendor || window.opera) ? true : false;
  const testnet = useSelector((state) => state.general.testNet);

  
  const connectHandler = async () => {
     const connected = await connectMetaMask(activate, from?.text)
  }

  return wallet === "MetaMask" /* METAMASK */ ? (
    <li
      onClick={connectHandler}
      // style={from?.type === "EVM" ? {} : OFF}
      className="wllListItem"
      data-wallet="MetaMask"
    >
      <img src={MetaMask} alt="MetaMask Icon" /> MetaMask
    </li>
  ) : wallet === "TrustWallet" /* TRUST WALLET */ ? (
    <li
      onClick={connectHandler}
      style={
        (getMobOps() && window.innerWidth <= 600 && isEVM()) ||
        (window.ethereum && window.innerWidth <= 600)
          ? {}
          : OFF
      }
      data-wallet="TrustWallet"
      className="wllListItem"
    >
      <img src={TrustWallet} alt="WalletConnect Icon" />
      Trust Wallet
    </li>
  ) : (
    /* WALLET CONNECT */
    <li style={OFF} className="wllListItem" data-wallet="WalletConnect">
      <img src={WalletConnect} alt="WalletConnect Icon" />
      WalletConnect
    </li>
  );
}
