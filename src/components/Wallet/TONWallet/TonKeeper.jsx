import React from "react";

import PropTypes from "prop-types";

import HigherTON from "./HigherTON";

import tonkeeper from "../../../assets/img/wallet/tonkeeper.svg";

function WalletButton({ styles, clickHandler }) {
  return (
    <li
      style={styles}
      onClick={clickHandler}
      className="wllListItem"
      data-wallet="Tonkeeper"
    >
      <img style={{ width: "28px" }} src={tonkeeper} alt="" />
      <p>Tonkeeper</p>
    </li>
  );
}

function TonKeeper({ styles, connectWallet }) {
  const connectHandler = () => {
    connectWallet("TonKeeper");
  };

  return (
    <WalletButton styles={styles("TonKeeper")} clickHandler={connectHandler} />
  );
}
TonKeeper.propTypes = {
  styles: PropTypes.func,
  connectWallet: PropTypes.func,
};

WalletButton.propTypes = {
  styles: PropTypes.any,
  clickHandler: PropTypes.func,
};

export default HigherTON(TonKeeper);
