import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import popupicon from "../../../assets/img/icons/bitkeeppopup.png";
import { setBitKeepPopUp } from "../../../store/reducers/generalSlice";
import Close from "../../../assets/img/icons/close.svg";
import CopyHover from "../../../assets/img/icons/CopyHover.svg";
import copyTT from "../../../assets/img/icons/copytoclip.svg";
import copiedIcon from "../../../assets/img/icons/copiedtoclip.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopy from "../../../assets/img/icons/FileCopy.svg";

export default function BitKeepModal() {
    const handleClose = () => {
        setBitKeepPopUp(false);
    };
    const [onHover, setOnHover] = useState();
    const [copied, setCopied] = useState();
    const bitKeepPopUp = useSelector((state) => state.general.bitKeepPopUp);
    const dispatch = useDispatch();
    const copy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Modal
            className="bitkeep__popup"
            show={bitKeepPopUp}
            onHide={() => handleClose()}
        >
            <Modal.Header className="border-0">
                <div className="tron-PopUp__header">
                    <img
                        style={{ width: "50%" }}
                        className="tron-PopUp__icon"
                        src={popupicon}
                        alt=""
                    />
                    <Modal.Title>To continue bridging:</Modal.Title>
                    <span
                        className="bitkeep__CloseModal"
                        onHide={() => dispatch(setBitKeepPopUp(false))}
                        onClick={() => dispatch(setBitKeepPopUp(false))}
                    >
                        <img src={Close} alt="" />
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body className="modalBody text-center">
                <div className="tron-PopUp__list">
                    <div className="list__item">1. Copy link below</div>
                    <div className="list__item">2. Open BitKeep App</div>
                    <div className="list__item">
                        3. Paste link to BitKeep browser
                    </div>
                    <div className="list__item">4. Enjoy 😉</div>
                </div>
                <div className="tron-modal__link">
                    <div className="link__items">
                        <div className="tron-modal_address">
                            https://bridge.xp.network
                        </div>
                        {onHover && <img className="copyTronTT" src={copyTT} />}
                        {copied && (
                            <img className="copyTronTTc" src={copiedIcon} />
                        )}
                        <CopyToClipboard text={"https://bridge.xp.network"}>
                            <div className="tron-modal__copyIcon">
                                <img
                                    onClick={() => copy()}
                                    onMouseOver={() => setOnHover(true)}
                                    onMouseOut={() => setOnHover(false)}
                                    onMouseDown={() => setCopied(true)}
                                    onMouseUp={() => setCopied(false)}
                                    src={onHover ? CopyHover : FileCopy}
                                />
                            </div>
                        </CopyToClipboard>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
