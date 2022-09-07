import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import {
    connectMetaMask,
    onWalletConnect,
    connectTrustWallet,
    connectBitKeep,
} from "./ConnectWalletHelper";
import { useDispatch, useSelector } from "react-redux";
import MetaMask from "../../assets/img/wallet/MetaMask.svg";
import WalletConnect from "../../assets/img/wallet/WalletConnect 3.svg";
import TrustWallet from "../../assets/img/wallet/TWT.svg";
import {
    setAccount,
    setBitKeep,
    setFrom,
    setMetaMask,
} from "../../store/reducers/generalSlice";
import { useLocation, useNavigate } from "react-router-dom";
import BitKeep from "../../assets/img/wallet/bitkeep.svg";
import { switchNetwork } from "../../services/chains/evm/evmService";
import { setSigner } from "../../store/reducers/signersSlice";
import { ethers } from "ethers";

export default function EVMWallet({ wallet, close, discount }) {
    const { account, activate, chainId, deactivate, library } = useWeb3React();
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const WCProvider = useSelector((state) => state.general.WCProvider);

    const testnet = useSelector((state) => state.general.testNet);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getMobOps = () =>
        /android/i.test(navigator.userAgent || navigator.vendor || window.opera)
            ? true
            : false;

    const navigateToAccountRoute = () => {
        navigate(testnet ? `/testnet/account` : `/account`);
    };

    const connectHandler = async (wallet) => {
        // debugger;
        const viaDiscount = location.pathname === "/discounts" ? true : false;
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
                    if (viaDiscount) {
                        await switchNetwork(from, viaDiscount);
                    }
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
                connected = await onWalletConnect(activate, from.text, testnet);
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
        if (temporaryFrom?.type === "EVM" || temporaryFrom?.type === "Skale") {
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

    const isUnsupportedBitKeepChain = () => {
        const chain = from || temporaryFrom;
        if (chain) {
            switch (from.text) {
                case "Godwoken":
                    return true;
                case "Harmony":
                    return true;
                default:
                    return false;
            }
        }
    };

    useEffect(() => {
        if (account) {
            const provider = new ethers.providers.Web3Provider(
                WCProvider?.walletConnectProvider || window.ethereum
            );
            const signer = provider.getSigner(account);
            dispatch(setSigner(signer));
            dispatch(setAccount(account));
        }
    }, [account]);

    switch (wallet) {
        case "MetaMask":
            return (
                <li
                    style={getStyle()}
                    onClick={() => connectHandler("MetaMask")}
                    className="wllListItem"
                    data-wallet="MetaMask"
                >
                    <img src={MetaMask} alt="MetaMask Icon" />
                    <p>MetaMask</p>
                </li>
            );
        case "TrustWallet":
            if (
                from &&
                from.type === "EVM" &&
                from.text !== "Velas" &&
                from.text !== "Iotex" &&
                from.text !== "Fuse"
            ) {
                return (
                    <li
                        onClick={() => connectHandler("TrustWallet")}
                        style={getStyle()}
                        data-wallet="TrustWallet"
                        className="wllListItem"
                    >
                        <img src={TrustWallet} alt="WalletConnect Icon" />
                        <p>Trust Wallet</p>
                    </li>
                );
            } else return <></>;
        case "WalletConnect":
            if (
                from &&
                from.type === "EVM" &&
                from.text !== "Velas" &&
                from.text !== "Iotex" &&
                from.text !== "Fuse"
            ) {
                return (
                    <li
                        style={getStyle()}
                        onClick={() => connectHandler("WalletConnect")}
                        className="wllListItem"
                        data-wallet="WalletConnect"
                    >
                        <img src={WalletConnect} alt="WalletConnect Icon" />
                        <p>WalletConnect</p>
                    </li>
                );
            } else return <></>;
        case "BitKeep":
            return (
                !discount && (
                    <li
                        style={isUnsupportedBitKeepChain() ? OFF : getStyle()}
                        onClick={() => connectHandler("BitKeep")}
                        className="wllListItem"
                        data-wallet="MetaMask"
                    >
                        <img src={BitKeep} alt="BitKeep Icon" />
                        <p>BitKeep</p>
                    </li>
                )
            );

        default:
            break;
    }
}
