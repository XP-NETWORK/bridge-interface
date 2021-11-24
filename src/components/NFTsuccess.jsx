
import React, { useState } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";

// Chain

import Close from '../assets/img/icons/close.svg';
import Search from '../assets/img/icons/Search.svg';

// Chain
import BSC from '../assets/img/chain/Binance.svg';
import Avalanche from '../assets/img/chain/Avalanche.svg';

import Success from '../assets/img/icons/Success.svg';
import Check from '../assets/img/icons/Check_circle.svg';
import FileCopy from '../assets/img/icons/FileCopy.svg';


import SelectedNFT_1 from '../assets/img/nfts/SelectedNFT_1.png';
import SelectedNFT_2 from '../assets/img/nfts/SelectedNFT_2.png';
import SelectedNFT_3 from '../assets/img/nfts/SelectedNFT_3.png';
import SelectedNFT_4 from '../assets/img/nfts/SelectedNFT_4.png';
import SelectedNFT_5 from '../assets/img/nfts/SelectedNFT_5.png';
import { useSelector } from 'react-redux';


function NFTsuccess() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showSuccess = useSelector(state => state.showSuccess)

    return (
        <div>

            {/* <a href="#" className="themBtn" onClick={handleShow}>Send</a> */}
            <Modal show={show} onHide={handleClose} className="nftSuccessMod">
                <Modal.Header>
                    <Modal.Title><img src={Success} /> Success</Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                        <img src={Close} />
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <div className="successBody">
                        <div className="successBox status">
                            <div className="sucesList">
                                <label>Status</label> <span className="statComp"><img src={Check} /> Completed</span>
                            </div>
                            <div className="sucesList">
                                <label>Date</label> <span className="statDate">2021-07-04 20:50</span>
                            </div>
                            <div className="sucesList">
                                <label>Txn Hash</label> <span className="statTok colBlue">0xfytyuiolkjh9ijk...678h <span className="copyTokk"><img src={FileCopy} /></span></span>
                            </div>
                        </div>
                        <div className="successBox SentFrom">
                            <div className="sucesList">
                                <label>Sent From</label> <span className=""><img src={BSC} /> BSC</span>
                            </div>
                            <div className="sucesList">
                                <label>Departure Address</label> <span className="colBlue">0x9es455689jk...678h</span>
                            </div>
                            <div className="sucesList">
                                <label>Sent To</label> <span className=""><img src={Avalanche} /> Avalanche</span>
                            </div>
                            <div className="sucesList">
                                <label>Destination address</label> <span className="colBlue">0x9es455689jk...678h</span>
                            </div>
                        </div>
                        <div className="nftSelectList">
                            <div className="nftSeleTop">
                                <div className="selectedNft">
                                    Sent NFT <span>/ 8</span>
                                </div>
                            </div>
                            <ul className="nftSelected">
                                <li className="nftSelecItem">
                                    <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <span className="bluTextBtn">View Txn</span>
                                </li>
                                <li className="nftSelecItem">
                                    <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <span className="bluTextBtn">View Txn</span>
                                </li>
                                <li className="nftSelecItem">
                                    <img src={SelectedNFT_3} alt="NFT" /> 333333 NFT <span className="bluTextBtn">View Txn</span>
                                </li>
                                <li className="nftSelecItem">
                                    <img src={SelectedNFT_4} alt="NFT" /> 2222 NFT <span className="bluTextBtn">View Txn</span>
                                </li>
                                <li className="nftSelecItem">
                                    <img src={SelectedNFT_5} alt="NFT" /> name 111 NFT <span className="bluTextBtn">View Txn</span>
                                </li>
                                <li className="nftSelecItem">
                                    <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <span className="bluTextBtn">View Txn</span>
                                </li>
                                <li className="nftSelecItem">
                                    <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <span className="bluTextBtn">View Txn</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NFTsuccess
