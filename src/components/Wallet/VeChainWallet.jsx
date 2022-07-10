import React, { useState } from "react";
import Sync2 from "../../assets/img/wallet/Sync2_.svg";
import { useDispatch, useSelector } from "react-redux";
import { connectSync2 } from "./ConnectWalletHelper";
import { setFrom, setSync2 } from "../../store/reducers/generalSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function VeChainWallet({ close }) {
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const testnet = useSelector((state) => state.general.testNet);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [connecting, setConnecting] = useState("");

    const getStyle = () => {
        if (temporaryFrom?.type === "VeChain") {
            return {};
        } else if (temporaryFrom && temporaryFrom?.type !== "VeChain") {
            return OFF;
        } else if (!from) {
            return {};
        } else if (from && from.type === "VeChain") {
            return {};
        } else return OFF;
    };

    const query = window.location.search

    const navigateToAccountRoute = () => {
        navigate(testnet ? `/testnet/account${query ? query : ""}` : `/account${query ? query : ""}`);
    };

    const handleConnect = async () => {
        setConnecting(true);
        const account = await connectSync2(testnet);
        if (account) setConnecting(false);
        dispatch(setSync2(account));
        close();
        if (temporaryFrom) dispatch(setFrom(temporaryFrom));
        if (to) navigateToAccountRoute();
    };

    return (
        <li
            style={!connecting ? getStyle() : OFF}
            onClick={handleConnect}
            className="wllListItem"
            data-wallet="Sync2"
        >
            <img src={Sync2} alt="Sync2" />
            <p>Sync2</p>
        </li>
    );
}
