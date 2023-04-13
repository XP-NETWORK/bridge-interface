import React from "react";
import PropTypes from "prop-types";
import HigherEVM from "./HigherEVM";
import icon from "../../../assets/img/wallet/TWT.svg";
import { useSelector } from "react-redux";

function TrustWallet({ connectWallet }) {
  let from = useSelector((state) => state.general.from);
  const OFF = { opacity: "0.7", pointerEvents: "none" };

  const getStyle = () => {
    if (from) {
      if (from?.type !== "EVM") {
        return OFF;
      }
    } else {
      return OFF;
    }
  };

  return (
    <li
      onClick={() => connectWallet("TrustWallet")}
      style={getStyle()}
      data-wallet="TrustWallet"
      className="wllListItem"
    >
      <img src={icon} alt="WalletConnect Icon" />
      <p>Trust Wallet</p>
    </li>
  );
}
TrustWallet.propTypes = {
  styles: PropTypes.func,
  connectWallet: PropTypes.func,
};
export default HigherEVM(TrustWallet);
