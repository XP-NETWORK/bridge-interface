import React from "react";
import PropTypes from "prop-types";
import icon from "../../../assets/img/wallet/pontem.svg";
import HigherAPTOS from "./HigherAPTOS";

function Pontem({ styles, connectWallet }) {
    return (
        <li
            style={styles()}
            onClick={() => connectWallet("Pontem")}
            className="wllListItem"
            data-wallet="Pontem"
        >
            <img src={icon} alt="Pontem Icon" />
            <p>Pontem</p>
        </li>
    );
}
Pontem.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherAPTOS(Pontem);
