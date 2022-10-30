import React, { useEffect, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { useDispatch, useSelector } from "react-redux";
import { awaitTonHubReady } from "../../Wallet/TONWallet/TonConnectors";
import tonkeeper from "../../../assets/img/wallet/tonkeeper.svg";
import { setSigner } from "../../../store/reducers/signersSlice";
import { setQRCodeModal } from "../../Wallet/TONWallet/tonStore";
import { Modal } from "react-bootstrap";
import { setTonAccount } from "../../../store/reducers/generalSlice";

export default function TonQeCodeModal() {
    let interval = useRef();
    const dispatch = useDispatch();
    const tonKeeperResponse = useSelector(
        (state) => state.tonStore.tonKeeperResponse
    );
    const tonHubSession = useSelector((state) => state.tonStore.tonHubSession);

    useEffect(() => {
        let session;
        interval = setInterval(async () => {
            session = await awaitTonHubReady();
            dispatch(setSigner(session.wallet));
            dispatch(setQRCodeModal(false));
            dispatch(setTonAccount(session.wallet.address));
            if (session) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Modal.Header className="border-0">
                <div className="tron-PopUp__header">
                    <Modal.Title>Connect TonHub</Modal.Title>
                    <span
                        className="CloseModal"
                        onClick={() => dispatch(setQRCodeModal(false))}
                    >
                        <div className="close-modal"></div>
                    </span>
                    <ol>
                        <li>Open Tonhub application</li>
                        <li>Touch icon in the top right corner </li>
                        <li>Scan the next QR code:</li>
                    </ol>
                </div>
            </Modal.Header>
            <QRCode
                className="ton-qrcode"
                value={tonKeeperResponse || tonHubSession?.link}
                size={256}
                quietZone={0}
                logoImage={tonkeeper}
                removeQrCodeBehindLogo
                eyeRadius={[
                    [10, 10, 0, 10],
                    [10, 10, 10, 0],
                    [10, 0, 10, 10],
                ]}
                fgColor="#002457"
            />
        </>
    );
}
