import React, { useEffect, useState } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import Close from '../assets/img/icons/close.svg';
// import Search from '../assets/img/icons/Search.svg';
// import Wallet from '../assets/img/wallet/wallet.svg';
import MetaMask from '../assets/img/wallet/MetaMask.svg';
import Tron from '../assets/img/wallet/TronLink.svg';
import Elrond from '../assets/img/wallet/Elrond.svg';
import Ledger from '../assets/img/wallet/Ledger.svg';
import Maiar from '../assets/img/wallet/Maiar.svg';
import Trezor from '../assets/img/wallet/Trezor.svg';
import WalletConnect from "../assets/img/wallet/WalletConnect 3.svg"
import NFTworng from './NFTworng';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/connectors"
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { EVM, ELROND, chainsConfig } from "../components/values"
import { setTronWallet, setAccount, setConfirmMaiarMob, setTronLink, setMetaMask, setStep, setOnMaiar, setWrongNetwork, setElrondAccount, setMaiarProvider, setReset, setOnWC, setWC, setError } from "../store/reducers/generalSlice"
import { Address, ExtensionProvider, WalletConnectProvider, ProxyProvider } from "@elrondnetwork/erdjs"
import { CHAIN_INFO } from '../components/values';
import QRCode from 'qrcode'
import MaiarModal from './MaiarModal';
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

function ConnectWallet() {
    const walletConnectDeepLink = "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=";
    const from = useSelector(state => state.general.from)
    const dispatch = useDispatch()
    const to = useSelector(state => state.general.to)
    const [show, setShow] = useState();
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const metaMask = useSelector(state => state.general.MetaMask)
    const tronLink = useSelector(state => state.general.tronLink)
    const onWC = useSelector(state => state.general.WalletConnect)
    const chainFromProvider = useSelector(state => state.chainIdFromProvider)
    const [qrCodeString, setQqrCodeString] = useState()
    const [strQR, setStrQr] = useState()
    const {
        connector,
        library,
        chainId,
        account,
        user,
        activate,
        deactivate,
        active,
        error,
      } = useWeb3React();


    //! MetaMask connection.
    const onInjected = async () => {
        try {
            if(!window.ethereum && window.innerWidth <= 600)  {
              window.open(`https://metamask.app.link/dapp/${window.location.host}/`)
            }
            await activate(injected);
            dispatch(setMetaMask(true))
          } 
          catch (ex) {
              dispatch(setError(ex))
              console.log(ex)
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
        if(window.innerWidth <= 600 && !window.tronWeb){
        //   dispatch(setTronPopUp(true))
        }else{
          try {
            try {
              const accounts = await window.tronWeb.request({ method: "tron_requestAccounts" });
              } catch(err) {
                console.log(err);
                }
            if(window.tronLink && window.tronWeb.defaultAddress.base58) {
              const publicAddress = window.tronWeb.defaultAddress.base58
              dispatch(setTronWallet(publicAddress))
              dispatch(setTronLink(true))
              handleClose()
            }
          } catch(err) {
            dispatch(setError(err))
              console.log(err)
          }
        }
      }

    const onClientConnect = (maiarProvider) => {
      console.log(maiarProvider);
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
          console.log("Loged Out");
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
            console.log(error);
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
            console.log(error);
        }
     }

    useEffect(() => {
      // debugger
        const correct = from ? CHAIN_INFO[from.key].chainId === chainId : false
        dispatch(setAccount(account))
        if(from){
            dispatch(setWrongNetwork(CHAIN_INFO[from.key].chainId !== chainId))
        }
        // debugger
        if((metaMask && correct)||(tronLink && correct)||(onWC && correct))dispatch(setStep(2))
    }, [account, metaMask, chainId, tronLink, onWC])

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
                <Modal show={show} onHide={handleClose} className="ChainModal">
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
                                <li onClick={() => onWalletConnect()} style={ from ? from.type === "EVM" ? {} : OFF : ""} className="wllListItem"><img src={WalletConnect} alt="WalletConnect Icon" /> WalletConnect</li>
                                <li onClick={() => connectTronlink()} style={ from ? from.type === "Tron" ? {} : OFF : ""} className="wllListItem"><img src={Tron} alt="Tron Icon" /> TronLink</li>
                                <li onClick={() => onMaiar()} style={ from ? from.type === "Elrond" ? {} : OFF : ''} className="wllListItem"><img src={Maiar} alt="" /> Maiar</li>
                                {/* style={ from ? from.type === "Elrond" ? {} : OFF : ''} */}
                                <li style={ OFF }  className="wllListItem"><img src={Elrond} alt="Elrond Icon" /> Elrond</li>
                                <li style={ OFF } className="wllListItem"><img src={Ledger} alt="Ledger Icon" /> Ledger</li>
                                <li style={ OFF } style={{marginBottom: 0 + "px"}} className="wllListItem"><img src={Trezor} alt="Trezor Icon" /> Trezor</li>
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
