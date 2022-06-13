import { useEffect } from "react";
import { Image, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Close } from "../assets/img/icons/close.svg";

export default function MaiarModal({
    strQR,
    qrCodeString,
    show,
    handleClose,
    setShow,
}) {
    const walletsModal = useSelector((state) => state.general.walletsModal);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const testnet = useSelector((state) => state.general.testnet);
    const navigate = useNavigate();

    const navigateToAccountRoute = () => {
        navigate(testnet ? `/testnet/account` : `/account`);
    };

    const walletConnectDeepLink =
        "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=";

    useEffect(() => {
        if (elrondAccount) {
            handleClose();
            navigateToAccountRoute();
        }
    }, [elrondAccount]);

    return (
        <>
            <Modal
                show={show || walletsModal}
                animation={false}
                onHide={handleClose}
                className="MaiarModal"
            >
                <Modal.Header>
                    <Modal.Title>Maiar Login</Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                        <Close className="svgWidget" />
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <div className="maiarModal">
                        <Image src={strQR} />
                        <div className="maiarSubtitle">
                            Scan the QR code to connect Maiar
                        </div>
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
