import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setAccount,
    setConnectedWallet,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";
import { setSigner } from "../../../store/reducers/signersSlice";
import { getRightPath } from "../../../wallet/helpers";
import { connectMartian, connectPetra, connectPontem } from "./AptosConnectors";
import { withServices } from "../../App/hocs/withServices";
import { Chain } from "xp.network";

export default function HigherAPTOS(OriginalComponent) {
    const updatedComponent = withServices((props) => {
        const { serviceContainer, close } = props;
        const { bridge } = serviceContainer;
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { from, testNet, to } = useSelector((state) => state.general);

        const navigateToAccountRoute = () => {
            if (from && to) navigate(getRightPath());
        };

        const getStyles = () => {
            let styles = {};
            if (!testNet) return { display: "none" };
            else if (from && from.type !== "APTOS") {
                styles = {
                    pointerEvents: "none",
                    opacity: "0.6",
                };
            }
            return styles;
        };

        const connectWallet = async (wallet) => {
            let connected;
            let signer;
            switch (wallet) {
                case "Martian":
                    connected = await connectMartian();
                    dispatch(setWalletsModal(false));
                    dispatch(setConnectedWallet("Martian"));
                    signer = window.martian;
                    break;
                case "Petra":
                    connected = await connectPetra();
                    dispatch(setWalletsModal(false));
                    dispatch(setConnectedWallet("Petra"));
                    signer = window.petra;
                    break;
                case "Pontem":
                    connected = await connectPontem();
                    dispatch(setWalletsModal(false));
                    dispatch(setConnectedWallet("Pontem"));
                    signer = window.pontem;
                    break;
                default:
                    break;
            }
            const chainWrapper = await bridge.getChain(Chain.APTOS);
            chainWrapper.setSigner(signer);
            dispatch(
                setSigner({
                    aptosClient: window.aptos,
                    address: connected.address,
                })
            );
            bridge.setCurrentType(chainWrapper);
            dispatch(setAccount(connected.address));
            dispatch(setWalletsModal(false));
            close();
            navigateToAccountRoute();
        };

        return (
            <OriginalComponent
                styles={getStyles}
                connectWallet={connectWallet}
            />
        );
    });
    return updatedComponent;
}
