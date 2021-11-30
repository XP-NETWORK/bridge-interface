
import React, { useState } from 'react'
import { Modal, Image  } from "react-bootstrap";
import Close from '../assets/img/icons/close.svg';
import Success from '../assets/img/icons/Success.svg';
import Check from '../assets/img/icons/Check_circle.svg';
import FileCopy from '../assets/img/icons/FileCopy.svg';
import { useSelector } from 'react-redux';
import { chainsConfig } from './values';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// !TODO TX AVALANCHE

function NFTsuccess() {

    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const account = useSelector(state => state.general.account)
    const receiver = useSelector(state => state.general.receiver)
    const txnHashArr = useSelector(state => state.general.txnHashArr)


    const selectedNFTList = useSelector(state => state.general.selectedNFTList)


    const [show, setShow] = useState(true);
    const handleClose = () => {
        window.location.reload()
    };
    const handleShow = () => setShow(true);
    const [copied, setCopy] = useState()
    const showSuccess = useSelector(state => state.showSuccess)

    const copy = () => {
      setCopy(true)
      setTimeout(() => setCopy(false), 2000)
    }
    const tx = txnHashArr && txnHashArr.length > 0 ? typeof txnHashArr[0] === 'object' ? txnHashArr[0].hash.toString() : txnHashArr[0] : ''
    return (
        <div>

            {/* <a href="#" className="themBtn" onClick={handleShow}>Send</a> */}
            <Modal show={txnHashArr?.length} onHide={handleClose} className="nftSuccessMod">
                <Modal.Header>
                    <Modal.Title><img src={Success} /> Success</Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                        <img src={Close} />
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <div className="successBody">
                        <div className="successBox status">
                            <div className="sucesList">
                                <label>Status</label> <span className="statComp"><img src={Check} /> Completed</span>
                            </div>
                            <div className="sucesList">
                                <label>Date</label> <span className="statDate">{moment().format("YYYY-MM-DD hh:mm")}</span>
                            </div>
                            <CopyToClipboard 
                              text={tx}
                              onCopy={copy}
                            >   
                                <div className="sucesList">
                                    <label>Txn Hash</label> <span className="statTok colBlue">{ tx ? `${tx.substring(0, 10)}...${tx.substring(tx.length - 6)}` : '' }<Image src={FileCopy} className="ml5 copyTokk" /></span>
                                </div>
                                {/* <span className="copyTokk"><img src={FileCopy} /></span> */}
                            </CopyToClipboard>
                        </div>
                        <div className="successBox SentFrom">
                            <div className="sucesList">
                                <label>Sent From</label> <span className=""><img alt="" src={from ? from.image.src : ''} /> {from ? from.key : ''}</span>
                            </div>
                            <div className="sucesList">
                                <label>Departure Address</label> <span className="colBlue">{account ?`${account.substring(0, 10)}...${account.substring(account.length - 6)}`:''}</span>
                            </div>
                            <div className="sucesList">
                                <label>Sent To</label> <span className=""><img  alt="" src={to ? to.image.src : ''} /> {to ? to.key : ''}</span>
                            </div>
                            <div className="sucesList">
                                <label>Destination address</label> <span className="colBlue">{receiver ?`${receiver.substring(0, 10)}...${receiver.substring(receiver.length - 6)}`:'test'}</span>
                            </div>
                        </div>
                        <div className="nftSelectList">
                            <div className="nftSeleTop">
                                <div className="selectedNft">
                                    Sent NFT <span>/{ selectedNFTList?.length }</span>
                                </div>
                            </div>
                            <ul className="nftSelected">
                                { selectedNFTList.length ? selectedNFTList.map(( nft, index) => 
                                <li className="nftSelecItem">
                                    <img src={nft.image} alt="NFT" /> {nft.name}<span className="bluTextBtn"><a href={`${chainsConfig[from.key].tx + tx}`} target="_blank">View Txn</a></span>
                                </li>
                                ):''}
                            </ul>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NFTsuccess
