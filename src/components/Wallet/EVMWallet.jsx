import React from "react";
import { useWeb3React } from "@web3-react/core";
import { connectMetaMask } from "../ConnectWalletHelper";
import { useSelector } from "react-redux";
import MetaMask from "../../assets/img/wallet/MetaMask.svg";
import WalletConnect from "../../assets/img/wallet/WalletConnect 3.svg";
import TrustWallet from "../../assets/img/wallet/TWT.svg";
import { isEVM } from "../../wallet/oldHelper";

export default function EVMWallet({ wallet }) {
  const { activate } = useWeb3React();
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const getMobOps = () =>
    /android/i.test(navigator.userAgent || navigator.vendor || window.opera)
      ? true
      : false;

  return wallet === "MetaMask" /* METAMASK */ ? (
    <li
      onClick={() => connectMetaMask(activate)}
      style={from?.type === "EVM" ? {} : OFF}
      className="wllListItem"
      data-wallet="MetaMask"
    >
      <img src={MetaMask} alt="MetaMask Icon" /> MetaMask
    </li>
  ) : wallet === "TrustWallet" /* TRUST WALLET */ ? (
    <li
      onClick={() => connectMetaMask(activate)}
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
