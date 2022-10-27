import React from "react";
import { useSelector } from "react-redux";

export default function Network() {
    const testnet = useSelector((state) => state.general.testNet);
    const staging = useSelector((state) => state.general.staging);

    switch (true) {
        case testnet:
            return <span className="testnet">TestNet</span>;
        case staging:
            return <span className="testnet">Staging</span>;
        default:
            return "";
    }
}
