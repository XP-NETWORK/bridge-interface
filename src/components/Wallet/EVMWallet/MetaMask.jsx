import React from "react";
import icon from "../../../assets/img/wallet/MetaMask.svg";
import PropTypes from "prop-types";
import HigherEVM from "./HigherEVM";
function MetaMask({ styles, connectWallet }) {
    return (
        <li
            style={styles()}
            onClick={() => connectWallet("MetaMask")}
            className="wllListItem"
            data-wallet="MetaMask"
        >
            <img src={icon} alt="MetaMask Icon" />
            <p>MetaMask</p>
        </li>
    );
}
MetaMask.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherEVM(MetaMask);
