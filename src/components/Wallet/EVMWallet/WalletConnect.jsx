import React from "react";
import icon from "../../../assets/img/wallet/WalletConnect.svg";
import PropTypes from "prop-types";
import HigherEVM from "./HigherEVM";
import { useDispatch, useSelector } from "react-redux";

import {
    setAccountWalletModal,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";

import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from "@web3modal/ethereum";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import * as wagamiChains from "wagmi/chains";

import { chains as bridgeChains } from "../../values";
import { WalletConnectProvier } from "../../App/hocs/serviceProvider";

export const wcId = "d61f00671338b982a0b8a236682e2b1d";

export const WrapWithWalletConnect = (app) => {
    const chains = bridgeChains
        .filter(
            (chain) =>
                chain.type === "EVM" &&
                wagamiChains[chain.wagmi || chain.key.toLowerCase()]
        )
        .map((chain) => wagamiChains[chain.wagmi || chain.key.toLowerCase()]);

    const { publicClient } = configureChains(chains, [
        w3mProvider({ projectId: wcId }),
    ]);

    const wagmiConfig = createConfig({
        connectors: w3mConnectors({ chains, projectId: wcId }),
        publicClient,
    });

    const ethereumClient = new EthereumClient(wagmiConfig, chains);

    return (
        <WagmiConfig config={wagmiConfig}>
            <WalletConnectProvier value={{ chains, ethereumClient }}>
                {app}
            </WalletConnectProvier>
        </WagmiConfig>
    );
};

function WalletConnect({ styles }) {
    const dispatch = useDispatch();

    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const testnet = useSelector((state) => state.general.testNet);

    const handleClick = async () => {
        dispatch(setWalletsModal(false));
        dispatch(setAccountWalletModal(false));

        window.open(
            `/?wallet_connect_mode=true&from=${from.nonce}&to=${
                to.nonce
            }${window.location.search.replace("?", "&")}`,
            "_self"
        );
    };

    return (
        <li
            style={
                !testnet && from
                    ? styles()
                    : { pointerEvents: "none", opacity: "0.7" }
            }
            onClick={handleClick}
            className="wllListItem"
            data-wallet="WalletConnect"
        >
            <img src={icon} alt="WalletConnect Icon" />
            <p>WalletConnect</p>
        </li>
    );
}

WalletConnect.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherEVM(WalletConnect);
