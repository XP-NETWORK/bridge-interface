import React from "react";
import PropTypes from "prop-types";
import icon from "../../../assets/img/wallet/petra.svg";
import HigherAPTOS from "./HigherAPTOS";

function Petra({ styles, connectWallet }) {
    return (
        <li
            style={styles()}
            onClick={() => connectWallet("Petra")}
            className="wllListItem"
            data-wallet="Petra"
        >
            <img src={icon} alt="Petra Icon" />
            <p>Petra</p>
        </li>
    );
}
Petra.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherAPTOS(Petra);
