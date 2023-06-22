import React from "react";
import PropTypes from "prop-types";
import icon from "../../../assets/img/wallet/Solflare.svg";
//import { useSelector } from "react-redux";
import HigherSolana from "./HigherSolana";

function Solflare({ connectWallet }) {
    //const from = useSelector((state) => state.general.from);
    //const OFF = { opacity: 0.7, pointerEvents: "none" };
    const getStyle = () => {};
    return (
        <li
            style={getStyle()}
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
