import React from "react";
import icon from "../../assets/img/wallet/unstoppable.svg";
import { connectUnstoppable } from "./ConnectWalletHelper";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccount,
    setUnstoppableDomains,
} from "../../store/reducers/generalSlice";
import PropTypes from "prop-types";

export default function Unscopables({ close }) {
    const dispatch = useDispatch();
    const handleConnect = async () => {
        close();
        window.localStorage.clear();
        const address = await connectUnstoppable();
        if (address) dispatch(setUnstoppableDomains(true));
        dispatch(setAccount(address));
    };

    const from = useSelector((state) => state.general.from);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const OFF = { opacity: 0.6, pointerEvents: "none" };

    const getStyle = () => {
        switch (true) {
            case from && from.type !== "EVM":
                return OFF;
            case temporaryFrom && temporaryFrom.type !== "EVM":
                return OFF;
            default:
                break;
        }
    };

    return (
        <li
            style={getStyle()}
            onClick={handleConnect}
            className="wllListItem"
            data-wallet="Unstoppable"
        >
            <img src={icon} alt="#" />
            <p>Unstoppable domains</p>
        </li>
    );
}
Unscopables.propTypes = {
    close: PropTypes.any,
};
