import React from "react";
import { useSelector } from "react-redux";

export default function HederaWallet({ wallet }) {
    const from = useSelector((state) => state.general.from);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const OFF = { opacity: 0.6, pointerEvents: "none" };

    const getStyle = () => {
        switch (true) {
            case temporaryFrom?.type === "Hedera" || from?.type === "Hedera":
                return {};
            case !temporaryFrom && !from:
                return {};
            default:
                return OFF;
        }
    };

    switch (wallet) {
        case "Hashpack":
            return (
                <li
                    style={getStyle()}
                    // onClick={() => connectHandler("MetaMask")}
                    className="wllListItem"
                    data-wallet="Hashpack"
                >
                    {/* <img src={MetaMask} alt="MetaMask Icon" /> */}
                    <p>Hashpack</p>
                </li>
            );
        default:
            return (
                <li
                    style={getStyle()}
                    // onClick={() => connectHandler("MetaMask")}
                    className="wllListItem"
                    data-wallet="Blade"
                >
                    {/* <img src={MetaMask} alt="MetaMask Icon" /> */}
                    <p>Blade</p>
                </li>
            );
    }
}
