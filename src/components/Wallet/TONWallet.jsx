import React from "react";

import { useDispatch } from "react-redux";
import { setTonAccount, setTonWallet } from "../../store/reducers/generalSlice";
import { createWallet } from "./ConnectWalletHelper";

import PropTypes from "prop-types";

import TON from "../../assets/img/chain/ton.svg";
export default function TONWallet({ wallet }) {
    const dispatch = useDispatch();

    const getStyle = () => {
        return {};
    };

    const connectHandler = async () => {
        const account = await createWallet();
        dispatch(setTonAccount(account));
        dispatch(setTonWallet(true));
    };

    switch (wallet) {
        case "TonKeeper":
            return (
                <li
                    style={getStyle()}
                    // onClick={connectHandler}
                    className="wllListItem"
                    data-wallet="TON Wallet"
                >
                    <img style={{ width: "28px" }} src={TON} alt="" />
                    <p>TON Keeper</p>
                </li>
            );

        default:
            return (
                <li
                    style={getStyle()}
                    onClick={connectHandler}
                    className="wllListItem"
                    data-wallet="TON Wallet"
                >
                    <img style={{ width: "28px" }} src={TON} alt="" />
                    <p>TON Wallet</p>
                </li>
            );
    }
}
TONWallet.propTypes = {
    wallet: PropTypes.string,
};
