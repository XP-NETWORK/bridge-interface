import React from "react";
import PropTypes from "prop-types";
import HigherEVM from "./HigherEVM";
import { useSelector } from "react-redux";
import icon from "../../Settings/assets/img/wallets/BitKeep.svg";

function BitKeep({ styles, connectWallet }) {
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const isUnsupportedBitKeepChain = () => {
    const chain = from || temporaryFrom;

    if (chain) {
      switch (from?.text) {
        case "Godwoken":
          return true;
        case "Harmony":
          return true;
        default:
          return false;
      }
    }
  };

  return (
    <li
      style={isUnsupportedBitKeepChain() ? OFF : styles()}
      onClick={() => connectWallet("BitKeep")}
      className="wllListItem"
      data-wallet="MetaMask"
    >
      <img src={icon} alt="BitKeep Icon" />
      <p>BitKeep</p>
    </li>
  );
}
BitKeep.propTypes = {
  styles: PropTypes.func,
  connectWallet: PropTypes.func,
};
export default HigherEVM(BitKeep);
