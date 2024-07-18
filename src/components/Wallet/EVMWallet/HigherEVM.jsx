import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    googleAnalyticsCategories,
    handleGA4Event,
} from "../../../services/GA4";
import {
    setConnectedWallet,
    setFrom,
    setMetaMask,
    setEVMProvider,
    setWalletsModal,
    setConnectedWalletType,
} from "../../../store/reducers/generalSlice";
import { getRightPath } from "../../../utils";
import { withServices } from "../../App/hocs/withServices";

import {
    connectMetaMask,
    connectTrustWallet,
    onWalletConnect,
} from "../ConnectWalletHelper";

export default function HigherEVM(OriginalComponent) {
    const updatedComponent = withServices((props) => {
        const {
            serviceContainer: { bridge },
        } = props;
        const { activate, chainId } = useWeb3React();
        const OFF = { opacity: 0.6, pointerEvents: "none" };
        const from = useSelector((state) => state.general.from);
        const to = useSelector((state) => state.general.to);
        const temporaryFrom = useSelector(
            (state) => state.general.temporaryFrom
        );

        const testnet = useSelector((state) => state.general.testNet);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const getMobOps = () =>
            /android/i.test(
                navigator.userAgent || navigator.vendor || window.opera
            )
                ? true
                : false;

        const navigateToAccountRoute = () => {
            navigate(getRightPath(bridge.network));
        };

        const connectHandler = async (wallet) => {
            let connected;
            switch (wallet) {
                case "MetaMask":
                    connected = await connectMetaMask(
                        activate,
                        from,
                        to,
                        chainId,
                        navigateToAccountRoute
                    );
                    if (connected) {
                        dispatch(setMetaMask(true));
                        dispatch(setConnectedWallet("MetaMask"));
                        dispatch(setConnectedWalletType("EVM"));
                        if (temporaryFrom) dispatch(setFrom(temporaryFrom));
                    }
                    break;
                case "Trust Wallet":
                    connected = await connectTrustWallet(
                        activate,
                        from?.key,
                        bridge.getChainIdByKey(from?.key, testnet)
                    );
                    dispatch(setWalletsModal(false));
                    if (connected && to) {
                        dispatch(setConnectedWallet("Trust Wallet"));
                        dispatch(setConnectedWalletType("EVM"));
                        navigateToAccountRoute();
                    }
                    if (temporaryFrom) dispatch(setFrom(temporaryFrom));
                    break;
                case "WalletConnect":
                    connected = await onWalletConnect(
                        activate,
                        from?.key,
                        testnet,
                        bridge.getChainIdByKey(from?.key, testnet)
                    );
                    dispatch(setWalletsModal(false));
                    if (connected && to) {
                        dispatch(setConnectedWallet("WalletConnect"));
                        dispatch(setConnectedWalletType("EVM"));
                        navigateToAccountRoute();
                    }
                    break;
                case "BitKeep":
                    dispatch(setEVMProvider(window.bitkeep?.ethereum));

                    break;
                default:
                    break;
            }
            handleGA4Event(
                googleAnalyticsCategories.Content,
                `Connecting to EVM wallet: ${wallet}`
            );
            dispatch(setWalletsModal(false));
        };

        const getStyle = () => {
            const evmDeparture = () => {
                if (from && from.type === "EVM") return true;
                else if (temporaryFrom && temporaryFrom.type === "EVM")
                    return true;
                else false;
            };
            switch (true) {
                case !from && !temporaryFrom:
                    return {};
                case from !== undefined || temporaryFrom !== undefined:
                    if (
                        evmDeparture() &&
                        getMobOps() &&
                        window.innerWidth <= 600
                    )
                        return {};
                    else if (
                        evmDeparture() &&
                        window.ethereum &&
                        window.innerWidth <= 600
                    )
                        return {};
                    else if (!evmDeparture()) return OFF;
                    else return {};
                default:
                    return OFF;
            }
        };

        return (
            <OriginalComponent
                connectWallet={connectHandler}
                styles={getStyle}
            />
        );
    });
    return updatedComponent;
}
