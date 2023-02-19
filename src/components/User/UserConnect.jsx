import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import {
    setAccount,
    setAccountModal,
    setFrom,
    setUnsupportedNetwork,
    setWalletsModal,
} from "../../store/reducers/generalSlice";
import { setSigner } from "../../store/reducers/signersSlice";
import { chains } from "../values";
import Identicon from "./Identicon";
import { setDepositWalletModal } from "../../store/reducers/discountSlice";
import PropTypes from "prop-types";

export default function UserConnect({ mobile }) {
    const dispatch = useDispatch();
    const to = useSelector((state) => state.general.to);
    const WCProvider = useSelector((state) => state.general.WCProvider);
    const account = useSelector((state) => state.general.account);
    console.log(
        "🚀 ~ file: UserConnect.jsx:24 ~ UserConnect ~ account",
        account
    );
    const innerWidth = useSelector((state) => state.general.innerWidth);
    const bitKeep = useSelector((state) => state.general.bitKeep);
    const WalletConnect = useSelector((state) => state.general.WalletConnect);
    const { chainId, active } = useWeb3React();
    const testnet = useSelector((state) => state.general.testNet);
    const location = useLocation();

    const handleConnect = () => {
        switch (location.pathname) {
            case "/discounts":
                if (!account) {
                    dispatch(setDepositWalletModal(true));
                } else if (account) dispatch(setAccountModal(true));
                break;
            default:
                if (!account) {
                    dispatch(setWalletsModal(true));
                } else if (account) dispatch(setAccountModal(true));
                break;
        }
    };

    const getAccountString = () => {
        if (innerWidth >= 425) {
            return `${account.substring(0, 5)}...${account.substring(
                account.length - 4
            )}`;
        } else if (innerWidth >= 375) {
            return `${account.substring(0, 4)}...${account.substring(
                account.length - 4
            )}`;
        } else if (innerWidth >= 320) {
            return `${account.substring(0, 3)}...${account.substring(
                account.length - 4
            )}`;
        }
    };

    const getChain = async (id) => {
        if (testnet) {
            return chains.find((chain) => chain.tnChainId === id);
        } else {
            return chains.find((chain) => chain.chainId === id);
        }
    };

    const handleChangeAccountOrChainId = async (hex) => {
        const hexToDecimal = (hex) => parseInt(hex, 16);
        const decimal = hexToDecimal(hex);
        const chainConnected = await getChain(decimal);

        switch (true) {
            case testnet:
                if (
                    !chainConnected?.testNet ||
                    !chains.some((chain) => chain.tnChainId === decimal)
                ) {
                    dispatch(setUnsupportedNetwork(true));
                } else if (decimal === to.tnChainId) {
                    dispatch(setUnsupportedNetwork(true));
                } else {
                    dispatch(setUnsupportedNetwork(false));
                    dispatch(setFrom(chainConnected));
                }
                break;
            default:
                if (
                    !chainConnected?.mainnet ||
                    !chains.some((chain) => chain?.chainId === decimal)
                ) {
                    dispatch(setUnsupportedNetwork(true));
                } else if (decimal === to.chainId) {
                    dispatch(setUnsupportedNetwork(true));
                } else {
                    dispatch(setUnsupportedNetwork(false));
                    dispatch(setFrom(chainConnected));
                }
                break;
        }
    };

    useEffect(() => {
        if (bitKeep && account) {
            window.bitkeep?.ethereum?.on("chainChanged", (chainId) => {
                handleChangeAccountOrChainId(chainId);
            });

            window.bitkeep?.ethereum?.on("accountsChanged", () => {
                handleChangeAccountOrChainId();
            });
        } else {
            if (account) {
                window.ethereum.on("chainChanged", (chainId) => {
                    handleChangeAccountOrChainId(chainId);
                });

                window.ethereum.on("accountsChanged", () => {
                    handleChangeAccountOrChainId();
                });
            }
        }
    }, []);

    useEffect(() => {
        if (account) {
            const provider = new ethers.providers.Web3Provider(
                WCProvider?.walletConnectProvider || window.ethereum
            );
            const signer = provider.getSigner(account);
            dispatch(setSigner(signer));
        }
    }, [chainId]);

    useEffect(() => {
        if (!account && WalletConnect) {
            active !== undefined && window.location.reload();
        }
        dispatch(setAccount(account));
    }, [active]);

    return (
        <div
            onClick={handleConnect}
            className={`${
                account ? "navbar-connect connected" : "navbar-connect"
            } ${mobile ? "xmobile_only" : "xdesktop_only"}`}
        >
            {account ? getAccountString() : "Connect Wallet"}
            {account && <Identicon account={account} />}
        </div>
    );
}
UserConnect.propTypes = {
    desktop: PropTypes.bool,
    mobile: PropTypes.bool,
};
