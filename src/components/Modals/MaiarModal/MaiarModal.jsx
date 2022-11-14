import { useEffect, React } from "react";
import { Image, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Close } from "../../../assets/img/icons/close.svg";
import PropTypes from "prop-types";
import { getRightPath } from "../../../wallet/helpers";
import { setQrCodeString } from "../../../store/reducers/generalSlice";

export default function MaiarModal({ strQR, qrCodeString }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const qrCodeImage = useSelector((state) => state.general.qrCodeImage);

  const navigateToAccountRoute = () => {
    navigate(getRightPath());
  };

  const closeMaiarQRCodeModal = () => {
    if (qrCodeImage) {
      dispatch(setQrCodeString(""));
    }
  };

  const walletConnectDeepLink =
    "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=";

  useEffect(() => {
    if (elrondAccount) {
      closeMaiarQRCodeModal();
      navigateToAccountRoute();
    }
  }, [elrondAccount]);

  return (
    <>
      <Modal.Header>
        <Modal.Title>Maiar Login</Modal.Title>
        <span className="CloseModal" onClick={closeMaiarQRCodeModal}>
          <Close className="svgWidget" />
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="maiarModal">
          <Image src={strQR} />
          <div className="maiarSubtitle">Scan the QR code to connect Maiar</div>
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
    </>
  );
}
MaiarModal.propTypes = {
  strQR: PropTypes.string,
  qrCodeString: PropTypes.string,
  show: PropTypes.any,
  handleClose: PropTypes.any,
};
