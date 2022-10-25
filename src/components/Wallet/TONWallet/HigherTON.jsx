import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setTonAccount,
    setTonWallet,
} from "../../../store/reducers/generalSlice";
import { createWallet } from "../ConnectWalletHelper";
import { connectTonHub } from "./TonConnectors";

export default function HigherTON(OriginalComponent) {
    //
    const updatedComponent = () => {
        //

        const dispatch = useDispatch();
        const { from, temporaryFrom } = useSelector((state) => state.general);

        const ifTypesTon = () => {
            return (
                (from && from === "TON") ||
                (temporaryFrom && temporaryFrom === "TON") ||
                (!from && !temporaryFrom)
            );
        };

        const getStyles = (wallet) => {
            let styles = {
                pointerEvents: ifTypesTon() ? "" : "none",
            };

            switch (wallet) {
                case "TonWallet":
                    break;
                case "TonKeeper":
                    break;
                case "TonHub":
                    break;
                default:
                    break;
            }
            return styles;
        };

        const connectWallet = async (wallet) => {
            let account;
            switch (wallet) {
                case "TonWallet":
                    account = await createWallet();
                    break;
                case "TonKeeper":
                    break;
                case "TonHub":
                    await connectTonHub();
                    break;
                default:
                    break;
            }
            dispatch(setTonAccount(account));
            dispatch(setTonWallet(true));
        };

        return (
            <OriginalComponent
                styles={getStyles}
                connectWallet={connectWallet}
            />
        );
    };

    return updatedComponent;
}
