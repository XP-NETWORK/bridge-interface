import React, { useEffect, useState, useCallback } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import Close from '../assets/img/icons/close.svg';
import MetaMask from '../assets/img/wallet/MetaMask.svg';
import AlgorandWallet from "../assets/img/wallet/AlgorandWallet.svg"
import Tron from '../assets/img/wallet/TronLink.svg';
import Elrond from '../assets/img/wallet/Elrond.svg';
import Ledger from '../assets/img/wallet/Ledger.svg';
import AlgoSignerIcon from '../assets/img/wallet/Algo Signer.png';
import Maiar from '../assets/img/wallet/Maiar.svg';
import Trezor from '../assets/img/wallet/Trezor.svg';
import TrustWallet from "../assets/img/wallet/TWT.svg"
import WalletConnect from "../assets/img/wallet/WalletConnect 3.svg"
import NFTworng from './NFTworng';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from "@web3-react/core";
import { injected, algoConnector } from "../wallet/connectors"
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { EVM, ELROND, chainsConfig } from "../components/values"
import { setTronWallet, setAccount, setConfirmMaiarMob, setAlgorandWallet, setTronLink, setMetaMask, setTronLoginError, setStep, setOnMaiar, setWrongNetwork, setElrondAccount, setMaiarProvider, setReset, setOnWC, setWC, setError, setTronPopUp, setTrustWallet, setAlgoSigner, setAlgorandAccount } from "../store/reducers/generalSlice"
import { Address, ExtensionProvider, WalletConnectProvider, ProxyProvider } from "@elrondnetwork/erdjs"
import { CHAIN_INFO } from '../components/values';
import QRCode from 'qrcode'
import MaiarModal from './MaiarModal';
import { isEVM } from '../wallet/oldHelper';

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
    const metaMask = useSelector(state => state.general.MetaMask)
    const tronLink = useSelector(state => state.general.tronLink)
    const trustWallet = useSelector(state => state.general.trustWallet)
    const AlgoSigner = useSelector(state => state.general.AlgoSigner)
    const algorandWallet = useSelector(state => state.general.AlgorandWallet)
    const onWC = useSelector(state => state.general.WalletConnect)
    const onMaiarWallet = useSelector(state => state.general.onMaiar)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const [qrCodeString, setQqrCodeString] = useState()
    const [strQR, setStrQr] = useState()
    const { chainId, account, activate } = useWeb3React();


    function getMobOps() {
      // debugger
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
          return true
      }
  }

  const onMaiarExtension = async () => {
    debugger
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
              console.log(accounts);
              if(!accounts){
                // dispatch(setTronPopUp(true))
                // dispatch(setTronLoginError(true))
              }
            } 
            catch(err){
              
              console.log(err);
            }
            
            if(window.tronLink && window.tronWeb.defaultAddress.base58) {
              const publicAddress = window.tronWeb.defaultAddress.base58
              dispatch(setTronWallet(publicAddress))
              dispatch(setTronLink(true))

            }
          } 
          catch(error) {
            dispatch(setError(error))
            if(error.data){
              console.log(error.data.message);
            }
            else console.log(error); 
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
            console.log(qr);
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

    const onAlgoSigner = useCallback(async () => {
      if (typeof window.AlgoSigner !== undefined) {
        try {
          await window.AlgoSigner.connect()
          const algo = await window.AlgoSigner.accounts({
            ledger: 'MainNet'
          });
          const { address } = algo[0]
          console.log(address)
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
        if((metaMask && correct)||(tronLink && correct)||(onWC && correct)||(trustWallet && correct)||(onMaiarWallet && elrondAccount)||(algorandWallet)||(AlgoSigner))dispatch(setStep(2))
    }, [account, metaMask, chainId, tronLink, onWC, trustWallet, AlgoSigner, algorandWallet, onMaiarWallet])

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
                                <li onClick={() => onInjected()} style={ from ? from.type === "EVM" ? {} : OFF : ''} className="wllListItem"><img src={MetaMask} alt="MetaMask Icon" /> MetaMask</li>
                                <li onClick={() => onWalletConnect()} style={ OFF } className="wllListItem"><img src={WalletConnect} alt="WalletConnect Icon" /> WalletConnect</li>
                                <li onClick={() => onTrustWallet()} style={(getMobOps() && window.innerWidth <= 600 && isEVM()) || (window.ethereum && window.innerWidth <= 600) ? {} : OFF } className="wllListItem"><img src={TrustWallet} alt="WalletConnect Icon" /> Trust Wallet</li>
                                <li onClick={onAlgoSigner} style={ from ? from.type === "Algorand" ?  {} : OFF : ''} className="wllListItem algo"><img src={AlgoSignerIcon} alt="Algor Signer Icon" /> Algo Signer</li>
                                <li onClick={() => onAlgoWallet()} style={ from ? from.type === "Algorand" ?  {} : OFF : ''} className="wllListItem algo"><img src={AlgorandWallet} alt="Algor Signer Icon" /> Algorand Wallet</li>
                                <li onClick={() => connectTronlink()} style={ from ? from.type === "Tron" ? {} : OFF : ""} className="wllListItem"><img src={Tron} alt="Tron Icon" /> TronLink</li>
                                <li onClick={() => onMaiar()} style={ from ? from.type === "Elrond" ? {} : OFF : ''} className="wllListItem"><img src={Maiar} alt="" /> Maiar</li>
                                {/* style={ from ? from.type === "Elrond" ? {} : OFF : ''} */}

                                <li onClick={() => onMaiarExtension()} style={ from ? from.type === "Elrond" ? {} : OFF : ''}  className="wllListItem"><img src={Elrond} alt="Elrond Icon" /> Maiar Extension</li>
                                <li style={ OFF } className="wllListItem"><img src={Ledger} alt="Ledger Icon" /> Ledger</li>
                                <li style={ OFF } style={ OFF } className="wllListItem"><img src={Trezor} alt="Trezor Icon" /> Trezor</li>
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

export default ConnectWallet
