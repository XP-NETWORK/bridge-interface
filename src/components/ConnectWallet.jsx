import React, { useState } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import Close from '../assets/img/icons/close.svg';
import Search from '../assets/img/icons/Search.svg';
import Wallet from '../assets/img/wallet/wallet.svg';
import MetaMask from '../assets/img/wallet/MetaMask.svg';
import Tron from '../assets/img/wallet/Tron.svg';
import Elrond from '../assets/img/wallet/Elrond.svg';
import Ledger from '../assets/img/wallet/Ledger.svg';
import Maiar from '../assets/img/wallet/Maiar.svg';
import Trezor from '../assets/img/wallet/Trezor.svg';
import WalletConnect from "../assets/img/wallet/WalletConnect 3.svg"
import NFTworng from './NFTworng';
import { useSelector } from 'react-redux';
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/connectors"
// import {  
//     ChainFactoryConfigs,
//     ChainFactory,
//     ElrondHelper,
//     ElrondParams,
//     TronHelper,
//     TronParams,
//     Web3Helper,
//     Web3Params,
// } from "xp.network/dist";

function ConnectWallet() {
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const [show, setShow] = useState(false);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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

    // MetaMask connection.
    const onInjected = async () => {
        try {
            if(!window.ethereum && window.innerWidth <= 600)  {
              window.open(`https://metamask.app.link/dapp/${window.location.host}/`)
            }
            await activate(injected);
          } 
          catch (ex) {
              console.log(ex)
          }
    }

    return (
        <div>
            {/* <Button variant="primary" onClick={handleShow}>
                Wallet
            </Button> */}
            <div style={ from && to ? {} : OFF} className="connectNft">
                    <a href="#" className="themBtn" onClick={handleShow}>Continue bridging -<span>{'>'}</span> </a>
            </div>
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
                            <NFTworng/>
                            <li onClick={() => onInjected()} style={ from ? from.type === "EVM" ? {} : OFF : ''} className="wllListItem"><img src={MetaMask} alt="MetaMask Icon" /> MetaMask</li>
                            <li style={ from ? from.type === "Elrond" ? {} : OFF : ''}  className="wllListItem"><img src={Elrond} alt="Elrond Icon" /> Elrond</li>
                            <li style={ OFF } className="wllListItem"><img src={Ledger} alt="Ledger Icon" /> Ledger</li>
                            <li style={ from ? from.type === "Elrond" ? {} : OFF : ''} className="wllListItem"><img src={Maiar} alt="" /> Maiar</li>
                            <li style={ OFF } className="wllListItem"><img src={Trezor} alt="Trezor Icon" /> Trezor</li>
                            <li style={ from ? from.type === "EVM" ? {} : OFF : ""} className="wllListItem"><img src={WalletConnect} alt="WalletConnect Icon" /> WalletConnect</li>
                            <li style={ from ? from.type === "Tron" ? {} : OFF : ""} className="wllListItem"><img src={Tron} alt="Tron Icon" /> TronLink</li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ConnectWallet
