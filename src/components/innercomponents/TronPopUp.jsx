import React, { useState } from 'react'
import Close from '../../assets/img/icons/close.svg';
import { Modal } from "react-bootstrap"
import tronPopUp from "../../assets/img/icons/tronPopUp.png"
import { CopyToClipboard } from 'react-copy-to-clipboard';

import FileCopy from '../../assets/img/icons/FileCopy.svg'
import CopyHover from '../../assets/img/icons/CopyHover.svg';
import copyTT from "../../assets/img/icons/copytt.png"
import copiedIcon from "../../assets/img/icons/Copied.png"

export default function TronPopUp() {

    const [onHover, setOnHover] = useState()
    const [onMouseDown, setOnMouseDown] = useState()

    return (
        <div>
            <Modal.Header className="border-0">
                <div className="tron-PopUp__header">
                <img className="tron-PopUp__icon"  src={tronPopUp} alt="" />
                    <Modal.Title>To continue bridging:</Modal.Title>
                    <span className="CloseModal" onHide={""} onClick={""}>
                        <img src={Close} alt="" />
                    </span>
                </div>
                </Modal.Header>
                <Modal.Body className="modalBody text-center">
                    <div className="tron-PopUp__list">
                        <div className="list__item">1. Paste link to Tronlink browser</div>
                        <div className="list__item">2. Enjoy 😉</div>
                        <div className="list__item">3. Copy link below</div>
                        <div className="list__item">4. Open Tronlink App</div>
                    </div>
                    <div className="tron-modal__link">
                        <div className="link__items">
                            <div className="tron-modal_address">https://bridge.xp.network</div>
                            <CopyToClipboard text={"https://bridge.xp.network"}>
                            <div className="tron-modal__copyIcon"><img onMouseOver={() => setOnHover(true)} onMouseOut={() => setOnHover(false)} onMouseDown={() => setOnMouseDown(true)} onMouseUp={() => setOnMouseDown(false) } src={ onHover ? CopyHover : FileCopy} /></div>
                            </CopyToClipboard>
                        </div>
                    </div>
            </Modal.Body>
        </div>
    )
}
