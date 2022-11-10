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
            // eslint-disable-next-line no-debugger
            debugger;
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
            // eslint-disable-next-line no-debugger
            // debugger;
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
    };
    return updatedComponent;
}