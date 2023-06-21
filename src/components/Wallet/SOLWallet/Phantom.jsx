import React from "react";
import PropTypes from "prop-types";
import icon from "../../../assets/img/wallet/phantom-icon-purple.svg";
//import { useSelector } from "react-redux";
import HigherSolana from "./HigherSolana";

function Phantom({ connectWallet }) {
    //const from = useSelector((state) => state.general.from);
    //const OFF = { opacity: 0.7, pointerEvents: "none" };
    const getStyle = () => {};
    return (
        <li
            style={getStyle()}
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
    close: PropTypes.func,
};
export default HigherSolana(Phantom);
