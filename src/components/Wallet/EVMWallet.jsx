import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectMetaMask } from "./ConnectWalletHelper";
import { useDispatch, useSelector } from "react-redux";
import MetaMask from "../../assets/img/wallet/MetaMask.svg";
import WalletConnect from "../../assets/img/wallet/WalletConnect 3.svg";
import TrustWallet from "../../assets/img/wallet/TWT.svg";
import { isEVM } from "../../wallet/oldHelper";
import { setAccount, setMetaMask, setWrongNetwork } from "../../store/reducers/generalSlice";
import { CHAIN_INFO, TESTNET_CHAIN_INFO } from "../values";

export default function EVMWallet({ wallet, close }) {
  const { chainId, account, activate } = useWeb3React();
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  // console.log("🚀 ~ file: EVMWallet.jsx ~ line 15 ~ EVMWallet ~ chainId", chainId)
  const from = useSelector(state => state.general.from);
  const dispatch = useDispatch()
  const getMobOps = () =>  /android/i.test(navigator.userAgent || navigator.vendor || window.opera) ? true : false;
  const testnet = useSelector((state) => state.general.testNet);

  
  const connectHandler = async () => {
     const connected = await connectMetaMask(activate, from?.text)
     if(connected){
       dispatch(setMetaMask(true))
       close()
     }
  }

  useEffect(() => {
    if(account)
    dispatch(setAccount(account))
  }, [account])
  

  return wallet === "MetaMask" /* METAMASK */ ? (
    <li
      onClick={connectHandler}
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
