import React, { useEffect, useState, useCallback } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import Close from '../assets/img/icons/close.svg';
import MetaMask from '../assets/img/wallet/MetaMask.svg';
import Tron from '../assets/img/wallet/TronLink.svg';
import Elrond from '../assets/img/wallet/Elrond.svg';
import MyAlgoBlue from "../assets/img/wallet/MyAlgoBlue.svg"
import Ledger from '../assets/img/wallet/Ledger.svg';
import AlgoSignerIcon from '../assets/img/wallet/Algo Signer.png';
import Maiar from '../assets/img/wallet/Maiar.svg';
import Trezor from '../assets/img/wallet/Trezor.svg';
import TrustWallet from "../assets/img/wallet/TWT.svg"
import Kukai from "../assets/img/wallet/kukai.svg"
import BeaconW from "../assets/img/wallet/BeaconWhite.svg"
import BeaconB from "../assets/img/wallet/BeaconBlue.svg"
import Temple from "../assets/img/wallet/Temple.svg"
import WalletConnect from "../assets/img/wallet/WalletConnect 3.svg"
import NFTworng from './NFTworng';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from "@web3-react/core";
import { injected, algoConnector } from "../wallet/connectors"
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { EVM, ELROND, chainsConfig } from "../components/values"
import { setTronWallet, setAccount, setConfirmMaiarMob, setAlgorandWallet, setTronLink, setMetaMask, setTronLoginError, setStep, setOnMaiar, setWrongNetwork, setElrondAccount, setMaiarProvider, setReset, setOnWC, setWC, setError, setTronPopUp, setTrustWallet, setAlgoSigner, setAlgorandAccount, setMyAlgo, setTezosAccount, setKukaiWallet, setTempleWallet } from "../store/reducers/generalSlice"
import { Address, ExtensionProvider, WalletConnectProvider, ProxyProvider } from "@elrondnetwork/erdjs"
import { CHAIN_INFO } from '../components/values';
import QRCode from 'qrcode'
import MaiarModal from './MaiarModal';
import { isEVM } from '../wallet/oldHelper';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TempleWallet } from "@temple-wallet/dapp";
import { DAppClient } from "@airgap/beacon-sdk";


