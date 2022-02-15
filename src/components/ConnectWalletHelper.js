

import { injected, algoConnector } from "../wallet/connectors"
import { useWeb3React } from "@web3-react/core";
import store  from "../store/store"
import { setTronWallet, setAccount, setConfirmMaiarMob, setAlgorandWallet, setTronLink, setMetaMask, setTronLoginError, setStep, setOnMaiar, setWrongNetwork, setElrondAccount, setMaiarProvider, setReset, setOnWC, setWC, setError, setTronPopUp, setTrustWallet, setAlgoSigner, setAlgorandAccount, setMyAlgo, setTezosAccount, setKukaiWallet, setTempleWallet } from "../store/reducers/generalSlice"

// const { chainId, account, activate  } = useWeb3React();

const { to, from } = store.getState()


// EVM type connection  (MetaMask )
export const connectMetaMask = async activate => {
    try {
        if(!window.ethereum && window.innerWidth <= 600) {
            const uri = `https://metamask.app.link/dapp/${window.location.host + `?to=${to.text}&from=${from.text}`}/`
          window.open(uri)
        }
        await activate(injected);
        store.dispatch(setMetaMask(true))
      } 
      catch (ex) {
          store.dispatch(setError(ex))
          if(ex.data){
            console.log(ex.data.message);
          }
          else console.log(ex);
      }
}

export const connectAlgoWallet = async () => {
      
    if (!algoConnector.connected) {
        algoConnector.createSession()   
    }
  }