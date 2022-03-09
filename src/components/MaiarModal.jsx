import React, { useState } from "react";
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReactComponent as Close } from "../assets/img/icons/close.svg";

export default function MaiarModal({ strQR, qrCodeString, show, handleClose }) {
  const confirmMaiarMob = useSelector((state) => state.general.confirmMaiarMob);
  const walletsModal = useSelector(state => state.general.walletsModal)

  const walletConnectDeepLink =
    "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=";

  return (
    <>
      <Modal
        show={show || walletsModal}
        animation={false}
        onHide={handleClose}
        className="ChainModal"
      >
        <Modal.Header>
          <Modal.Title>Maiar Login</Modal.Title>
          <span className="CloseModal" onClick={handleClose}>
            <Close className="svgWidget" />
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="maiarModal">
            <div className="maiarSubtitle">Scan the QR code using Maiar</div>
            <Image src={strQR} />
            {window.innerWidth <= 600 ? (
              <a
                href={`${walletConnectDeepLink}https://maiar.com/?wallet-connect=${encodeURIComponent(
                  qrCodeString
                )}`}
                className="maiarConnectBtn"
              >
                Maiar Login
              </a>
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
