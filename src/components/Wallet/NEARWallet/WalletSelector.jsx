import React from "react";

import PropTypes from "prop-types";

import near from "../../../assets/img/wallet/NearWallet.svg";

import { withServices } from "../../App/hocs/withServices";

import { useSelector } from "react-redux";

//import /*useDispatch, useSelector*/ "react-redux";

function WalletSelector({ close }) {
  //const isMobile = innerWidth <= 480;
  //const dispatch = useDispatch();

  //const { from } = useSelector((state) => state.general);

  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const from = useSelector((state) => state.general.from);

  const connectHandler = async () => {
    close();
    window.wallet_selector_modal?.show();
  };


  /**
   *
   * return bridge teach label resource cruel filter benefit region host chronic mountain
   */

  const getStyle = () => {
    if (temporaryFrom?.type === "NEAR") {
        return {};
    } else if (temporaryFrom && temporaryFrom?.type !== "NEAR") {
        return OFF;
    } else if (from && from?.text !== "NEAR") return OFF;
    else return {};
};

  return (
    <li
      style={getStyle()}
      onClick={connectHandler}
      className="wllListItem"
      data-wallet="WalletSelector"
    >
      <img style={{ width: "28px" }} src={near} alt="nearWallet" />
      <p>Wallet Selector</p>
    </li>
  );
}

WalletSelector.propTypes = {
  styles: PropTypes.func,
  connectWallet: PropTypes.func,
  serviceContainer: PropTypes.object,
  close: PropTypes.func,
};

export default withServices(WalletSelector);
