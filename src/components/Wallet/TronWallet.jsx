import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectTronlink } from "./ConnectWalletHelper";
import Tron from "../../assets/img/wallet/TronLink.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { setFrom } from "../../store/reducers/generalSlice";

export default function TronWallet({ close }) {
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const testnet = useSelector((state) => state.general.testNet);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const truePathname =
        location.pathname === "/" ||
        location.pathname === "/connect" ||
        location.pathname === "/testnet/connect";

    const connectHandler = async () => {
        const connected = await connectTronlink();
        close();
        if (temporaryFrom) dispatch(setFrom(temporaryFrom));
        if (connected && to) navigateToAccountRoute();
    };

    const navigateToAccountRoute = () => {
        navigate(testnet ? `/testnet/account` : `/account`);
    };

    const getStyle = () => {
        if (temporaryFrom?.type === "Tron") {
            return {};
        } else if (temporaryFrom && temporaryFrom?.type !== "Tron") {
            return OFF;
        } else if (from && from?.text !== "Tron") return OFF;
        else return {};
    };

    return (
        <li
            style={getStyle()}
            onClick={connectHandler}
            data-wallet="TronLink"
            className="wllListItem"
        >
            <img src={Tron} alt="Tron Icon" />
            <p>TronLink</p>
        </li>
    );
}
