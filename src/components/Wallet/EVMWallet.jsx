import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectMetaMask, onWalletConnect } from "./ConnectWalletHelper";
import { useDispatch, useSelector } from "react-redux";
import MetaMask from "../../assets/img/wallet/MetaMask.svg";
import WalletConnect from "../../assets/img/wallet/WalletConnect 3.svg";
import TrustWallet from "../../assets/img/wallet/TWT.svg";
import { isEVM } from "../../wallet/oldHelper";
import { setAccount, setMetaMask, setWrongNetwork } from "../../store/reducers/generalSlice";
import { CHAIN_INFO, TESTNET_CHAIN_INFO } from "../values";
import { setNFTS } from "../../wallet/helpers";

export default function EVMWallet({ wallet, close }) {
  const { chainId, account, activate } = useWeb3React();
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  // console.log("🚀 ~ file: EVMWallet.jsx ~ line 15 ~ EVMWallet ~ chainId", chainId)
  const from = useSelector(state => state.general.from);
  const to = useSelector(state => state.general.to);
  const dispatch = useDispatch()
  const getMobOps = () =>  /android/i.test(navigator.userAgent || navigator.vendor || window.opera) ? true : false;
  const testnet = useSelector((state) => state.general.testNet);

  
  const connectHandler = async wallet => {
     switch (wallet) {
        case "MetaMask":
        const connected = await connectMetaMask(activate, from?.text, to?.text)
        if(connected){
          dispatch(setMetaMask(true))
          close()
        }
        break;
        case "TrustWallet":
        break;
        case "WalletConnect":
        onWalletConnect(activate, from.text)
        close()
        break;
        default:
        break;
     }
  }

  const getStyle = () => {
    if(!from){
      return {}
    }
    else if(from && from.type === "EVM"){
      return {}
    }
    else if((from.type === "EVM" && getMobOps() && window.innerWidth <= 600) 
    || (window.ethereum && window.innerWidth <= 600 && from.type === "EVM")){
      return {}
    }
    else return OFF
  }

  useEffect(() => {
    if(account)
    dispatch(setAccount(account))
  }, [account])
  

  return wallet === "MetaMask" /* METAMASK */ ? (
    <li 
      style={getStyle()}
      onClick={() => connectHandler("MetaMask")}
      className="wllListItem"
      data-wallet="MetaMask"
    >
      <img src={MetaMask} alt="MetaMask Icon" />
      <p>MetaMask</p>
    </li>
  ) : wallet === "TrustWallet" /* TRUST WALLET */ ? (
    <li
    
      onClick={connectHandler}
      style={getStyle()}
      data-wallet="TrustWallet"
      className="wllListItem"
    >
      <img src={TrustWallet} alt="WalletConnect Icon" />
      <p>Trust Wallet</p>
    </li>
  ) : from && from.type === "EVM" && from.text !== "Velas" &&  from.text !== "Iotex" &&  from.text !== "Fuse" ? 
    /* WALLET CONNECT */
    <li onClick={() => connectHandler("WalletConnect")}  className="wllListItem" data-wallet="WalletConnect">
      <img src={WalletConnect} alt="WalletConnect Icon" />
      <p>WalletConnect</p>
    </li>:''
  ;
}
