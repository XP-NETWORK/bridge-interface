import React from "react";
import HigherAlgorand from "./HigherAlgorand";
import PropTypes from "prop-types";
import AlgoSignerIcon from "../../../assets/img/wallet/Algo Signer.png";

function AlgoSigner({ styles, connectWallet }) {
    return (
        <li
            style={styles()}
            // style={{pointerEvents: "none", opacity: '0.6'}}
            onClick={() => connectWallet("AlgoSigner")}
            data-wallet="AlgoSigner"
            className="wllListItem algo"
        >
            <img src={AlgoSignerIcon} alt="Algor Signer Icon" />
            <p>Algo Signer</p>
        </li>
    );
}

AlgoSigner.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};

export default HigherAlgorand(AlgoSigner);
