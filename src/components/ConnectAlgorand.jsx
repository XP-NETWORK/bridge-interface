import React, { useEffect, useState, useCallback } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import Close from '../assets/img/icons/close.svg';
import AlgoSignerIcon from '../assets/img/wallet/Algo Signer.png';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/connectors"
import { setTronWallet, setAccount, setConfirmMaiarMob, setTronLink, setMetaMask, setTronLoginError, setStep, setOnMaiar, setWrongNetwork, setElrondAccount, setMaiarProvider, setReset, setOnWC, setWC, setError, setTronPopUp, setTrustWallet, setAlgoSigner, setAlgorandAccount, connectAlgorandWalletClaim } from "../store/reducers/generalSlice"
import QRCode from 'qrcode'
import MyAlgoConnect from '@randlabs/myalgo-connect';
import AlgorandIcon from '../assets/img/algorandwallet.svg'
function ConnectAlgorand() {
    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const [show, setShow] = useState();
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const handleClose = () => { 
      dispatch(connectAlgorandWalletClaim(false))
   
    }
    const handleShow = () => setShow(true);
    const connectClaimAlgorand = useSelector(state => state.general.connectClaimAlgorand)
    const tronLink = useSelector(state => state.general.tronLink)
    const trustWallet = useSelector(state => state.general.trustWallet)
    const AlgoSigner = useSelector(state => state.general.AlgoSigner)
    const onWC = useSelector(state => state.general.WalletConnect)
    const [qrCodeString, setQqrCodeString] = useState()
    const [strQR, setStrQr] = useState()
    const { chainId, account, activate } = useWeb3React();


  //   function getMobOps() {
  //     // debugger
  //     var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  //     if (/android/i.test(userAgent)) {
  //         return true
  //     }

  // }

    //! MetaMask connection.
    // const onInjected = async () => {
    //     try {
    //         if(!window.ethereum && window.innerWidth <= 600) {
    //             const uri = `https://metamask.app.link/dapp/${window.location.host + `?to=${to.text}&from=${from.text}`}/`
    //           window.open(uri)
    //         }
    //         await activate(injected);
    //         dispatch(setMetaMask(true))
    //       } 
    //       catch (ex) {
    //           dispatch(setError(ex))
    //           console.log(ex)
    //       }
    //       setShow(false)
    // }

    // const onTrustWallet = async () => {
    //   try {
    //     if(!window.ethereum && window.innerWidth <= 600){
    //       const uri = `https://link.trustwallet.com/open_url?coin_id=60&url=https://${window.location.host + `?to=${to.text}&from=${from.text}`}/`
    //       window.open(uri)
    //     }
    //     await activate(injected);
    //     dispatch(setTrustWallet(true))
    //   } 
    //   catch (error) {
    //     dispatch(setError(error))
    //     console.log(error)
        
    //   }
    //   setShow(false)
    // }


    // const generateQR = async text => {
    //     try {
    //       const QR = await QRCode.toDataURL(text)
    //       return QR
    //     } catch (err) {
    //       console.error(err)
    //     }
    //   }

    // async function connectTronlink() {
    //   // debugger
    //     if(window.innerWidth <= 600 && !window.tronWeb){
    //       dispatch(setTronPopUp(true))
    //     }
    //     else{
    //       try{
    //         try{
    //           const accounts = await window.tronWeb.request({ method: "tron_requestAccounts" });
    //           console.log(accounts);
    //           if(!accounts){
    //             // dispatch(setTronPopUp(true))
    //             // dispatch(setTronLoginError(true))
    //           }
    //         } 
    //         catch(err){
              
    //           console.log(err);
    //         }
            
    //         if(window.tronLink && window.tronWeb.defaultAddress.base58) {
    //           const publicAddress = window.tronWeb.defaultAddress.base58
    //           dispatch(setTronWallet(publicAddress))
    //           dispatch(setTronLink(true))

    //         }
    //       } 
    //       catch(err) {
    //           dispatch(setError(err))
    //           console.log(err)
    //       }
    //     }
    //   }

    // const onMyAlgo = useCallback( async () => {
    //   const myAlgoConnect = new MyAlgoConnect();
    //   try {
    //     const accountsSharedByUser = await myAlgoConnect.connect()
    //     dispatch(setAlgorandAccount(accountsSharedByUser[0].address))
    //     dispatch(setMyAlgo(true))
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })

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
          handleClose()
        } catch (e) {
          console.error(e);
      return JSON.stringify(e, null, 2);
        }
      } else {
        console.log("Algo Signer not installed.");
      }
    })

   

    return (
        <Modal show={connectClaimAlgorand} onHide={handleClose} animation={false} className="ChainModal">
            <Modal.Header>
                <Modal.Title>Connect Wallet</Modal.Title>
                <span className="CloseModal" onClick={handleClose}>
                    <img src={Close} alt="" />
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="walletListBox">
                    <div className="imgcontainer">
                        <img src={AlgorandIcon} />
                    </div>
                    <h3 className="walletalgotitle">
                        Connect an Algorand wallet to claim NFTs 
                    </h3>
                    <ul className="walletList scrollSty">
                        <li onClick={onAlgoSigner} className="wllListItem algo"><img src={AlgoSignerIcon} alt="Algor Signer Icon" /> Algo Signer</li>
                        
                
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConnectAlgorand
