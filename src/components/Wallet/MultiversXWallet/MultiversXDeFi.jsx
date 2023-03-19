/* eslint-disable no-debugger */
import React from "react";
import Elrond from "../../../assets/img/chain/multiverseX.png";
import PropTypes from "prop-types";
import HigherMultiversX from "./HigherMultiversX";

function MultiversXDeFi({ connectWallet, styles }) {
  return (
    <li
      style={styles()}
      onClick={() => connectWallet("MultiversXDeFi")}
      className="wllListItem"
      data-wallet="MultiversX DeFi Wallet"
    >
      <img src={Elrond} alt="Elrond Icon" />
      <p>MultiversX DeFi Wallet</p>
    </li>
  );
}

MultiversXDeFi.propTypes = {
  styles: PropTypes.func,
  connectWallet: PropTypes.func,
};

export default HigherMultiversX(MultiversXDeFi);
