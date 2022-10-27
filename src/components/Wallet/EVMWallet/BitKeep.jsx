import React from "react";
import PropTypes from "prop-types";

export default function BitKeep({ styles, connectWallet }) {
    const OFF = { opacity: 0.6, pointerEvents: "none" };

    const isUnsupportedBitKeepChain = () => {
        // const chain = from || temporaryFrom;
        // if (chain) {
        //     switch (from?.text) {
        //         case "Godwoken":
        //             return true;
        //         case "Harmony":
        //             return true;
        //         default:
        //             return false;
        //     }
        // }
    };

    return (
        <li
            style={isUnsupportedBitKeepChain() ? OFF : styles()}
            onClick={() => connectWallet("BitKeep")}
            className="wllListItem"
            data-wallet="MetaMask"
        >
            <img src={BitKeep} alt="BitKeep Icon" />
            <p>BitKeep</p>
        </li>
    );
}
BitKeep.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
