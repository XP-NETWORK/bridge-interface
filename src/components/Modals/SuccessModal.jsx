import React from 'react'
import { Modal } from "react-bootstrap"
import Close from '../../assets/img/icons/close.svg';
import Copy from '../../assets/img/icons/FileCopy.svg';
import Check from '../../assets/img/icons/Check_circle.svg';
import { useDispatch, useSelector } from 'react-redux'
import { ModalActions } from 'semantic-ui-react';
import moment from 'moment';
import "./SuccessModal.css"

export default function SuccessModal() {
    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const account = useSelector(state => state.general.account)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const tronWallet = useSelector(state => state.general.tronWallet)
    const receiver = useSelector(state => state.general.receiver)
    const txnHashArr = useSelector(state => state.general.txnHashArr)
    const currentTX = useSelector(s => s.general.currrentTx)
    const selectedNFTList = useSelector(state => state.general.selectedNFTList)
    const hardWallet = "0xb6C8748115d23Eb1c6d59Cb83eAe051b56ef75c7"

    const handleClose = () => {
        window.location.reload()
    };

    const getSubstringValue = () => {
        if(window.innerWidth <= 320) return 3
        else if(window.innerWidth <= 375) return 6
        else return false
    }

    return (
        <Modal animation={false} className="success-modal" show={true}>
            <span onClick={handleClose} className="success-modal-close">
                <img src={Close} alt=''/>
            </span>
            <Modal.Header className="border-0">
                <Modal.Title>
                        <div className="custom-success-modal__title">Bridging Report</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="success-info-list">
                    <div className="success-info-box">
                        <div className="success-info-item">
                            <div className="info-item-label">Status</div>
                            <span>
                                <img src={Check} />
                                <span>Completed</span>
                            </span>
                        </div>
                        <div className="success-info-item">
                            <div className="info-item-label">Date</div>
                            <span>{moment().format("YYYY-MM-DD hh:mm")}</span>
                        </div>
                        <div className="success-info-item">
                            <div className="info-item-label">Txn Hash</div>
                            <div className="success-hash">
                                <div>{`${hardWallet.substring(0, getSubstringValue() || 10)}...${hardWallet.substring(hardWallet.length - 6)}`}</div>
                                <img src={Copy} alt="." />
                            </div>
                        </div>
                    </div>
                    <div className="success-info-box">
                        <div className="success-info-item">
                            <div className="info-item-label">Sent From</div>
                            <div className="info-item-chain"><img src={from?.image.src} alt={from?.text}/>{from?.text || "Algorand"}</div>
                        </div>
                        <div className="success-info-item">
                            <div className="info-item-label">Departure Address</div>
                            <div className="success-hash">{`${hardWallet.substring(0, getSubstringValue() || 10)}...${hardWallet.substring(hardWallet.length - 6)}`}</div>
                        </div>
                        <div className="success-info-item">
                            <div className="info-item-label">Sent To</div>
                            <div className="info-item-chain"><img src={to?.image.src} alt={to?.text} />{to?.text || "BSC"}</div>
                        </div>
                        <div className="success-info-item">
                            <div className="info-item-label">Destination address</div>
                            <div className="success-hash">{`${hardWallet.substring(0, getSubstringValue() || 10)}...${hardWallet.substring(hardWallet.length - 6)}`}</div>
                        </div>
                    </div>
                    <div className="success-info-box">
                        <div className="info-item-label">Sent NFT / 8</div>
                        <div className="success-nft-info">
                            <div>
                                <img src="#" alt="NFT" />
                                <div>Name</div>
                            </div>
                            <div>
                                <div>View Txn</div>
                                <div>Claim</div>
                            </div>
                        </div>
                    </div>
            </Modal.Body>
        </Modal>
    )
}
