import React, { useState } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";

// Chain

import Close from '../assets/img/icons/close.svg';
import Search from '../assets/img/icons/Search.svg';

// Wallet
import Wallet from '../assets/img/wallet/wallet.svg';

import MetaMask from '../assets/img/wallet/MetaMask.svg';
import Elrond from '../assets/img/wallet/Elrond.svg';
import Ledger from '../assets/img/wallet/Ledger.svg';
import Maiar from '../assets/img/wallet/Maiar.svg';
import Trezor from '../assets/img/wallet/Trezor.svg';
import WalletConnect from "../assets/img/wallet/WalletConnect 3.svg"
import NFTworng from './NFTworng';
import { useSelector } from 'react-redux';

function ConnectWallet() {
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const [show, setShow] = useState(false);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            <li className="wllListItem"><img src={MetaMask} /> MetaMask</li>
                            <li className="wllListItem"><img src={Elrond} /> Elrond</li>
                            <li className="wllListItem"><img src={Ledger} /> Ledger</li>
                            <li className="wllListItem"><img src={Maiar} /> Maiar</li>
                            <li className="wllListItem"><img src={Trezor} /> Trezor</li>
                            <li className="wllListItem"><img src={WalletConnect} /> WalletConnect</li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ConnectWallet
