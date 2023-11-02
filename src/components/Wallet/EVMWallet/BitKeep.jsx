import React from "react";
import PropTypes from "prop-types";
import HigherEVM from "./HigherEVM";
import { useSelector } from "react-redux";
import icon from "../../../assets/img/wallet/bitget wallet_Transparent_circle 1.svg";
function BitKeep({ connectWallet }) {
    const from = useSelector((state) => state.general.from);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);

    const OFF = { opacity: 0.7, pointerEvents: "none" };
    const getStyle = () => {
        if (from) {
            if (from?.type !== "EVM" || isUnsupportedBitKeepChain()) {
                return OFF;
            }
        } else {
            return OFF;
        }
    };

    const isUnsupportedBitKeepChain = () => {
        const chain = from || temporaryFrom;
        return ["Godwoken", "SKALE", "ABEY"].includes(chain?.text);
    };

    return (
        <li
            style={getStyle()}
            onClick={() => connectWallet("BitKeep")}
            className="wllListItem"
            data-wallet="BitKeep"
        >
            <img src={icon} alt="BitKeep Icon" />
            <p>Bitget Wallet</p>
        </li>
    );
}
BitKeep.propTypes = {
    // styles: PropTypes.func,
    connectWallet: PropTypes.func,
};
export default HigherEVM(BitKeep);
