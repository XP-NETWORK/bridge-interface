import React from 'react'
import { Modal } from "react-bootstrap"
import Close from '../../assets/img/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux'
import "./TechnicalSupport.css"
import { setTechModal } from '../../store/reducers/generalSlice';

export default function TechnicalSupport() {
    const dispatch = useDispatch()
    const info = useSelector(state => state.general.techModal)
    // const { url, name } = useSelector(state => state.general.techModal)

    function handleClose() {
        dispatch(setTechModal(undefined))
    }

    return (
        <Modal className="ts-modal" animation={false} size="sm" show={info} onHide={() => handleClose()}>
            <Modal.Header className="border-0">
                <span className="close-ts-modal" onClick={() => handleClose()}>
                    <img src={Close} alt="" />
                </span>
                <Modal.Title>Submit NFT for approval</Modal.Title>
            </Modal.Header>
            <Modal.Body className='technical-support__body'>
                <div className="ts-nft__image">
                    <img src={info?.url} alt="Not whitelisted NFT" />
                </div>
                <div className="ts-nft__info">{info?.name}</div>
                <div className="ns-message">This NFT can’t being sent. NFT bridge requers to add this NFT to Whitelist.</div>
                <a className="ts-button" href="https://t.me/xp_network" target="_blank" rel='noreferrer'>Technical Support &#10143;</a>
            </Modal.Body>
        </Modal>
    )
}
