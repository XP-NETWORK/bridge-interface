import React from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as Close } from "../assets/img/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import "./TronConnectionErrMod.css";
import { setTronLoginError } from "../store/reducers/generalSlice";

export default function TronConnectionErrMod() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.general.tronLoginError);

  function handleClose() {
    dispatch(setTronLoginError(undefined));
  }

  return error === "noTronWeb" ? (
    <Modal
      className="ts-modal"
      animation={false}
      size="sm"
      show={error}
      onHide={() => handleClose()}
    >
      <Modal.Header className="border-0">
        <span className="close-ts-modal" onClick={() => handleClose()}>
          <Close className="svgWidget" />
        </span>
        <Modal.Title className="tron-error-title">
          TronLink extension is not installed on your browser
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="technical-support__body">
        <a
          className="ts-button"
          href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec"
          target="_blank"
          rel="noreferrer"
        >
          Download Extension &#10143;
        </a>
      </Modal.Body>
    </Modal>
  ) : (
    <Modal
      className="ts-modal"
      animation={false}
      size="sm"
      show={error}
      onHide={() => handleClose()}
    >
      <Modal.Header className="border-0">
        <span className="close-ts-modal" onClick={() => handleClose()}>
          <Close className="svgWidget" />
        </span>
        <Modal.Title className="tron-error-title">
          TronLink extension is not connected on your browser
        </Modal.Title>
        <Modal.Body></Modal.Body>
      </Modal.Header>
    </Modal>
  );
}
