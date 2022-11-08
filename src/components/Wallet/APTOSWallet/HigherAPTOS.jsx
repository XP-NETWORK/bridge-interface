import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAptosAccount,
    setConnectedWallet,
} from "../../../store/reducers/generalSlice";
import { connectMartian } from "./AptosConnectors";

export default function HigherAPTOS(OriginalComponent) {
    return function updatedComponent() {
        const dispatch = useDispatch();
        const from = useSelector((state) => state.general.from);

        const getStyles = () => {
            let styles;
            if (from && from.type !== "APTOS") {
                styles = {
                    pointerEvents: "none",
                    opacity: "0.6",
                };
            }
            return styles;
        };

        const connectWallet = async (wallet) => {
            let connected;
            switch (wallet) {
                case "Martian":
                    connected = await connectMartian();
                    dispatch(setAptosAccount(connected.address));
                    dispatch(setConnectedWallet("Martian"));
                    break;
                case "Petra":
                    connected = await connectMartian();
                    dispatch(setAptosAccount(connected.address));
                    dispatch(setConnectedWallet("Petra"));
                    break;
                case "Pontem":
                    connected = await connectMartian();
                    dispatch(setAptosAccount(connected.address));
                    dispatch(setConnectedWallet("Pontem"));
                    break;
                default:
                    break;
            }
        };
        return (
            <OriginalComponent
                styles={getStyles}
                connectWallet={connectWallet}
            />
        );
    };
}
