import { InjectedConnector } from "@web3-react/injected-connector";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

export const injected = new InjectedConnector({});

export const algoConnector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
  });

  
  export const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          137: 'https://rpc-mainnet.matic.network'
        },
        chainId: 137
      }
    }
  }
  export const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });