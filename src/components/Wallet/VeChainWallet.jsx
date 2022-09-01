import React, { useState } from "react";
import Sync2 from "../../assets/img/wallet/Sync2_.svg";
import { useDispatch, useSelector } from "react-redux";
import { connectSync2, connectVeChainThor } from "./ConnectWalletHelper";
import {
    setFrom,
    setSync2,
    setVeChainThorModal,
} from "../../store/reducers/generalSlice";
import { useLocation, useNavigate } from "react-router-dom";
import thorIcon from "../../assets/img/wallet/Thor.svg";
import { useCheckMobileScreen } from "../Settings/hooks";
// import { isMobile } from "react-device-detect";

export default function VeChainWallet({ close, wallet }) {
    const userAgent = navigator.userAgent;
    const isVeChainThor = userAgent.match(/vechainthorwallet|vechain|thor/);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const testnet = useSelector((state) => state.general.testNet);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [connecting, setConnecting] = useState("");

    const isMobile = useCheckMobileScreen();

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

    const navigateToAccountRoute = () => {
        navigate(testnet ? `/testnet/account` : `/account`);
    };

    const handleConnect = async (w) => {
        let account;
        setConnecting(true);
        switch (w) {
            case "VeChainThor":
                account = await connectVeChainThor(testnet);
                dispatch(setSync2(account));
                close();
                if (temporaryFrom) dispatch(setFrom(temporaryFrom));
                if (to) navigateToAccountRoute();
                break;
            default:
                account = await connectSync2(testnet);
                if (account) setConnecting(false);
                dispatch(setSync2(account));
                close();
                if (temporaryFrom) dispatch(setFrom(temporaryFrom));
                if (to) navigateToAccountRoute();
                break;
        }
    };

    switch (wallet) {
        case "VeChainThor":
            return (
                <li
                    style={isMobile ? getStyle() : OFF}
                    className="wllListItem"
                    data-wallet="VeChainThor"
                    onClick={() => handleConnect("VeChainThor")}
                >
                    <img
                        style={{ width: "28px" }}
                        src={thorIcon}
                        alt="VeChainThor"
                    />
                    <p>VeChainThor</p>
                </li>
            );

        default:
            return (
                !isVeChainThor && (
                    <li
                        style={getStyle()}
                        onClick={handleConnect}
                        className="wllListItem"
                        data-wallet="Sync2"
                    >
                        <img src={Sync2} alt="Sync2" />
                        <p>Sync2</p>
                    </li>
                )
            );
    }
}
