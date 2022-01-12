import React from 'react'
import { Modal } from "react-bootstrap"
import Close from '../../assets/img/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux'
import "./TechnicalSupport.css"
import { setNFTsToWhitelist, removeFromNotWhiteListed } from '../../store/reducers/generalSlice';

export default function TechnicalSupport() {
    const dispatch = useDispatch()
    const nftsToWhitelist = useSelector(state => state.general.nftsToWhitelist)


    function handleClose() {
        dispatch(removeFromNotWhiteListed())
    }

    return (
        nftsToWhitelist.length ?
        <Modal className="ts-modal" animation={false} size="sm" show={nftsToWhitelist} onHide={() => handleClose()}>
            <Modal.Header className="border-0">
                <span className="close-ts-modal" onClick={() => handleClose()}>
                    <img src={Close} alt="" />
                </span>
                <Modal.Title>Submit NFT for approval</Modal.Title>
            </Modal.Header>
            <Modal.Body className='technical-support__body'>
                <div className="ts-nft__image">
                    <img src={nftsToWhitelist[0].url} alt="Not whitelisted NFT" />
                </div>
                <div className="ts-nft__info">{nftsToWhitelist[0].name}</div>
                <div className="ns-message">This NFT can't be sent. The NFT Bridge requires whitelisting for NFTs</div>
                <a className="ts-button" href="https://t.me/xp_network" target="_blank" rel='noreferrer'>Technical Support &#10143;</a>
            </Modal.Body>
        </Modal>
        :
        ''
    )
}
