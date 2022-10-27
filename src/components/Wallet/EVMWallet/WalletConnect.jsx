import React from "react";
import icon from "../../../assets/img/wallet/WalletConnect.svg";
import PropTypes from "prop-types";

export default function WalletConnect({ styles, connectWallet }) {
    return (
        <li
            style={styles()}
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
