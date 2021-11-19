import React, { useState } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";

// Chain

import Close from '../assets/img/icons/close.svg';
import Search from '../assets/img/icons/Search.svg';

// Wallet
import nftDetails_1 from '../assets/img/nfts/nftDetails_1.png';



function NFTdetails() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>

            <Button variant="primary" onClick={handleShow}>
                NFT Details
            </Button>

            <Modal show={show} onHide={handleClose} className="NftDetails">
                <Modal.Header>
                    <Modal.Title>NFT Details</Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                        <img src={Close} alt="" />
                    </span>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <div className="nftDetailBox">
                        <div className="nftDetImg">
                            <img src={nftDetails_1} alt="NFT" />
                        </div>
                        <div className="nftDetIg">
                            <div className="nftName nftInfBox">
                                <label>Name</label>
                                <p>Meka #3241</p>
                            </div>
                            <div className="nftToken nftInfBox">
                                <label>Token ID</label>
                                <p>464566</p>
                            </div>
                            <div className="nftInfDesc nftInfBox">
                                <label>Name</label>
                                <p>Meka from the MekaVerse - A collection of 8,888 unique generative NFTs from another universe. Meka from the MekaVerse - A collection of 8,888 unique generative NFTs from an other universe.</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NFTdetails
