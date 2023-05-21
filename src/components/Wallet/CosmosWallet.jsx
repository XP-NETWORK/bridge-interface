import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import keplr from "../../assets/img/wallet/keplr.svg";
import fina from "../../assets/img/wallet/fina.svg";
//import { connectKeplr } from "./ConnectWalletHelper";
import { getChainObject } from "../values";
import { useCheckMobileScreen } from "../Settings/hooks";
import PropTypes from "prop-types";
import { getRightPath, promisify } from "../../utils";

import { withServices } from "../App/hocs/withServices";

import { Chain, MainNetRpcUri, TestNetRpcUri } from "xp.network";
import {
    setConnectedWallet,
    setAccount,
    setKeplrWallet,
    setRedirectModal,
    setError,
} from "../../store/reducers/generalSlice";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";

function CosmosWallet({ wallet, serviceContainer }) {
    const dispatch = useDispatch();

    const { bridge } = serviceContainer;
    const [lockedBtn, lockBtn] = useState(false);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    //const NONE = { display: "none" };

    const from = useSelector((state) => state.general.from);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const testnet = useSelector((state) => state.general.testNet);
    const navigate = useNavigate();
    const isMobile = useCheckMobileScreen();

    const navigateToAccountRoute = () => {
        const path = getRightPath();
        navigate(path);
    };

    const connectKeplr = async (testnet, chain, wallet, isMobile) => {
        const chainId = testnet ? chain.tnChainId : chain.chainId;
        const key = chain.key.toUpperCase();
        lockBtn(true);
        if (window.keplr) {
            console.log(window.keplr, "keplr");
            try {
                await window.keplr.enable(chainId);
                const offlineSigner = window.keplr.getOfflineSigner(chainId);

                const accounts = await offlineSigner.getAccounts();

                const { address } = accounts[0];

                const secretjs = await promisify(() => import("secretjs"));
                const signer = await secretjs.SecretNetworkClient.create({
                    grpcWebUrl: testnet
                        ? TestNetRpcUri[key]
                        : MainNetRpcUri[key],
                    chainId,
                    wallet: offlineSigner,
                    walletAddress: address,
                    //encryptionUtils: window.getEnigmaUtils(chain),
                });
                console.log(signer, "signer");
                dispatch(setAccount(address));
                dispatch(setKeplrWallet(signer));
                handleGA4Event(
                    googleAnalyticsCategories.Connect,
                    `Connected with: Keplr`
                );
                return signer;
            } catch (error) {
                console.error(error);
                return false;
            }
        } else {
            if (isMobile) {
                dispatch(setRedirectModal("Fina"));
            } else
                dispatch(
                    setError({
                        message: "Please install Keplr extension",
                    })
                );
            return false;
        }
    };

    const onClickHandler = async (wallet) => {
        lockBtn(true);
        const [signer, chainWrapper] = await Promise.all([
            connectKeplr(
                testnet,
                getChainObject(Chain.SECRET),
                wallet,
                isMobile
            ),
            bridge.getChain(Chain.SECRET),
        ]);
        lockBtn(false);
        if (signer) {
            chainWrapper.setSigner(signer);
            bridge.setCurrentType(chainWrapper);
            navigateToAccountRoute();
            dispatch(setConnectedWallet(wallet));
        }
        // close();
    };

    const getStyle = () => {
        //return NONE;
        if (temporaryFrom?.type === "Cosmos") {
            return {};
        } else if (
            (temporaryFrom && temporaryFrom?.type !== "Cosmos") ||
            lockedBtn
        ) {
            return OFF;
        } else if (!from) {
            return {};
        } else if (from && from.type === "Cosmos") {
            return {};
        } else return OFF;
    };

    switch (wallet) {
        case "Fina":
            return (
                <li
                    style={getStyle()}
                    onClick={() => onClickHandler("Fina")}
                    className="wllListItem keplr"
                    data-wallet="Keplr"
                >
                    <img src={fina} alt="Keplr" />
                    <p>Fina</p>
                </li>
            );

        default:
            return (
                <li
                    style={isMobile ? { display: "none" } : getStyle()}
                    onClick={() => onClickHandler("Keplr")}
                    className="wllListItem keplr"
                    data-wallet="Keplr"
                >
                    <img src={keplr} alt="Keplr" />
                    <p>Keplr</p>
                </li>
            );
    }
}
CosmosWallet.propTypes = {
    close: PropTypes.any,
    serviceContainer: PropTypes.object,
    wallet: PropTypes.string,
};

export default withServices(CosmosWallet);
