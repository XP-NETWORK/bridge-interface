import React from "react";
import PropTypes from "prop-types";
import HigherEVM from "./HigherEVM";

function TrustWallet({ styles, connectWallet }) {
    return (
        <li
            onClick={() => connectWallet("TrustWallet")}
            style={styles()}
            data-wallet="TrustWallet"
            className="wllListItem"
        >
            <img src={TrustWallet} alt="WalletConnect Icon" />
            <p>Trust Wallet</p>
        </li>
    );
}
TrustWallet.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherEVM(TrustWallet);
