import React from "react";
import { Modal } from "react-bootstrap";
import Close from "../assets/img/icons/close.svg";
import { CloseComp } from "../assets/img/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import "./TronConnectionErrMod.css";
import { setTronLoginError } from "../store/reducers/generalSlice";
import TronLink from "../assets/img/icons/TronLink.svg";

export default function TronConnectionErrMod() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.general.tronLoginError);
  const handleClose = () => {
    console.log("click");
    dispatch(setTronLoginError(undefined));
  };
  //
  return error === "noTronWeb" ? (
    <Modal
      className="tron-connection-error"
      animation={false}
      size="sm"
      show={error}
      onHide={() => handleClose()}
    >
      <span className="tron-connection-error-close" onClick={handleClose}>
        <CloseComp className="svgWidget" />
      </span>
      <Modal.Header className="border-0 tron-login-error__header">
        <img src={TronLink} alt="" />
        <Modal.Title className="tron-error-title">Install TronLink</Modal.Title>
      </Modal.Header>
      <Modal.Body className="tron-connection-error__body install">
        <div>To continue bridging install TronLink wallet</div>
        <a
          className="tron-connection-error-button"
          href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec"
          target="_blank"
          rel="noreferrer"
        >
          Install Wallet
        </a>
      </Modal.Body>
    </Modal>
  ) : (
    <Modal
      className="tron-connection-error"
      animation={false}
      size="sm"
      show={error}
      onHide={() => handleClose()}
    >
      <span className="tron-connection-error-close" onClick={handleClose}>
        <CloseComp className="svgWidget" />
      </span>
      <Modal.Header className="border-0 tron-login-error__header">
        <img src={TronLink} alt="" />
        <Modal.Title className="tron-error-title">Connect TronLink</Modal.Title>
        <Modal.Body className="tron-connection-error__body">
          To continue bridging connect your TronLink wallet
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
}
