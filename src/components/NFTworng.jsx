import React, { useState } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";

import Close from '../assets/img/icons/close.svg';
import Wrong from '../assets/img/Wrong.svg';
import Switch from '../assets/img/Switch.svg';

import MetaMask from '../assets/img/wallet/MetaMask.svg';

function NFTworng() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>

            
            <li className="wllListItem" onClick={handleShow}><img src={MetaMask} /> MetaMask</li>
            <Modal show={show} onHide={handleClose} className="nftWorng">
                <Modal.Header className="border-0">
                    <Modal.Title>Wrong Network</Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                        <img src={Close} alt="" />
                    </span>
                </Modal.Header>
                <Modal.Body className="modalBody text-center">
                    <div className="wrongNFT">
                        <div className="nftWornTop">
                            <span className="worngImg"><img src={Wrong} alt="Worng" /></span>
                            <h3>Switch to Polygon Mainnet</h3>
                            <p className="">XP.network Bridge requires you to <br /> connect to the Polygon Mainnet</p>
                        </div>
                        <div className="switchingAcc">
                            <img src={Switch} alt="Switching" />
                            <p className="">Switching to Mainnet</p>
                            <p className="">Follow instructions in MetaMask</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NFTworng;
