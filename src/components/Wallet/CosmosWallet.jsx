import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import keplr from "../../assets/img/wallet/keplr.svg";
import fina from "../../assets/img/wallet/fina.svg";
import { connectKeplr } from "./ConnectWalletHelper";
import { chainsConfig } from "../values";
import { useCheckMobileScreen } from "../Settings/hooks";
import PropTypes from "prop-types";
import { getRightPath } from "../../wallet/helpers";

import { withServices } from "../App/hocs/withServices";

function CosmosWallet({ wallet, close, serviceContainer }) {

    const { bridge } = serviceContainer


    const OFF = { opacity: 0.6, pointerEvents: "none" };

    const from = useSelector((state) => state.general.from);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const testnet = useSelector((state) => state.general.testNet);
    const navigate = useNavigate();
    const isMobile = useCheckMobileScreen();

    const navigateToAccountRoute = () => {
        navigate(getRightPath());
    };

    const onClickHandler = async (wallet) => {
        const [signer, chainWrapper] = await Promise.all([connectKeplr(
            testnet,
            chainsConfig.Secret,
            wallet,
            isMobile
        ), bridge.getChain(from.nonce)])

        if (signer) {
            chainWrapper.setSigner(signer)
            navigateToAccountRoute()
        }
        close();
    };

    const getStyle = () => {
        if (temporaryFrom?.type === "Cosmos") {
            return {};
        } else if (temporaryFrom && temporaryFrom?.type !== "Cosmos") {
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
                    style={getStyle()}
                    onClick={onClickHandler}
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


export default withServices(CosmosWallet)