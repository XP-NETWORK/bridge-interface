import React from 'react'
import { Modal } from "react-bootstrap"
import Close from '../../assets/img/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux'
import "./TransferLoader.css"

export default function TransferLoader() {
    const transferModalLoader = useSelector(state => state.general.transferModalLoader)

    return (
        <Modal className="transfer-loader-modal" animation={false} show={transferModalLoader} size="sm" >
            <Modal.Header className="border-0">
                <Modal.Title><div className="transfer-loader__animation"><Animation /></div></Modal.Title>
            </Modal.Header>
            <Modal.Body className='transfer-loader__body'>
                <div className="transfer-loader__title">Transaction Processing</div>
                <div className="transfer-loader__text">The transaction time is unpredictably long due to the congestion on the blockchain.</div>
                <div className="transfer-loader__sub">💚 Please be patient</div>
            </Modal.Body>
        </Modal>
    )
}

function Animation(){
    return(
        <div className="center">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
    )
}
