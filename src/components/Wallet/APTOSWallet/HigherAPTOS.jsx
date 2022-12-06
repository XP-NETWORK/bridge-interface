import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccount,
    setAptosAccount,
    setConnectedWallet,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";
import { setSigner } from "../../../store/reducers/signersSlice";
import { connectMartian, connectPetra, connectPontem } from "./AptosConnectors";

export default function HigherAPTOS(OriginalComponent) {
    return function updatedComponent() {
        const dispatch = useDispatch();
        const from = useSelector((state) => state.general.from);

        const getStyles = () => {
            let styles = {};
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
            let Aptos;
            switch (wallet) {
                case "Martian":
                    connected = await connectMartian();
                    dispatch(setWalletsModal(false));
                    dispatch(setConnectedWallet("Martian"));
                    Aptos = window.martian;
                    dispatch(
                        setSigner({
                            aptosClient: Aptos,
                            address: connected.address,
                        })
                    );
                    break;
                case "Petra":
                    connected = await connectPetra();
                    dispatch(setWalletsModal(false));
                    dispatch(setConnectedWallet("Petra"));
                    Aptos = window.petra;
                    dispatch(
                        setSigner({
                            aptosClient: Aptos,
                            address: connected.address,
                        })
                    );
                    break;
                case "Pontem":
                    connected = await connectPontem();
                    dispatch(setWalletsModal(false));
                    dispatch(setConnectedWallet("Pontem"));
                    Aptos = window.pontem;
                    dispatch(
                        setSigner({
                            aptosClient: Aptos,
                            address: connected.address,
                        })
                    );
                    break;
                default:
                    break;
            }
            dispatch(setAptosAccount(connected.address));
            dispatch(setAccount(connected.address));
        };
        return (
            <OriginalComponent
                styles={getStyles}
                connectWallet={connectWallet}
            />
        );
    };
}
