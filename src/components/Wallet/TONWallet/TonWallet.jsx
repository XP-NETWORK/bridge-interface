import React from "react";

import PropTypes from "prop-types";

import HigherTON from "./HigherTON";

import TON from "../../../assets/img/chain/ton.svg";

function TonWallet({ styles, connectWallet }) {
  const connectHandler = () => {
    connectWallet("TonWallet");
  };
  return (
    <li
      style={styles("TonWallet")}
      onClick={connectHandler}
      className="wllListItem"
      data-wallet="TonWallet"
    >
      <img style={{ width: "28px" }} src={TON} alt="" />
      <p>TON Wallet</p>
    </li>
  );
}
TonWallet.propTypes = {
  styles: PropTypes.func,
  connectWallet: PropTypes.func,
};

export default HigherTON(TonWallet);
