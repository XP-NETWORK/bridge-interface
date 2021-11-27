import React, { useState } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import { useSelector } from 'react-redux';
import Close from '../assets/img/icons/close.svg';


export default function MaiarModal({ strQR, qrCodeString, show, handleClose }) {
    const [maiarApproval, setMaiarApproval] = useState(false)
    // const [show, setShow] = useState();

    const confirmMaiarMob = useSelector(state => state.general.confirmMaiarMob)
    const walletConnectDeepLink = "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=";

    return (      
    <>
        {/* <Modal show={confirmMaiarMob}>
            <Modal.Header>
            <Modal.Title>Maiar Login</Modal.Title>
                <span className="CloseModal" onClick={handleClose}>
                    <img src={Close} alt="" />
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="maiar--modal__header"><img src="#" alt="Maiar Wallet Icon" /></div>
                <p>Confirm on Maiar Wallet</p>
                <p>To continue transaction XP.network requires confirmation on Maiar wallet.</p>
            </Modal.Body>   
        </Modal> */}
        <Modal show={show} onHide={handleClose} className="ChainModal">
            <Modal.Header>
                <Modal.Title>Maiar Login</Modal.Title>
                <span className="CloseModal" onClick={handleClose}>
                    <img src={Close} alt="" />
                </span>
            </Modal.Header>
            <Modal.Body>
                    <div className="maiarModal">
                    <div className="maiarSubtitle">Scan the QR code using Maiar</div>
                        <Image src={strQR} />
                        <a href= {`${walletConnectDeepLink}https://maiar.com/?wallet-connect=${encodeURIComponent(qrCodeString)}`} className="maiarConnectBtn">Maiar Login</a>
                    </div>
            </Modal.Body>   
        </Modal>
    </>
    )
}


// { window.innerWidth <= 600 ?
//     <div className="maiar__deeplink">
//     <a
//       id="accessWalletBtn"
//       data-testid="accessWalletBtn"
//       className="btn btn-primary px-4 mt-4"
//       href= {`${walletConnectDeepLink}https://maiar.com/?wallet-connect=${encodeURIComponent(
//         qrCodeString
//       )}`}

//       rel="noopener noreferrer nofollow"
//       target="_blank"
//     >Maiar Login</a>
//     </div>
//     : null
//     }