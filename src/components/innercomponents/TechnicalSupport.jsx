import React from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { useDispatch } from "react-redux";
import "./TechnicalSupport.css";
import { removeFromNotWhiteListed } from "../../store/reducers/generalSlice";

export default function TechnicalSupport() {
    const dispatch = useDispatch();

    function handleClose() {
        dispatch(removeFromNotWhiteListed());
    }

    return (
        <>
            <Modal.Header className="border-0">
                <span className="close-ts-modal" onClick={() => handleClose()}>
                    <Close className="svgWidget" />
                </span>
                <Modal.Title>Submit NFT for approval</Modal.Title>
            </Modal.Header>
            <Modal.Body className="technical-support__body">
                <div className="ts-nft__image">
                    <img
                        // src={nftsToWhitelist[0].url}
                        alt="Not whitelisted NFT"
                    />
                </div>
                <div className="ts-nft__info"></div>
                <div className="ns-message">
                    This NFT can`&apos;`t be sent. The NFT Bridge requires
                    whitelisting for NFTs
                </div>
                <a
                    className="ts-button"
                    href="https://t.me/xp_network"
                    target="_blank"
                    rel="noreferrer"
                >
                    Technical Support &#10143;
                </a>
            </Modal.Body>
        </>
    );
}
