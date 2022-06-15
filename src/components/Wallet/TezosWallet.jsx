import React from "react";
import { connectTempleWallet, connectBeacon } from "./ConnectWalletHelper";
import BeaconW from "../../assets/img/wallet/BeaconWhite.svg";
import Temple from "../../assets/img/wallet/Temple.svg";
import { useSelector } from "react-redux";

export default function TezosWallet({ wallet, close }) {
    const from = useSelector((state) => state.general.from);
    const innerWidth = useSelector((state) => state.general.innerWidth);
    const OFF = { opacity: 0.6, pointerEvents: "none" };

    const handleConnect = async (wallet) => {
        let connected;
        switch (wallet) {
            case "TempleWallet":
                connectTempleWallet();
                close();
                break;
            case "Beacon":
                await connectBeacon();
                close();
                break;
            default:
                break;
        }
    };

    const getStyle = () => {
        switch (wallet) {
            case "TempleWallet":
                if (window.innerWidth < 600) {
                    return { display: "none" };
                } else if (!from) {
                    return {};
                } else if (from.text !== "Tezos") {
                    return OFF;
                }
                break;
            case "Beacon":
                if (!from) {
                    return {};
                } else if (from.text !== "Tezos") return OFF;
                break;
            default:
                break;
        }
    };

    return wallet === "TempleWallet" ? (
        <li
            onClick={() => handleConnect("TempleWallet")}
            data-wallet="TempleWallet"
            style={getStyle()}
            className="wllListItem"
        >
            <img style={{ width: "28px" }} src={Temple} alt="Temple Icon" />{" "}
            <p>Temple Wallet</p>
        </li>
    ) : (
        <li
            style={getStyle()}
            data-wallet="Beacon"
            onClick={() => handleConnect("Beacon")}
            className="wllListItem beacon"
        >
            <img src={BeaconW} alt="Kukai Icon" />
            <p>Beacon</p>
        </li>
    );
}
