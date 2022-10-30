import React from "react";
import { useDispatch } from "react-redux";
import TON from "../../assets/img/chain/ton.svg";
import { setTonAccount, setTonWallet } from "../../store/reducers/generalSlice";
import { createWallet } from "./ConnectWalletHelper";

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
        case "some different ton wallet":
            break;

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
