import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRedirectModal } from "../../../store/reducers/generalSlice";
import { Modal } from "react-bootstrap";
import Close from "../../../assets/img/icons/close.svg";
import CopyHover from "../../../assets/img/icons/CopyHover.svg";
import { ReactComponent as CopyTT } from "../../../assets/img/icons/copytoclip.svg";
import { ReactComponent as CopiedIcon } from "../../../assets/img/icons/copiedtoclip.svg";
import FileCopy from "../../../assets/img/icons/FileCopy.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import vechainframe from "../../../assets/img/icons/vechainframe.svg";
import bitkeepicon from "../../../assets/img/icons/bitkeeppopup.png";
import finaframe from "../../../assets/img/icons/finaframe.png";
import solflare from "../../../assets/img/icons/solflare.png";
import phantom from "../../../assets/img/icons/phantom.png";

import { useCheckMobileScreen } from "../../Settings/hooks";

export default function RedirectModal() {
    const dispatch = useDispatch();
    const [onHover, setOnHover] = useState();
    const [copied, setCopied] = useState();
    const isMobile = useCheckMobileScreen();
    const redirectModal = useSelector((state) => state.general.redirectModal);

    const widget = useSelector((state) => state.widget.widget);

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
            case "Phantom":
                return phantom;
            case "Solflare":
                return solflare;
            default:
                break;
        }
    };

    // const getWalletName = () => {
    //     switch (redirectModal) {
    //         case "Fina":
    //             return "Fina";
    //         case "BitKeep":
    //             return "BitKeep";
    //         case "VeChainThor":
    //             return "VeChainThor";
    //         default:
    //             break;
    //     }
    // };

    const link = !widget
        ? window.location.origin
        : `${window.location.origin}${window.location.search}`;

    const text = link.length > 26 ? `${link.substr(0, 25)}...` : link;

    return (
        <>
            <Modal.Header className="border-0">
                <div className="tron-PopUp__header">
                    <img className="tron-PopUp__icon" src={getIcon()} alt="" />
                    <Modal.Title>To continue bridging:</Modal.Title>
                    <span
                        className="bitkeep__CloseModal"
                        onClick={() => dispatch(setRedirectModal(false))}
                    >
                        <img src={Close} alt="" />
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body className="modalBody text-center">
                <div className="tron-PopUp__list">
                    <div className="list__item">1. Copy link below</div>
                    <div className="list__item">{`2. Open ${redirectModal} App`}</div>
                    <div className="list__item">3. Paste link to browser</div>
                    <div className="list__item">4. Enjoy 😉</div>
                </div>
                <div className="tron-modal__link">
                    <div className="link__items">
                        <div className="tron-modal_address">{text}</div>
                        {onHover && <CopyTT className="svgWidget copyTronTT" />}
                        {copied && (
                            <CopiedIcon className="svgWidget copyTronTTc" />
                        )}
                        {!isMobile && (
                            <CopyToClipboard
                                text={link}
                                onClick={() => {
                                    if (isMobile) {
                                        var range = document.body.createTextRange();
                                        range.selectNode(
                                            document.querySelector(
                                                ".tron-modal_address"
                                            )
                                        );
                                        window.getSelection().removeAllRanges();
                                        window.getSelection().addRange(range);
                                    }
                                }}
                            >
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
                        )}
                    </div>
                </div>
            </Modal.Body>
        </>
    );
}

/**
 * 
 *   const link = !widget
    ? "https://bridge.xp.network"
    : `${window.location.origin}${window.location.search}`;

 */
