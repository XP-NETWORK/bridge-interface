import React from "react";
import PropTypes from "prop-types";
import icon from "../../../assets/img/wallet/phantom-icon-purple.svg";

import HigherSolana from "./HigherSolana";

function Phantom({ connectWallet }) {
    return (
        <li
            onClick={() => connectWallet("Phantom")}
            className="wllListItem"
            data-wallet="Phantom"
        >
            <img style={{ width: "28px" }} src={icon} alt="phantomWallet" />
            <p>Phantom</p>
        </li>
    );
}
Phantom.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherSolana(Phantom);
