import React from "react";

import PropTypes from "prop-types";

import near from "../../../assets/img/wallet/NearWallet.svg";

import { withServices } from "../../App/hocs/withServices";

import { Chain } from "xp.network";

function NearWallet({ serviceContainer }) {
  //const isMobile = innerWidth <= 480;

  const connectHandler = async () => {
    try {
      const chain = await serviceContainer?.bridge?.getChain(Chain.NEAR);
      const nearParams = serviceContainer?.bridge?.config?.nearParams;
      const nearWalletConnection = await chain?.connect();

      nearWalletConnection.requestSignIn(
        nearParams.bridge, // contract requesting access
        "XP.NETWORK Bridge", // optional title
        `${location.protocol}//${location.host}/testnet/connect?nearAuth=true`,
        `${location.protocol}//${location.host}/testnet/connect?nearFail=true`
      );
    } catch (e) {
      console.log(e, "e");
    }
  };

  return (
    <li
      //style={styles("NearWallet")}
      onClick={connectHandler}
      className="wllListItem"
      data-wallet="NearWallet"
    >
      <img style={{ width: "28px" }} src={near} alt="nearWallet" />
      <p>NearWallet</p>
    </li>
  );
}

NearWallet.propTypes = {
  styles: PropTypes.func,
  connectWallet: PropTypes.func,
  serviceContainer: PropTypes.object,
};

export default withServices(NearWallet);
