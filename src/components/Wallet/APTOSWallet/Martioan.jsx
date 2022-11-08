import React from "react";
import PropTypes from "prop-types";
import icon from "../../../assets/img/wallet/martian.svg";
import HigherAPTOS from "./HigherAPTOS";

function Martioan({ styles, connectWallet }) {
    return (
        <li
            style={styles()}
            onClick={() => connectWallet("Martian")}
            className="wllListItem"
            data-wallet="Martian"
        >
            <img src={icon} alt="Martian Icon" />
            <p>Martian</p>
        </li>
    );
}
Martioan.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherAPTOS(Martioan);
