//import { useWeb3React } from "@web3-react/core";
import React /*{ useEffect }*/ from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
//import { ethers } from "ethers";
import {
    // setAccount,
    setAccountModal,
    //setFrom,
    // setUnsupportedNetwork,
    setWalletsModal,
} from "../../store/reducers/generalSlice";
//import { setSigner } from "../../store/reducers/signersSlice";
//import { chains } from "../values";
import Identicon from "./Identicon";
import { setDepositWalletModal } from "../../store/reducers/discountSlice";
import PropTypes from "prop-types";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";

export default function UserConnect({ mobile }) {
    const dispatch = useDispatch();
    ////const to = useSelector((state) => state.general.to);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const tezosAccount = useSelector((state) => state.general.tezosAccount);
    const algorandAccount = useSelector(
        (state) => state.general.algorandAccount
    );
    // const WCProvider = useSelector((state) => state.general.WCProvider);
    const _account = useSelector((state) => state.general.account);
    const innerWidth = useSelector((state) => state.general.innerWidth);
    const tronWallet = useSelector((state) => state.general.tronWallet);

    //const WalletConnect = useSelector((state) => state.general.WalletConnect);
    // const { account, chainId, active } = useWeb3React();
    const hederaAccount = useSelector((state) => state.general.hederaAccount);
    // const testnet = useSelector((state) => state.general.testNet);
    const secretAccount = useSelector((state) => state.general.secretAccount);
    const location = useLocation();
    const tonAccount = useSelector((state) => state.general.tonAccount);
    const aptosAccount = useSelector((state) => state.general.aptosAccount);

    let walletAccount =
        aptosAccount ||
        tonAccount ||
        hederaAccount ||
        secretAccount ||
        // account ||
        elrondAccount ||
        tezosAccount ||
        algorandAccount ||
        tronWallet ||
        _account;

    const handleConnect = () => {
        handleGA4Event(googleAnalyticsCategories.Button, "Connect");
        switch (location.pathname) {
            case "/discounts":
                if (!walletAccount) {
                    dispatch(setDepositWalletModal(true));
                } else if (walletAccount) dispatch(setAccountModal(true));
                break;
            default:
                if (!walletAccount) {
                    dispatch(setWalletsModal(true));
                } else if (walletAccount) dispatch(setAccountModal(true));
                break;
        }
    };

    const getAccountString = () => {
        if (innerWidth >= 425) {
            return `${walletAccount.substring(
                0,
                5
            )}...${walletAccount.substring(walletAccount.length - 4)}`;
        } else if (innerWidth >= 375) {
            return `${walletAccount.substring(
                0,
                4
            )}...${walletAccount.substring(walletAccount.length - 4)}`;
        } else if (innerWidth >= 320) {
            return `${walletAccount.substring(
                0,
                3
            )}...${walletAccount.substring(walletAccount.length - 4)}`;
        }
    };

    return (
        <div
            onClick={handleConnect}
            className={`${
                walletAccount ? "navbar-connect connected" : "navbar-connect"
            } ${mobile ? "xmobile_only" : "xdesktop_only"}`}
        >
            {walletAccount ? getAccountString() : "Connect Wallet"}
            {walletAccount && <Identicon account={walletAccount} />}
        </div>
    );
}
UserConnect.propTypes = {
    desktop: PropTypes.bool,
    mobile: PropTypes.bool,
};
