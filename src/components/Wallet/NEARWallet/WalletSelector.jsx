import React from "react";

import PropTypes from "prop-types";

import near from "../../../assets/img/wallet/NearWallet.svg";

import { withServices } from "../../App/hocs/withServices";

//import /*useDispatch, useSelector*/ "react-redux";

function WalletSelector({ close }) {
  //const isMobile = innerWidth <= 480;
  //const dispatch = useDispatch();

  //const { from } = useSelector((state) => state.general);

  const connectHandler = async () => {
    close();
    window.wallet_selector_modal?.show();
  };

  /**
   *
   * return bridge teach label resource cruel filter benefit region host chronic mountain
   */

  return (
    <li
      //style={getStyles()}
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
