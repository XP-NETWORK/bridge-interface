import React from "react";
import { useSelector } from "react-redux";
import { connectHashpack } from "./ConnectWalletHelper";

export default function HederaWallet({ wallet, close }) {
    const from = useSelector((state) => state.general.from);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const hederaAccount = useSelector((state) => state.general.hederaAccount);
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

    const connectHandler = async (wallet) => {
        switch (wallet) {
            case "Hashpack":
                const connected = await connectHashpack();
                if (connected) close();
                break;
            default:
                break;
        }
    };

    switch (wallet) {
        case "Hashpack":
            return (
                <li
                    style={getStyle()}
                    onClick={() => connectHandler("Hashpack")}
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
