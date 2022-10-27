import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { switchNetwork } from "../../../services/chains/evm/evmService";
import {
    setBitKeep,
    setFrom,
    setMetaMask,
} from "../../../store/reducers/generalSlice";
import { getRightPath } from "../../../wallet/helpers";
import {
    connectBitKeep,
    connectMetaMask,
    connectTrustWallet,
    onWalletConnect,
} from "../ConnectWalletHelper";

export default function HigherEVM(OriginalComponent) {
    const updatedComponent = () => {
        const { activate, chainId, deactivate } = useWeb3React();
        const OFF = { opacity: 0.6, pointerEvents: "none" };
        const from = useSelector((state) => state.general.from);
        const to = useSelector((state) => state.general.to);
        const temporaryFrom = useSelector(
            (state) => state.general.temporaryFrom
        );
        // const WCProvider = useSelector((state) => state.general.WCProvider);

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
            navigate(getRightPath());
        };

        const connectHandler = async (wallet) => {
            let connected;
            switch (wallet) {
                case "MetaMask":
                    connected = await connectMetaMask(
                        activate,
                        from?.text,
                        to?.text
                    );
                    if (connected) {
                        dispatch(setMetaMask(true));
                        if (temporaryFrom) dispatch(setFrom(temporaryFrom));
                        close();
                        if (to) {
                            if (
                                window.ethereum?.chainId ||
                                chainId !== `0x${from?.chainId.toString(16)}`
                            ) {
                                const switched = await switchNetwork(from);
                                if (switched) navigateToAccountRoute();
                            } else navigateToAccountRoute();
                        }
                    }
                    break;
                case "TrustWallet":
                    connected = await connectTrustWallet(activate, from.text);
                    close();
                    if (connected && to) navigateToAccountRoute();
                    if (temporaryFrom) dispatch(setFrom(temporaryFrom));
                    break;
                case "WalletConnect":
                    connected = await onWalletConnect(
                        activate,
                        from.text,
                        testnet
                    );
                    close();
                    if (connected && to) navigateToAccountRoute();
                    break;
                case "BitKeep":
                    deactivate();
                    connected = await connectBitKeep(from);
                    close();
                    dispatch(setBitKeep(true));
                    if (connected && to) {
                        navigateToAccountRoute();
                    }
                    break;
                default:
                    break;
            }
        };

        const getStyle = () => {
            // debugger;
            if (
                temporaryFrom?.type === "EVM" ||
                temporaryFrom?.type === "Skale"
            ) {
                if (from?.text === "Harmony") {
                    return OFF;
                } else return {};
            } else if (temporaryFrom && temporaryFrom?.type !== "EVM") {
                return OFF;
            } else if (!from) {
                return {};
            } else if (from && (from.type === "EVM" || from.type === "Skale")) {
                return {};
            } else if (
                ((from.type === "EVM" || from.type === "Skale") &&
                    getMobOps() &&
                    window.innerWidth <= 600) ||
                (window.ethereum &&
                    window.innerWidth <= 600 &&
                    (from.type === "EVM" || from.type === "Skale"))
            ) {
                return {};
            } else return OFF;
        };

        return (
            <OriginalComponent
                connectWallet={connectHandler}
                styles={getStyle}
            />
        );
    };
    return updatedComponent;
}
