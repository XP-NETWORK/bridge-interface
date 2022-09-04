import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setRedirectModal,
    setVeChainThorModal,
} from "../../../store/reducers/generalSlice";
import { Modal } from "react-bootstrap";
import Close from "../../../assets/img/icons/close.svg";
import CopyHover from "../../../assets/img/icons/CopyHover.svg";
import copyTT from "../../../assets/img/icons/copytoclip.svg";
import copiedIcon from "../../../assets/img/icons/copiedtoclip.svg";
import FileCopy from "../../../assets/img/icons/FileCopy.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import vechainframe from "../../../assets/img/icons/vechainframe.svg";
import bitkeepicon from "../../../assets/img/icons/bitkeeppopup.png";
import finaframe from "../../../assets/img/icons/finaframe.png";

export default function RedirectModal() {
    const dispatch = useDispatch();
    const [onHover, setOnHover] = useState();
    const [copied, setCopied] = useState();
    const redirectModal = useSelector((state) => state.general.redirectModal);
    const handleClose = () => {
        dispatch(setRedirectModal(false));
    };

    const copy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getIcon = () => {
        switch (redirectModal) {
            case "Fina":
                return finaframe;
            case "VeChainThor":
                return vechainframe;
            case "BitKeep":
                return bitkeepicon;
            default:
                break;
        }
    };

    const getWalletName = () => {
        switch (redirectModal) {
            case "Fina":
                return "Fina";
            case "BitKeep":
                return "BitKeep";
            case "VeChainThor":
                return "VeChainThor";
            default:
                break;
        }
    };

    return (
        <Modal
            className="bitkeep__popup"
            show={redirectModal}
            onHide={() => handleClose()}
        >
            <Modal.Header className="border-0">
                <div className="tron-PopUp__header">
                    <img
                        // style={{ width: "50%" }}
                        className="tron-PopUp__icon"
                        src={getIcon()}
                        alt=""
                    />
                    <Modal.Title>To continue bridging:</Modal.Title>
                    <span
                        className="bitkeep__CloseModal"
                        onHide={() => dispatch(setRedirectModal(false))}
                        onClick={() => dispatch(setRedirectModal(false))}
                    >
                        <img src={Close} alt="" />
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body className="modalBody text-center">
                <div className="tron-PopUp__list">
                    <div className="list__item">1. Copy link below</div>
                    <div className="list__item">
                        {`2. Open ${getWalletName()} App`}
                    </div>
                    <div className="list__item">3. Paste link to browser</div>
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
                                    alt=""
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
