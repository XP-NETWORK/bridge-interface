import React, { useEffect, useState } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import Close from '../assets/img/icons/close.svg';
// import Search from '../assets/img/icons/Search.svg';
// import Wallet from '../assets/img/wallet/wallet.svg';
import MetaMask from '../assets/img/wallet/MetaMask.svg';
import Tron from '../assets/img/wallet/Tron.svg';
import Elrond from '../assets/img/wallet/Elrond.svg';
import Ledger from '../assets/img/wallet/Ledger.svg';
import Maiar from '../assets/img/wallet/Maiar.svg';
import Trezor from '../assets/img/wallet/Trezor.svg';
import WalletConnect from "../assets/img/wallet/WalletConnect 3.svg"
import NFTworng from './NFTworng';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/connectors"
import { EVM, ELROND, chainsConfig } from "../components/values"
import { setTronWallet, setAccount, setConfirmMaiarMob, setMetaMask, setStep, setOnMaiar, setWrongNetwork, setElrondAccount, setMaiarProvider, setReset } from "../store/reducers/generalSlice"
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

    const onClientConnect = (maiarProvider) => {
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
              handleClose()
            }
          } catch(err) {
              console.log(err)
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
            console.log(error);
          }
      }

        //! WalletConnect connection.
    // const onWalletConnect = async () => {
    //     const { rpc, chainId } = chainsConfig[from.key]
    //     try {
    //         const walletConnect = new WalletConnectConnector({ 
    //             rpc: {
    //               [chainId]: rpc
    //             },
    //               chainId,
    //               qrcode: true,
    //           })
    //           walletConnect.networkId = chainId
    //           await activate(walletConnect, undefined, true)
    //     } catch (error) {
    //         console.log(error);
    //     }
    //  }

    useEffect(() => {
        const correct = from ? CHAIN_INFO[from.key].chainId === chainId : false
        dispatch(setAccount(account))
        if(from){
            dispatch(setWrongNetwork(CHAIN_INFO[from.key].chainId !== chainId))
        }
        if(metaMask && correct)dispatch(setStep(2))
    }, [account, metaMask, chainId])

    return (
        <div>
            <NFTworng />
            {/* <Button variant="primary" onClick={handleShow}>
                Wallet
            </Button> */}
            <div style={ from && to ? {} : OFF} className="connectNft">
                    <a href="#" className="themBtn" onClick={handleShow}>Continue bridging -<span>{'>'}</span> </a>
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
                                <li style={ from ? from.type === "Elrond" ? {} : OFF : ''}  className="wllListItem"><img src={Elrond} alt="Elrond Icon" /> Elrond</li>
                                <li style={ OFF } className="wllListItem"><img src={Ledger} alt="Ledger Icon" /> Ledger</li>
                                <li onClick={() => onMaiar()} style={ from ? from.type === "Elrond" ? {} : OFF : ''} className="wllListItem"><img src={Maiar} alt="" /> Maiar</li>
                                <li style={ OFF } className="wllListItem"><img src={Trezor} alt="Trezor Icon" /> Trezor</li>
                                <li style={ from ? from.type === "EVM" ? {} : OFF : ""} className="wllListItem"><img src={WalletConnect} alt="WalletConnect Icon" /> WalletConnect</li>
                                <li style={  OFF } className="wllListItem"><img src={Tron} alt="Tron Icon" /> TronLink</li>
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
