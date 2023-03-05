import React from "react";
import Elrond from "../../../assets/img/chain/multiverseX.png";
import PropTypes from "prop-types";
import HigherMultiversX from "./HigherMultiversX";

function XPortal({ styles, handleConnect }) {
    return (
        <li
            style={styles()}
            onClick={() => handleConnect("xPortal")}
            className="wllListItem"
            data-wallet="xPortal"
        >
            <img src={Elrond} alt="" />
            <p>xPortal</p>
        </li>
    );
}

XPortal.propTypes = {
    styles: PropTypes.func,
    handleConnect: PropTypes.func,
};

export default HigherMultiversX(XPortal);
