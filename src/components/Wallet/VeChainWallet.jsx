import React, { useState } from "react";
import Sync2 from "../../assets/img/wallet/Sync2_.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccount,
  setConnectedWallet,
  setError,
  setFrom,
  setRedirectModal,
} from "../../store/reducers/generalSlice";
import { useNavigate } from "react-router-dom";
import thorIcon from "../../assets/img/wallet/Thor.svg";
import { useCheckMobileScreen } from "../Settings/hooks";
import PropTypes from "prop-types";

import { withServices } from "../App/hocs/withServices";
import { Chain, MainNetRpcUri, TestNetRpcUri } from "xp.network";

import Connex from "@vechain/connex";
import * as thor from "web3-providers-connex";
import { ethers } from "ethers";

import { getChainObject } from "../../components/values";

function VeChainWallet({ close, wallet, serviceContainer }) {
  const { bridge } = serviceContainer;
  const userAgent = navigator.userAgent;
  const isVeChainThor = userAgent.match(/vechainthorwallet|vechain|thor/);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const testnet = useSelector((state) => state.general.testNet);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const [connecting, setConnecting] = useState(false);

  const query = window.location.search || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useCheckMobileScreen();

  const connect = async (setConnecting) => {
    const account = {};
    const connex = new Connex({
      node: testnet ? TestNetRpcUri.VECHAIN : MainNetRpcUri.VECHAIN,
      network: testnet ? "test" : "main",
    });

    setConnecting(true);

    const connection = await connex.vendor
      .sign("cert", {
        purpose: "identification",
        payload: {
          type: "text",
          content: "Sign certificate to continue bridging",
        },
      })
      .link("https://connex.vecha.in/{certid}")
      .request();

    setConnecting(false);
    account.address = connection?.annex?.signer;

    const provider = thor.ethers.modifyProvider(
      new ethers.providers.Web3Provider(
        new thor.ConnexProvider({
          connex,
        })
      )
    );
    const signer = await provider.getSigner(account.address);
    account.signer = signer;
    return account;
  };

  const getStyle = () => {
    if (connecting) return OFF;
    if (temporaryFrom?.type === "VeChain") {
      return {};
    } else if (temporaryFrom && temporaryFrom?.type !== "VeChain") {
      return OFF;
    } else if (!from) {
      return {};
    } else if (from && from.type === "VeChain") {
      return {};
    } else return OFF;
  };

  const navigateToAccountRoute = () => {
    navigate(testnet ? `/testnet/account${query}` : `/account${query}`);
  };

  const handleConnect = async (w) => {
    try {
      const chainWrapper = await bridge.getChain(from?.nonce || Chain.VECHAIN);

      let account = {};

      switch (w) {
        case "VeChainThor": {
          if (isVeChainThor) {
            account = await connect(setConnecting);
          } else dispatch(setRedirectModal("VeChainThor"));

          break;
        }
        default: {
          account = await connect(setConnecting);
          break;
        }
      }

      dispatch(setAccount(account.address));
      dispatch(
        setConnectedWallet(w === "VeChainThor" ? "VeChainThor" : "Sync2")
      );
      chainWrapper.setSigner(account.signer);
      bridge.setCurrentType(chainWrapper);
      close();
      if (!from) dispatch(setFrom(getChainObject(Chain.VECHAIN)));
      if (temporaryFrom) dispatch(setFrom(temporaryFrom));
      if (to) navigateToAccountRoute();
    } catch (e) {
      console.log(e, "e");
      setConnecting(false);
      dispatch(setError(e));
    }
  };

  switch (wallet) {
    case "VeChainThor":
      return (
        <li
          style={isMobile ? getStyle() : OFF}
          className="wllListItem"
          data-wallet="VeChainThor"
          onClick={() => handleConnect("VeChainThor")}
        >
          <img style={{ width: "28px" }} src={thorIcon} alt="VeChainThor" />
          <p>VeChainThor</p>
        </li>
      );

    default:
      return (
        !isVeChainThor && (
          <li
            style={getStyle()}
            onClick={handleConnect}
            className="wllListItem"
            data-wallet="Sync2"
          >
            <img src={Sync2} alt="Sync2" />
            <p>Sync2</p>
          </li>
        )
      );
  }
}
VeChainWallet.propTypes = {
  close: PropTypes.any,
  wallet: PropTypes.string,
  serviceContainer: PropTypes.object,
};

export default withServices(VeChainWallet);
