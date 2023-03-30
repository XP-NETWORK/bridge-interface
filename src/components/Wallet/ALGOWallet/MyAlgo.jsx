import React from "react";
import HigherAlgorand from "./HigherAlgorand";
import PropTypes from "prop-types";
import MyAlgoBlue from "../../../assets/img/wallet/MyAlgoBlue.svg";

function MyAlgo({ styles, connectWallet }) {
    return (
        <li
            style={styles()}
            // style={{pointerEvents: "none", opacity: '0.6'}}
            onClick={() => connectWallet("MyAlgo")}
            className="wllListItem algo"
            data-wallet="MyAlgo"
        >
            <img src={MyAlgoBlue} alt="" />
            <p>MyAlgo</p>
        </li>
    );
}
MyAlgo.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherAlgorand(MyAlgo);
