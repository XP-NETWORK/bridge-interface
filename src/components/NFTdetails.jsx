import React, { useState } from 'react';
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";

// Chain

import Close from '../assets/img/icons/close.svg';
import Search from '../assets/img/icons/Search.svg';

// Wallet
import nftDetails_1 from '../assets/img/nfts/nftDetails_1.png';

import INF from '../assets/img/icons/Inf.svg';

function NFTdetails({ nftInf }){
    const { name, description, image, attributes, uri, native } = nftInf
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

           {/* <Button variant="primary" onClick={handleShow}>
                NFT Details
            </Button> */} 
            <span className="NFTInf" onClick={handleShow}><img src={INF} /></span>
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
                            <img src={image} alt="NFT" />
                        </div>
                        <div className="nftDetIg">
                            <div className="nftName nftInfBox">
                                <label>Name</label>
                                <p>{name}</p>
                            </div>
                            <div className="nftToken nftInfBox">
                                <label>Token ID</label>
                                <p>{native.tokenId}</p>
                            </div>
                            <div className="nftInfDesc nftInfBox">
                                <label>About</label>
                                <p>Meka from the MekaVerse - A collection of 8,888 unique generative NFTs from another universe. Meka from the MekaVerse - A collection of 8,888 unique generative NFTs from an other universe.</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NFTdetails
