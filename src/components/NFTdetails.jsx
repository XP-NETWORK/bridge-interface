import React, { useState } from 'react';
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import moment from 'moment';
import brockenurl from "../assets/img/brockenurl.png"

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
    console.log("attributes", attributes)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

           {/* <Button variant="primary" onClick={handleShow}>
                NFT Details
            </Button> */} 
            <div className="info-icon__container">
                <span className="NFTInf" onClick={handleShow}><img src={INF} /></span>
            </div>
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
                            { image ? 
                                <img src={setupURI(image)} alt="NFT" />
                            :  
                            <div style={{paddingTop: "10%"}} className="brocken-url">
                                <img style={{height: "40%"}} src={brockenurl} alt='This NFT image uri is broken.' />
                                <span className="brocken-url__msg">NFTs URL<br/> is broken</span>
                            </div>
                            }
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
                            { (attributes && Array.isArray(attributes)) && attributes.map((n,i) => <Attribute {...n} key={`attribute-${i}`}/>) }
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
    return  <div className="nftToken nftInfBox">
    <label>
        { 
    trait_type ?
    trait_type.split('_').map(n =>  n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()).join(' ')
    : '-'
    }
    </label>
        <p>{
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