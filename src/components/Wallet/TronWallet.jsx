import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tron from "../../assets/img/wallet/TronLink.svg";
import { useNavigate } from "react-router-dom";
import {
  setError,
  setFrom,
  setTronPopUp,
  setTronLoginError,
  setAccount,
  setTronLink,
} from "../../store/reducers/generalSlice";
import PropTypes from "prop-types";

import { withServices } from "../App/hocs/withServices";
import { Chain } from "xp.network";
import { useCheckMobileScreen } from "../Settings/hooks";
import { getChainObject } from "../../components/values";

//import { getChainObject } from "../../components/values";

function TronWallet({ close, serviceContainer }) {
  const { bridge } = serviceContainer;
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const testnet = useSelector((state) => state.general.testNet);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useCheckMobileScreen();

  const extensionProvider = window.tronWeb;
  const tronLink = window.tronLink;

  const connectHandler = async () => {
    console.log(isMobile);
    console.log(extensionProvider);
    console.log(tronLink);
    if (isMobile && !extensionProvider) {
      dispatch(setTronPopUp(true));
      return;
    }

    if (!tronLink) {
      dispatch(setTronLoginError("noTronWeb"));
      return;
    }

    try {
      let chainWrapper = await bridge.getChain(from?.nonce || Chain.TRON);

      const accounts = await tronLink.request({
        method: "tron_requestAccounts",
      });

      if (!accounts) {
        dispatch(setTronLoginError("loggedOut"));
      }
      const address = extensionProvider.defaultAddress.base58;

      if (address) {
        await chainWrapper.bridge
          .setProvider(Chain.TRON, extensionProvider)
          .catch((e) => console.log(e, "e"));

        chainWrapper = await bridge.getChain(Chain.TRON, {
          overwrite: true,
        });
        dispatch(setAccount(address));
        dispatch(setTronLink(true));
        chainWrapper.setSigner(extensionProvider);
        bridge.setCurrentType(chainWrapper);

        close();
        if (!from) dispatch(setFrom(getChainObject(Chain.TRON)));
        if (from && to) navigateToAccountRoute();
      }
    } catch (e) {
      dispatch(setError(e));
    }

    // const connected = await connectTronlink();
  };

  const navigateToAccountRoute = () => {
    navigate(testnet ? `/testnet/account` : `/account`);
  };

  const getStyle = () => {
    if (temporaryFrom?.type === "Tron") {
      return {};
    } else if (temporaryFrom && temporaryFrom?.type !== "Tron") {
      return OFF;
    } else if (from && from?.text !== "Tron") return OFF;
    else return {};
  };

  return (
    <li
      style={getStyle()}
      onClick={connectHandler}
      data-wallet="TronLink"
      className="wllListItem"
    >
      <img src={Tron} alt="Tron Icon" />
      <p>TronLink</p>
    </li>
  );
}
TronWallet.propTypes = {
  close: PropTypes.any,
  serviceContainer: PropTypes.object,
};
export default withServices(TronWallet);
