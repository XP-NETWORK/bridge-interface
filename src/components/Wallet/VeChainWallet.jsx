import React from "react";
import Sync2 from "../../assets/img/wallet/Sync2_.svg";
import { useDispatch, useSelector } from "react-redux";
import { connectSync2 } from "./ConnectWalletHelper";
import { setSync2 } from "../../store/reducers/generalSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function VeChainWallet({ close }) {
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const testnet = useSelector((state) => state.general.testNet);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const truePathname =
        location.pathname === "/" ||
        location.pathname === "/connect" ||
        location.pathname === "/testnet/connect";

    const getStyle = () => {
        if (!from) {
            return {};
        } else if (from && from.type === "VeChain") {
            return {};
        } else return OFF;
    };

    const navigateToAccountRoute = () => {
        navigate(testnet ? `/testnet/account` : `/account`);
    };

    const handleConnect = async () => {
        const account = await connectSync2(testnet);
        dispatch(setSync2(account));
        close();
        if (to) navigateToAccountRoute();
    };

    return (
        <li
            style={getStyle()}
            onClick={handleConnect}
            className="wllListItem"
            data-wallet="Sync2"
        >
            <img src={Sync2} alt="Sync2" />
            <p>Sync2</p>
        </li>
    );
}