function ConnectWallet() {

    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const [show, setShow] = useState();
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const handleClose = () => { 
      setShow(false)
      if(strQR){
        setStrQr('')
      }
    }
    const handleShow = () => setShow(true);
    const kukaiWallet = useSelector(state => state.general.kukaiWallet)
    const templeWallet = useSelector(state => state.general.templeWallet)
    const metaMask = useSelector(state => state.general.MetaMask)
    const tronLink = useSelector(state => state.general.tronLink)
    const trustWallet = useSelector(state => state.general.trustWallet)
    const AlgoSigner = useSelector(state => state.general.AlgoSigner)
    const algorandWallet = useSelector(state => state.general.AlgorandWallet)
    const onWC = useSelector(state => state.general.WalletConnect)
    const MaiarWallet = useSelector(state => state.general.onMaiar)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const [qrCodeString, setQqrCodeString] = useState()
    const [strQR, setStrQr] = useState()
    const { chainId, account, activate, library } = useWeb3React();
  
    const MyAlgo = useSelector(state => state.general.MyAlgo)
    const modalError = useSelector(state => state.generalerror)
    
    const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
    const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });
    Tezos.setWalletProvider(wallet);

    function getMobOps() {
      // debugger
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
          return true
      }
  }

  const onMaiarExtension = async () => {
    // debugger
    const instance = ExtensionProvider.getInstance()
    try {
      await instance.init()
      await instance.login()
      const { account } = instance
      dispatch(setOnMaiar(true))
      dispatch(setElrondAccount(account.address))
      dispatch(setMaiarProvider(instance))
    } 
    catch(err) {
      window.open('https://getmaiar.com/defi', '_blank');
      console.log(err)
    }
  }

    //! MetaMask connection.
    const onInjected = async () => {
        try {
            if(!window.ethereum && window.innerWidth <= 600) {
                const uri = `https://metamask.app.link/dapp/${window.location.host + `?to=${to.text}&from=${from.text}`}/`
              window.open(uri)
            }
            await activate(injected);
            dispatch(setMetaMask(true))
          } 
          catch (ex) {
              dispatch(setError(ex))
              if(ex.data){
                console.log(ex.data.message);
              }
              else console.log(ex);
          }
          setShow(false)
    }

    const onAlgoWallet = async () => {
      
      if (!algoConnector.connected) {
          algoConnector.createSession()   
      }
    }

    const onTrustWallet = async () => {
      
      try {
        if(!window.ethereum && window.innerWidth <= 600){
          const uri = `https://link.trustwallet.com/open_url?coin_id=60&url=https://${window.location.host + `?to=${to.text}&from=${from.text}`}/`
          window.open(uri)
        }
        await activate(injected);
        dispatch(setTrustWallet(true))
      } 
      catch (error) {
        dispatch(setError(error))
        if(error.data){
          console.log(error.data.message);
        }
        else console.log(error);        
      }
      setShow(false)
    }


    const generateQR = async text => {
        try {
          const QR = await QRCode.toDataURL(text)
          return QR
        } catch (err) {
          console.error(err)
        }
      }

    async function connectTronlink() {
      // debugger
        if(window.innerWidth <= 600 && !window.tronWeb){
          dispatch(setTronPopUp(true))
        }
        else{
          try{
            try{
              const accounts = await window.tronWeb.request({ method: "tron_requestAccounts" });
              
              if(!accounts){
                // dispatch(setTronLoginError("loggedOut"))
              }
            } 
            catch(err){
              console.log(err);
              if(!window.tronWeb){
                // dispatch(setTronLoginError("noTronWeb"))
              }
            }
            
            if(window.tronLink && window.tronWeb.defaultAddress.base58) {
              const publicAddress = window.tronWeb.defaultAddress.base58
              dispatch(setTronWallet(publicAddress))
              dispatch(setTronLink(true))

            }
          } 
          catch(error) {
            if(!modalError){
              dispatch(setError(error))
              if(error.data){
                console.log(error.data.message);
              }
              else console.log(error); 
            }
          }
        }
      }

    const onClientConnect = ( maiarProvider ) => {
      return {
        onClientLogin: async () => {
            const add = await maiarProvider.getAddress()
          dispatch(setConfirmMaiarMob(true))
          dispatch(setElrondAccount(add))
          dispatch(setMaiarProvider(maiarProvider))
          dispatch(setOnMaiar(true))
          dispatch(setStep(2))
        },
        onClientLogout: async () => {
          dispatch(setReset())
        }
      }
    }

    const onMaiar = async () => {
        // setOnMaiarConnect(true)
        const provider = new ProxyProvider( "https://gateway.elrond.com")
        const maiarProvider = new WalletConnectProvider(provider, 'https://bridge.walletconnect.org/', onClientConnect);
          try {
            await maiarProvider.init()
            maiarProvider.onClientConnect = onClientConnect(maiarProvider)
            const qrCodeString = await maiarProvider.login()
            setQqrCodeString(qrCodeString)
            const qr = await generateQR(qrCodeString)
            
            setStrQr(qr)
          } catch (error) {
            dispatch(setError(error))
            if(error.data){
              console.log(error.data.message);
            }
            else console.log(error); 
          }
      }

        //! WalletConnect connection.
    const onWalletConnect = async () => {
        const { rpc, chainId } = chainsConfig[from.key]
        try {
            const walletConnect = new WalletConnectConnector({ 
                rpc: {
                  [chainId]: rpc
                },
                  chainId,
                  qrcode: true,
              })
              walletConnect.networkId = chainId
              await activate(walletConnect, undefined, true)
              dispatch(setOnWC(true))
              dispatch(setWC(walletConnect))
        } catch (error) {
          dispatch(setError(error))
          if(error.data){
            console.log(error.data.message);
          }
          else console.log(error); 
        }
    }


    const onMyAlgo = useCallback( async () => {
      const myAlgoConnect = new MyAlgoConnect();
      try {
        const accountsSharedByUser = await myAlgoConnect.connect()
        dispatch(setAlgorandAccount(accountsSharedByUser[0].address))
        dispatch(setMyAlgo(true))
      } catch (error) {
        console.log(error);
      }
    })

    const onAlgoSigner = useCallback(async () => {
      if (typeof window.AlgoSigner !== undefined) {
        try {
          await window.AlgoSigner.connect()
          const algo = await window.AlgoSigner.accounts({
            ledger: 'MainNet'
          });
          const { address } = algo[0]
          
          dispatch(setAlgoSigner(true))
          dispatch(setAlgorandAccount(address))
        } catch (e) {
          console.error(e);
      return JSON.stringify(e, null, 2);
        }
      } else {
        console.log("Algo Signer not installed.");
      }
    })

    const onBeacon = async () => {
      const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
      const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });
      
      Tezos.setWalletProvider(wallet);
      
      try {
        console.log("Requesting permissions...");
        const permissions = await wallet.client.requestPermissions();
        dispatch(setTezosAccount(permissions.address))
        dispatch(setKukaiWallet(true))
      } catch (error) {
        console.log("Got error:", error);
      }
    }

    const onKukai = async() => {
      try {
        const permissions = await wallet.client.requestPermissions();
        dispatch(setTezosAccount(permissions.address))
        dispatch(setKukaiWallet(true))
      } catch (error) {
        console.log("Got error:", error);
      }
    }

    const onTemple = async () => {
      // debugger
        try {
          const available = await TempleWallet.isAvailable();
          if (!available) {
            throw new Error("Temple Wallet not installed");
          }
          const wallet = new TempleWallet("Cross-Chain NFT Bridge");
          await wallet.connect("mainnet");
          const tezos = wallet.toTezos();
          const accountPkh = await tezos.wallet.pkh();
          dispatch(setTezosAccount(accountPkh))
          dispatch(setTempleWallet(true))

        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
      algoConnector.on("connect", (error, payload) => {
       
        if (error) {
          throw error;
        }
      
        // Get provided accounts
        const { accounts } = payload.params[0];
        if(accounts){
          dispatch(setAlgorandWallet(true))
          dispatch(setAlgorandAccount(accounts[0]))
        }
      });
        const correct = from ? CHAIN_INFO[from.key].chainId === chainId : false
        dispatch(setAccount(account))
        if(from){
            dispatch(setWrongNetwork(CHAIN_INFO[from.key].chainId !== chainId))
        }
        // debugger
        if((metaMask && correct)
        ||
        (tronLink && correct)
        ||
        (onWC && correct)
        ||
        (trustWallet && correct)
        ||
        (MaiarWallet && correct)
        ||
        (MyAlgo)
        ||
        (algorandWallet)
        ||
        (AlgoSigner)
        ||
        kukaiWallet
        ||
        (templeWallet)) {
          dispatch(setStep(2))
        }
    }, [account, metaMask, chainId, tronLink, onWC, trustWallet, AlgoSigner, algorandWallet, MaiarWallet, MyAlgo, templeWallet, kukaiWallet])

    return (
        <div>
            <NFTworng />
            {/* <Button variant="primary" onClick={handleShow}>
                Wallet
            </Button> */}
            <div className={from && to ? "connectNft" : "disabled"}>
                    <a href="#" className="themBtn disabled" onClick={handleShow}>Continue bridging -<span>{'>'}</span> </a>
            </div>
            { !strQR ?
                <Modal show={show} onHide={handleClose} animation={false} className="ChainModal">
                    <Modal.Header>
                        <Modal.Title>Connect Wallet</Modal.Title>
                        <span className="CloseModal" onClick={handleClose}>
                            <img src={Close} alt="" />
                        </span>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="walletListBox">
                            <ul className="walletList scrollSty">
                              {/* !!! style={ from ? from.type === "EVM" && from.text !== "Fuse" ? {} : OFF : ''} */}
                                <li onClick={() => onInjected()} style={ from ? from.type === "EVM" ? {} : OFF : ''} className="wllListItem"><img src={MetaMask} alt="MetaMask Icon" /> MetaMask</li>
                                <li onClick={() => onWalletConnect()} style={ OFF } className="wllListItem"><img src={WalletConnect} alt="WalletConnect Icon" /> WalletConnect</li>
                                <li onClick={() => onTrustWallet()} style={(getMobOps() && window.innerWidth <= 600 && isEVM()) || (window.ethereum && window.innerWidth <= 600) ? {} : OFF } className="wllListItem"><img src={TrustWallet} alt="WalletConnect Icon" /> Trust Wallet</li>
                                <li onClick={onMyAlgo} style={ from ? from.type === "Algorand" ?  {} : OFF : ''} className="wllListItem algo"><img src={MyAlgoBlue} alt="" /> MyAlgo</li>
                                <li onClick={onAlgoSigner} style={ from ? from.type === "Algorand" ?  {} : OFF : ''} className="wllListItem algo"><img src={AlgoSignerIcon} alt="Algor Signer Icon" /> Algo Signer</li>
                                {/* <li onClick={() => onAlgoWallet()} style={ from ? from.type === "Algorand" ?  {} : OFF : ''} className="wllListItem algo"><img src={AlgorandWallet} alt="Algor Wallet Icon" /> Algorand Wallet</li> */}
                                <li onClick={() => connectTronlink()} style={ from ? from.type === "Tron" ? {} : OFF : ""} className="wllListItem"><img src={Tron} alt="Tron Icon" /> TronLink</li>
                                <li onClick={() => onMaiar()} style={ from ? from.type === "Elrond" ? {} : OFF : ''} className="wllListItem"><img src={Maiar} alt="" /> Maiar</li>
                                {/* style={ from ? from.type === "Elrond" ? {} : OFF : ''} */}
                                <li onClick={onBeacon} style={ from?.text === "Tezos" ? {} : OFF} className="wllListItem beacon"><img src={BeaconW} alt="Kukai Icon" /> Beacon</li>
                                <li onClick={onTemple} style={ from?.text === "Tezos" ? {} : OFF} className="wllListItem"><img style={{width: "28px"}} src={Temple} alt="Temple Icon" /> Temple Wallet</li>
                                <li onClick={() => onMaiarExtension()} style={ from ? from.type === "Elrond" ? {} : OFF : ''}  className="wllListItem"><img src={Elrond} alt="Elrond Icon" /> Maiar Extension</li>
                                <li style={ OFF } className="wllListItem">
                                  <div>
                                    <img src={Ledger} alt="Ledger Icon" />
                                    Ledger
                                  </div>
                                  <div className="coming-chain">Coming soon</div>
                                </li>
                                <li style={ OFF } className="wllListItem">
                                  <div>
                                    <img style={{marginLift: "-5px"}} src={Trezor} alt="Trezor Icon" />
                                    Trezor
                                  </div>
                                  <div className="coming-chain">Coming soon</div>
                                </li>
                            </ul>
                        </div>
                    </Modal.Body>
                </Modal>
                :
                <MaiarModal handleClose={handleClose} strQR={strQR} qrCodeString={qrCodeString} show={show} />
            }
        </div>
    )
}
// 
export default ConnectWallet
