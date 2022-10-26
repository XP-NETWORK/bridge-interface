import React, { useEffect, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSelector } from "react-redux";
import { awaitReadiness } from "../../Wallet/TONWallet/TonConnectors";

export default function TonQeCodeModal() {
    let interval = useRef();
    const {
        tonKeeperResponse,
        v1: { callback_url },
    } = useSelector((state) => state.tonStore.tonKeeperResponse);

    useEffect(() => {
        let resp;
        interval = setInterval(async () => {
            resp = await awaitReadiness(tonKeeperResponse);
        }, 5000);
        if (resp) clearInterval(interval);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <QRCode
            value={callback_url}
            size={256}
            quietZone={0}
            // logoImage={tonkeeperIconPath}
            // removeQrCodeBehindLogo
            eyeRadius={[
                [10, 10, 0, 10],
                [10, 10, 10, 0],
                [10, 0, 10, 10],
            ]}
            fgColor="#002457"
        />
    );
}
