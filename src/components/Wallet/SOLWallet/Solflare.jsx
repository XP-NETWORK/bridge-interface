import React from "react";
import PropTypes from "prop-types";
import icon from "../../../assets/img/wallet/Solflare.svg";

import HigherSolana from "./HigherSolana";

function Solflare({ connectWallet, styles }) {
    return (
        <li
            style={styles()}
            onClick={() => connectWallet("Solflare")}
            className="wllListItem"
            data-wallet="Solflare"
        >
            <img style={{ width: "28px" }} src={icon} alt="solflareWallet" />
            <p>Solflare</p>
        </li>
    );
}
Solflare.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
    close: PropTypes.func,
};
export default HigherSolana(Solflare);
