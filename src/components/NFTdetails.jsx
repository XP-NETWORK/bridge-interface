import React, { useState } from 'react';
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import moment from 'moment';

// Chain

import Close from '../assets/img/icons/close.svg';
import Search from '../assets/img/icons/Search.svg';

// Wallet
import nftDetails_1 from '../assets/img/nfts/nftDetails_1.png';

import INF from '../assets/img/icons/Inf.svg';
import { setupURI } from '../wallet/oldHelper';
import { chainsConfig } from './values';

function NFTdetails({ nftInf }){
    const { name, description, image, attributes, uri, native} = nftInf
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

           {/* <Button variant="primary" onClick={handleShow}>
                NFT Details
            </Button> */} 
            <span className="NFTInf" onClick={handleShow}><img src={INF} /></span>
            <Modal animation={false} show={show} onHide={handleClose} className="NftDetails">
                <Modal.Header>
                    <Modal.Title>NFT Details</Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                        <img src={Close} alt="" />
                    </span>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <div className="nftDetailBox">
                        <div className="nftDetImg">
                            <img src={setupURI(image)} alt="NFT" />
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
                                <label>Description</label>
                                <p>{description}</p>
                            </div>
                            { attributes && attributes.map((n,i) => <Attribute {...n} key={`attribute-${i}`}/>) }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NFTdetails


function Attribute(props) {
    const { trait_type, display_type, value } = props
   console.log(trait_type === 'Original Chain', chainsConfig[value])
    return  <div className="nftToken nftInfBox">
    <label>
        { 
    trait_type ?
    trait_type.split('_').map(n =>  n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()).join(' ')
    : '-'
    }</label>
    <p>    {
            trait_type === 'Original Chain' ? <img style={{marginRight: '4px'}} src={chainsConfig[value]?.img} /> : ''
        }  {
        display_type === 'date' 
        ? moment(new Date(value * 1000)).format('MM-DD-YYYY') 
        : display_type === 'boolean' ?
        value === true ? 'True' : 'False'
        : value
      }</p>
</div>
    
  }