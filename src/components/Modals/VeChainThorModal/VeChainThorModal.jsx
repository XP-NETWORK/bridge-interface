import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVeChainThorModal } from "../../../store/reducers/generalSlice";
import { Modal } from "react-bootstrap";
import Close from "../../../assets/img/icons/close.svg";
import CopyHover from "../../../assets/img/icons/CopyHover.svg";
import copyTT from "../../../assets/img/icons/copytoclip.svg";
import copiedIcon from "../../../assets/img/icons/copiedtoclip.svg";
import FileCopy from "../../../assets/img/icons/FileCopy.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import vechainframe from "../../../assets/img/icons/vechainframe.svg";

export default function VeChainThorModal() {
    const dispatch = useDispatch();
    const [onHover, setOnHover] = useState();
    const [copied, setCopied] = useState();
    const veChainThorModal = useSelector(
        (state) => state.general.veChainThorModal
    );
    const handleClose = () => {
        dispatch(setVeChainThorModal(false));
    };

    const copy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Modal
            className="bitkeep__popup"
            show={veChainThorModal}
            onHide={() => handleClose()}
        >
            <Modal.Header className="border-0">
                <div className="tron-PopUp__header">
                    <img
                        // style={{ width: "50%" }}
                        className="tron-PopUp__icon"
                        src={vechainframe}
                        alt=""
                    />
                    <Modal.Title>To continue bridging:</Modal.Title>
                    <span
                        className="bitkeep__CloseModal"
                        onHide={() => dispatch(setVeChainThorModal(false))}
                        onClick={() => dispatch(setVeChainThorModal(false))}
                    >
                        <img src={Close} alt="" />
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body className="modalBody text-center">
                <div className="tron-PopUp__list">
                    <div className="list__item">1. Copy link below</div>
                    <div className="list__item">2. Open VeChainThor App</div>
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
