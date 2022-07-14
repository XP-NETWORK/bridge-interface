import React from "react";
import { useSelector } from "react-redux";
import keplr from "../../assets/img/wallet/keplr.svg";
import { connectKeplr } from "./ConnectWalletHelper";

export default function CosmosWallet({ wallet, close }) {
    const OFF = { opacity: 0.6, pointerEvents: "none" };

    const from = useSelector((state) => state.general.from);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);

    const onClickHandler = () => {
        connectKeplr();
        close();
    };

    const getStyle = () => {
        if (temporaryFrom?.type === "Cosmos") {
            return {};
        } else if (temporaryFrom && temporaryFrom?.type !== "Cosmos") {
            return OFF;
        } else if (!from) {
            return {};
        } else if (from && from.type === "Cosmos") {
            return {};
        } else return OFF;
    };

    return (
        <li
            style={getStyle()}
            onClick={onClickHandler}
            className="wllListItem keplr"
            data-wallet="Keplr"
        >
            <img src={keplr} alt="Keplr" />
            <p>Keplr</p>
        </li>
    );
}
