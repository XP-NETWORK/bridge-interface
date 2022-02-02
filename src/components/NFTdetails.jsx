import React, { useState } from 'react';
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import moment from 'moment';
import brockenurl from "../assets/img/brockenurl.png"
import Close from '../assets/img/icons/close.svg';
import { checkVideoFormat } from "../wallet/oldHelper"
import INF from '../assets/img/icons/Inf.svg';
import { setupURI } from '../wallet/oldHelper';
import { isValidHttpUrl } from '../wallet/helpers';
import { chainsConfig } from './values';

function NFTdetails({ nftInf }){
    const { name, description, image, attributes, uri, native, animation_url, image_url } = nftInf
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [imageLoaded, setImageLoaded]= useState(false);
    const [tryVideo , setTryVideo] = useState() 

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
                        { (uri) && isValidHttpUrl(uri) && (image || animation_url || image_url || uri) ? 
                            (animation_url && checkVideoFormat(animation_url)) ? 
                            <video onLoadedData={() => setImageLoaded(true)} controls={false} playsInline={true} autoPlay={true} loop={true} 
                            src={tryVideo ? setupURI(image) : setupURI(animation_url)} 
                            /> 
                            : (!checkVideoFormat(animation_url) && animation_url) ?
                            <img onError={() => setTryVideo(true)} onLoad={() => setImageLoaded(true)} alt="NFTss" src={setupURI(animation_url)} /> 
                            :
                            <img onLoad={() => setImageLoaded(true)} alt="NFTtt" src={setupURI(image || image_url || uri)} /> 
                            : 
                            <div className="brocken-url">
                                <img onLoad={() => setImageLoaded(true)} src={brockenurl} alt='This NFT image uri is broken.' />
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
                            { (attributes && Array.isArray(attributes)) && attributes.filter(n => typeof n.value === "string" || typeof n.value === "number").map((n,i) => <Attribute {...n} key={`attribute-${i}`}/>) }
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
            trait_type === 'Original Chain' ? <img style={{marginRight: '4px', width: "29px"}} src={chainsConfig[value]?.img} /> : ''
        }  {
        display_type === 'date' 
        ? moment(new Date(value * 1000)).format('MM-DD-YYYY') 
        : display_type === 'boolean' ?
        value === true ? 'True' : 'False'
        : value
      }</p>
</div>
    
  }