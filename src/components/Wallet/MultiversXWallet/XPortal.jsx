import { React } from "react";
import Elrond from "../../../assets/img/chain/multiverseX.png";
import PropTypes from "prop-types";
import HigherMultiversX from "./HigherMultiversX";

function XPortal({ styles, connectWallet }) {
    return (
        <li
            style={styles()}
            onClick={() => connectWallet("xPortal")}
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
    connectWallet: PropTypes.func,
};

export default HigherMultiversX(XPortal);
