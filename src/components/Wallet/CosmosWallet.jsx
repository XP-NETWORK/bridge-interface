import React from "react";
import keplr from "../../assets/img/wallet/keplr.svg";
import { connectKeplr } from "./ConnectWalletHelper";

export default function CosmosWallet({ wallet, close }) {
    const onClickHandler = () => {
        connectKeplr();
        close();
    };

    return (
        <li
            onClick={onClickHandler}
            className="wllListItem keplr"
            data-wallet="Keplr"
        >
            <img src={keplr} alt="Keplr" />
            <p>Keplr</p>
        </li>
    );
}
