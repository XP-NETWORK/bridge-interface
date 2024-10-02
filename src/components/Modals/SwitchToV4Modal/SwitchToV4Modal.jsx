import React from "react";
import { Modal } from "react-bootstrap";
import "./SwitchToV4Modal.css";
import { withServices } from "../../App/hocs/withServices";
import decentralizeBridge from "../../../assets/img/decentralize-bridge.svg";
import { useDispatch } from "react-redux";
import { setShowSwitchToV4Modal } from "../../../store/reducers/generalSlice";

export default withServices(function SuccessModal() {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setShowSwitchToV4Modal(false));
  };

  return (
    <>
      <span onClick={handleClose} className="switch-modal-close">
        <div className="close-modal"></div>
      </span>
      <Modal.Header className="border-0">
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body className="switch-info-list">
        <div>
          <img src={decentralizeBridge}></img>
        </div>
        <div className="switch-info-text">
          <h6 className="switch-info-text-h">
            🎉 Experience the Next Generation of NFT Bridging! 🎉
          </h6>
          <p>
            The new decentralized version of our multi-chain NFT bridge is live.
            Bridge securely across multiple blockchains!
          </p>
        </div>
        <div className="switch-info-btn">
          <a
            className="switch-info-btn-link"
            href="https://decentralized.bridge.xp.network/"
          >
            Switch to Decentralized NFT Bridge
          </a>
        </div>
        <div className="switch-info-btn">
          <div className="switch-info-btn-stay" onClick={handleClose}>
            Use NFT Bridge
          </div>
        </div>
      </Modal.Body>
    </>
  );
});
