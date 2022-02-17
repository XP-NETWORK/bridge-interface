import React from 'react'
import { useWeb3React } from "@web3-react/core";
import { connectMetaMask, connectAlgoSigner, connectTempleWallet, connectBeacon } from "./ConnectWalletHelper"
import { useSelector } from 'react-redux';
import MetaMask from '../../assets/img/wallet/MetaMask.svg';
import WalletConnect from "../../assets/img/wallet/WalletConnect 3.svg"
import TrustWallet from "../../assets/img/wallet/TWT.svg"
import { isEVM } from '../../wallet/oldHelper';

export default function EVMWallt({ wallet }) {

    const { activate  } = useWeb3React();
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const from = useSelector(state => state.general.from)
    function getMobOps() {
        // debugger
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
        if (/android/i.test(userAgent)) {
            return true
        }
    }

  return wallet === "MetaMask" ? <li onClick={() => connectMetaMask(activate)} style={ from.type === "EVM" ? {} : OFF } className="wllListItem"><img src={MetaMask} alt="MetaMask Icon" /> MetaMask</li> 
  : wallet === "TrustWallet" ? <li  style={(getMobOps() && window.innerWidth <= 600 && isEVM()) || (window.ethereum && window.innerWidth <= 600) ? {} : OFF } className="wllListItem"><img src={TrustWallet} alt="WalletConnect Icon" /> Trust Wallet</li>
  : <li  style={  OFF } className="wllListItem"><img src={WalletConnect} alt="WalletConnect Icon" /> WalletConnect</li>

}
