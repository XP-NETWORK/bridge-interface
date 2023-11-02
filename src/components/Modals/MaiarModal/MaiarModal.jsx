import { useEffect, React } from "react";
import { Image, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Close } from "../../../assets/img/icons/close.svg";

import { getRightPath } from "../../../utils";

import { withServices } from "../../App/hocs/withServices";

export default withServices(function MaiarModal({
    strQR,
    close,
    serviceContainer,
}) {
    const { bridge } = serviceContainer;
    const navigate = useNavigate();

    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const deepLink = useSelector((state) => state.general.deepLink);

    // deepLink

    const navigateToAccountRoute = () => {
        navigate(getRightPath(bridge.network));
    };

    const walletConnectDeepLink =
        "https://maiar.page.link/?apn=com.multiversx.maiar.wallet&isi=1519405832&ibi=com.multiversx.maiar.wallet&link=";

    useEffect(() => {
        if (elrondAccount) {
            close();

            navigateToAccountRoute();
        }
    }, [elrondAccount]);

    return (
        <>
            <Modal.Header>
                <Modal.Title>xPortal Login</Modal.Title>
                <span className="CloseModal" onClick={close}>
                    <Close className="svgWidget" />
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="maiarModal">
                    <Image src={strQR} />
                    <div className="maiarSubtitle">
                        Scan the QR code to connect xPortal
                    </div>
                    {window.innerWidth <= 600 ? (
                        <a
                            href={`${walletConnectDeepLink}https://maiar.com/?wallet-connect=${deepLink}`}
                            className="maiarConnectBtn"
                        >
                            xPortal Login
                        </a>
                    ) : (
                        ""
                    )}
                </div>
            </Modal.Body>
        </>
    );
});
