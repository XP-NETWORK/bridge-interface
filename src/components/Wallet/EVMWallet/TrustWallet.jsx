import React from "react";
import PropTypes from "prop-types";
import HigherEVM from "./HigherEVM";
import icon from "../../../assets/img/wallet/TWT.svg";

function TrustWallet({ styles, connectWallet }) {
    return (
        <li
            onClick={() => connectWallet("TrustWallet")}
            style={styles()}
            data-wallet="TrustWallet"
            className="wllListItem"
        >
            <img src={icon} alt="WalletConnect Icon" />
            <p>Trust Wallet</p>
        </li>
    );
}
TrustWallet.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherEVM(TrustWallet);
