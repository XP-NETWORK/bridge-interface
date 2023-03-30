import React from "react";
import icon from "../../../assets/img/wallet/WalletConnect.svg";
import PropTypes from "prop-types";
import HigherEVM from "./HigherEVM";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Modal } from "@web3modal/react";

// import { useWeb3Modal } from "@web3modal/react";

import {
    setAccountWalletModal,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";
// import { wcSupportedChains } from "./evmConnectors";

function WalletConnect({ styles /*connectWallet*/ }) {
    const dispatch = useDispatch();
    const { open } = useWeb3Modal();
    // const from = useSelector((state) => state.general.from);
    const testnet = useSelector((state) => state.general.testNet);

    const handleClick = async () => {
        dispatch(setWalletsModal(false));
        dispatch(setAccountWalletModal(false));
        await open({ route: "SelectNetwork" });
    };

    // const isSupported = wcSupportedChains.find(
    //     (supported) =>
    //         from?.chainId === supported.id || from?.tnChainId === supported.id
    // );

    return (
        <li
            style={
                !testnet ? styles() : { pointerEvents: "none", opacity: "0.7" }
            }
            // onClick={() => connectWallet("WalletConnect")}
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
