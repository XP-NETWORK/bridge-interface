import React, { useEffect } from "react";
import icon from "../../assets/img/wallet/unstoppable.svg";
import { connectUnstoppable } from "./ConnectWalletHelper";
import UAuth from "@uauth/js";
import { useDispatch } from "react-redux";
import {
    setAccount,
    setUnstoppableDomains,
} from "../../store/reducers/generalSlice";

export default function Unscopables({ close }) {
    const dispatch = useDispatch();
    const handleConnect = async () => {
        close();
        const address = await connectUnstoppable();
        if (address) dispatch(setUnstoppableDomains(true));
        dispatch(setAccount(address));
    };

    return (
        <li
            // style={getStyle()}
            onClick={handleConnect}
            className="wllListItem"
            data-wallet="Sync2"
        >
            <img src={icon} alt="#" />
            <p>Unstoppable domains</p>
        </li>
    );
}
