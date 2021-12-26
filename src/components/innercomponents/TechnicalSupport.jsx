import React from 'react'
import { Modal } from "react-bootstrap"
import Close from '../../assets/img/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux'
import "./TechnicalSupport.css"

export default function TechnicalSupport() {
    const dispatch = useDispatch()
    

    function handleClose() {
        // dispatch
    }

    return (
        <Modal animation={false} size="sm" show={false} onHide={() => handleClose()}>
            <Modal.Header className="border-0">
                <div className="technical-support__header">
                    <Modal.Title>Submit NFT for approval</Modal.Title>
                    <span className="CloseModal" onClick={() => handleClose()}>
                        <img src={Close} alt="" />
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body className='technical-support__body'>
                
            </Modal.Body>
        </Modal>
    )
}
