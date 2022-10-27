import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setTonAccount,
    setTonWallet,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";
import { setWalletAddress } from "../../../store/reducers/signersSlice";
import {
    connectTonHub,
    connectTonKeeper,
    connectTonWallet,
} from "./TonConnectors";

export default function HigherTON(OriginalComponent) {
    //
    const updatedComponent = () => {
        //

        const dispatch = useDispatch();
        const { from, temporaryFrom } = useSelector((state) => state.general);

        const ifTypeIsTonOrNotSelected = () => {
            switch (true) {
                case !from && !temporaryFrom:
                    return true;
                case temporaryFrom && temporaryFrom?.type === "TON":
                    return true;
                case from && from?.type === "TON":
                    return true;
                default:
                    return false;
            }
        };

        const getStyles = (wallet) => {
            let styles = {
                pointerEvents: ifTypeIsTonOrNotSelected() ? "" : "none",
                opacity: ifTypeIsTonOrNotSelected() ? "" : "0.6",
            };

            switch (wallet) {
                case "TonWallet":
                    break;
                case "TonKeeper":
                    // styles.display = "none";
                    break;
                case "TonHub":
                    // styles.display = "none";
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
                    account = await connectTonWallet();
                    break;
                case "TonKeeper":
                    await connectTonKeeper();
                    break;
                case "TonHub":
                    await connectTonHub();
                    break;
                default:
                    break;
            }
            dispatch(setTonAccount(account));
            dispatch(setWalletAddress(account));
            dispatch(setTonWallet(true));
            dispatch(setWalletsModal(false));
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
