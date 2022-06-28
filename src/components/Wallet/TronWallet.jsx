import React from "react";
import { useSelector } from "react-redux";
import { connectTronlink } from "./ConnectWalletHelper";
import Tron from "../../assets/img/wallet/TronLink.svg";
import { useLocation, useNavigate } from "react-router-dom";

export default function TronWallet({ close }) {
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const testnet = useSelector((state) => state.general.testNet);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const navigate = useNavigate();
    const location = useLocation();
    const truePathname =
        location.pathname === "/" ||
        location.pathname === "/connect" ||
        location.pathname === "/testnet/connect";

    const connectHandler = async () => {
        const connected = await connectTronlink();
        close();
        if (connected && to) navigateToAccountRoute();
    };

    const navigateToAccountRoute = () => {
        navigate(testnet ? `/testnet/account` : `/account`);
    };

    const getStyle = () => {
        if (from?.text === "Tron") return {};
        else return OFF;
    };

    return (
        <li
            style={truePathname ? getStyle() : {}}
            onClick={connectHandler}
            data-wallet="TronLink"
            className="wllListItem"
        >
            <img src={Tron} alt="Tron Icon" />
            <p>TronLink</p>
        </li>
    );
}
