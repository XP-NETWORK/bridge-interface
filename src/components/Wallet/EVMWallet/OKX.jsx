import React from "react";
import icon from "../../../assets/img/wallet/OKX.svg";
import PropTypes from "prop-types";
import HigherEVM from "./HigherEVM";
function OKX({ styles, connectWallet }) {
    return (
        <li
            style={styles()}
            onClick={() => connectWallet("OKX")}
            className="wllListItem"
            data-wallet="OKX"
        >
            <img src={icon} alt="OKX Icon" />
            <p>OKX Wallet</p>
        </li>
    );
}
OKX.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherEVM(OKX);
