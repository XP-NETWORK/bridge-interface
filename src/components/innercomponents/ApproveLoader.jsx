import React from 'react'
import { Modal } from "react-bootstrap"
import Close from '../../assets/img/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux'
import "./TechnicalSupport.css"
import { setNFTsToWhitelist, removeFromNotWhiteListed } from '../../store/reducers/generalSlice';

export default function ApproveLoader() {
    const dispatch = useDispatch()


    return (
        <div className="approve-loader__container">
            <div className="approve-loader__container__text">Approving...</div>
            <div className="approve-loader"></div>
        </div>
        // <Modal >
        //     <Modal.Header className="border-0">
        //         <Modal.Title>Submit NFT for approval</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body className='approval-mod__body'>
        //         <div className="ts-nft__image">
        //             <img src={nftsToWhitelist[0].url} alt="Not whitelisted NFT" />
        //         </div>
        //         <div className="ts-nft__info">{nftsToWhitelist[0].name}</div>
        //         <div className="ns-message">This NFT can’t being sent. NFT bridge requers to add this NFT to Whitelist.</div>
        //         <a className="ts-button" href="https://t.me/xp_network" target="_blank" rel='noreferrer'>Technical Support &#10143;</a>
        //     </Modal.Body>
        // </Modal>
    )
}
