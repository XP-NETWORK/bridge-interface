import React from 'react'
import { Modal } from "react-bootstrap"
import Close from '../../assets/img/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux'
import { ModalActions } from 'semantic-ui-react';
import "./SuccessModal.css"

export default function SuccessModal() {


    return (
        <Modal className="success-modal" show={true}>
            <Modal.Header className="border-0">
                <Modal.Title>
                        <div className="custom-success-modal__title">Bridging Report</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div>
                        <div>
                            <label>Status</label>
                            <span><img src="" alt="" />Completed</span>
                        </div>
                        <div>
                            <label>Date</label>
                            <span>YYYY-MM-DD hh:mm</span>
                        </div>
                        <div>
                            <label>Txn Hash</label>
                            <div>0xb6...ef75c7</div>
                        </div>
                    </div>
                    <div>
                        <div >
                            <label>Sent From</label>
                            <span>Algorand</span>
                        </div>
                        <div >
                            <label>Departure Address</label>
                            <div>0xb6...ef75c7</div>
                        </div>
                        <div>
                            <label>Sent To</label>
                            <div>BSC</div>
                        </div>
                        <div>
                            <label>Destination address</label>
                            <div>0xb6...ef75c7</div>
                        </div>
                    </div>
                    <div>
                        <div>NFT</div>
                    </div>
            </Modal.Body>
        </Modal>
    )
}
