import { useEffect } from "react";
import { Image, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReactComponent as Close } from "../assets/img/icons/close.svg";

export default function MaiarModal({ strQR, qrCodeString, show, handleClose, setShow }) {
  const walletsModal = useSelector(state => state.general.walletsModal)
  const elrondAccount = useSelector(state => state.general.elrondAccount)

  const walletConnectDeepLink =
    "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=";

useEffect(() => {
  if(elrondAccount)handleClose()
}, [elrondAccount])


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
