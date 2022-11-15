import React from "react";

import PropTypes from "prop-types";

import HigherTON from "./HigherTON";

import tonkeeper from "../../../assets/img/wallet/tonkeeper.svg";

import { useSelector } from "react-redux";

function TonKeeper({ styles, connectWallet }) {
  const isMobile = innerWidth <= 480;
  const tonKeeperSession = useSelector(
    (state) => state.tonStore.tonKeeperSession
  );

  const url = `tonkeeper://ton-login/support-bot-xp.herokuapp.com/tk?open=1&userId=${tonKeeperSession.userId}`;

  const connectHandler = () => {
    connectWallet("TonKeeper");
    isMobile && window.open(url, "_blank");
  };

  return (
    <li
      style={styles("TonKeeper")}
      onClick={connectHandler}
      className="wllListItem"
      data-wallet="Tonkeeper"
    >
      <img style={{ width: "28px" }} src={tonkeeper} alt="" />
      <p>Tonkeeper</p>
    </li>
  );
}
TonKeeper.propTypes = {
  styles: PropTypes.func,
  connectWallet: PropTypes.func,
};

export default HigherTON(TonKeeper);
