import React from "react";

import PropTypes from "prop-types";

import icon from "../../../assets/img/wallet/phantom-icon-purple.svg";

import { withServices } from "../../App/hocs/withServices";

import { Chain } from "xp.network";

import { useDispatch } from "react-redux";
import { setError, setAccount } from "../../../store/reducers/generalSlice";

function Solana({ serviceContainer }) {
  const { bridge } = serviceContainer;

  const dispatch = useDispatch();

  const connectHandler = async (type) => {
    try {
      const chainWrapper = await bridge.getChain(Chain.SOLANA);

      console.log(chainWrapper, "chainWrapper");

      switch (type) {
        case "Phantom": {
          //check if phantom present
          const provider = window.phantom?.solana;
          if (!provider?.isPhantom) {
            window.open("https://phantom.app/", "_blank");
            return;
          }
          //connect
          const connection = await provider.connect();
          const address = connection.publicKey.toString();
          dispatch(setAccount(address));
          chainWrapper.setSigner(provider);
          bridge.setCurrentType(chainWrapper);
          break;
        }
      }
    } catch (e) {
      dispatch(setError(e));
    }
  };

  return (
    <li
      //style={styles("NearWallet")}
      onClick={() => connectHandler("Phantom")}
      className="wllListItem"
      data-wallet="Phantom"
    >
      <img style={{ width: "28px" }} src={icon} alt="phantomWallet" />
      <p>Phantom</p>
    </li>
  );
}

Solana.propTypes = {
  serviceContainer: PropTypes.object,
};

export default withServices(Solana);
