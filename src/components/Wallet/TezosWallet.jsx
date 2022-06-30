import React from "react";
import { connectTempleWallet, connectBeacon } from "./ConnectWalletHelper";
import BeaconW from "../../assets/img/wallet/BeaconWhite.svg";
import Temple from "../../assets/img/wallet/Temple.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setFrom } from "../../store/reducers/generalSlice";

export default function TezosWallet({ wallet, close }) {
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const testnet = useSelector((state) => state.general.testNet);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const truePathname =
        location.pathname === "/" ||
        location.pathname === "/connect" ||
        location.pathname === "/testnet/connect";

    const navigateToAccountRoute = () => {
        navigate(testnet ? `/testnet/account` : `/account`);
    };

    const handleConnect = async (wallet) => {
        let connected;
        switch (wallet) {
            case "TempleWallet":
                connected = await connectTempleWallet();
                close();
                if (temporaryFrom) dispatch(setFrom(temporaryFrom));
                if (connected && to) navigateToAccountRoute();
                break;
            case "Beacon":
                connected = await connectBeacon();
                close();
                if (temporaryFrom) dispatch(setFrom(temporaryFrom));
                if (connected && to) navigateToAccountRoute();
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
                } else if (temporaryFrom?.type === "Tezos") {
                    return {};
                } else if (temporaryFrom && temporaryFrom?.type !== "Tezos") {
                    return OFF;
                } else if (!from) {
                    return {};
                } else if (from.text !== "Tezos") {
                    return OFF;
                }
                break;
            case "Beacon":
                if (temporaryFrom?.type === "Tezos") {
                    return {};
                } else if (!from) {
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
