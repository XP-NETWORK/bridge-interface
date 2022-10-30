import React from "react";
import { useSelector } from "react-redux";

export default function Network() {
    const testnet = useSelector((state) => state.general.testNet);
    const staging = useSelector((state) => state.general.staging);
    const checkWallet = useSelector((state) => state.general.checkWallet);

    switch (true) {
        case testnet:
            return <span className="testnet">TestNet</span>;
        case staging:
            return <span className="testnet">Staging</span>;
        case checkWallet?.length > 0:
            return (
                <span style={{ background: "green" }} className="testnet">
                    CheckWallet
                </span>
            );
        default:
            return "";
    }
}
