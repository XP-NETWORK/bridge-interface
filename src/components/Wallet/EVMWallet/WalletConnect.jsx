import React from "react";
import icon from "../../../assets/img/wallet/WalletConnect.svg";
import PropTypes from "prop-types";
import HigherEVM from "./HigherEVM";
import { useSelector } from "react-redux";

function WalletConnect({ styles, connectWallet }) {
    const from = useSelector((state) => state.general.from);
    return (
        <li
            style={from ? styles() : { display: "none" }}
            onClick={() => connectWallet("WalletConnect")}
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
