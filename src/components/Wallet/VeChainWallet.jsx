import React from "react";
import Sync2 from "../../assets/img/wallet/Sync2_.svg";
import { useDispatch, useSelector } from "react-redux";
import { connectVeChainThor } from "./ConnectWalletHelper";
import {
  setAccount,
  setError,
  setFrom,
  setSync2,
  setSync2Connex,
} from "../../store/reducers/generalSlice";
import { useNavigate } from "react-router-dom";
import thorIcon from "../../assets/img/wallet/Thor.svg";
import { useCheckMobileScreen } from "../Settings/hooks";
import PropTypes from "prop-types";

import { withServices } from "../App/hocs/withServices";
import { Chain } from "xp.network";

import Connex from "@vechain/connex";
import * as thor from "web3-providers-connex";
import { ethers } from "ethers";

function VeChainWallet({ close, wallet, serviceContainer }) {
  const { bridge } = serviceContainer;
  const userAgent = navigator.userAgent;
  const isVeChainThor = userAgent.match(/vechainthorwallet|vechain|thor/);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const testnet = useSelector((state) => state.general.testNet);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);

  const query = window.location.search || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useCheckMobileScreen();

  const getStyle = () => {
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
        case "VeChainThor":
          account = await connectVeChainThor(testnet);
          dispatch(setSync2(account));
          close();
          if (temporaryFrom) dispatch(setFrom(temporaryFrom));
          if (to) navigateToAccountRoute();
          break;
        default: {
          const client = new Connex(
            testnet
              ? {
                  node: "https://testnet.veblocks.net/",
                  network: "test",
                }
              : {
                  node: "https://sync-mainnet.veblocks.net",
                  network: "main",
                }
          );
          dispatch(setSync2Connex(client));
          const connex = new Connex(testnet ? "test" : "main");
          const connection = await connex.vendor
            .sign("cert", {
              purpose: "identification",
              payload: {
                type: "text",
                content: "sign certificate to continue bridging",
              },
            })
            .link("https://connex.vecha.in/{certid}")
            .request();
          //account.signer = result?.annex?.signer;
          account.address = connection?.annex?.signer;

          const provider = thor.ethers.modifyProvider(
            new ethers.providers.Web3Provider(
              new thor.ConnexProvider({
                connex: new Connex({
                  node: testnet
                    ? "https://testnet.veblocks.net/"
                    : "https://sync-mainnet.veblocks.net",
                  network: testnet ? "test" : "main",
                }),
              })
            )
          );
          account.signer = await provider.getSigner(account.address);

          //dispatch(setSync2(account));

          break;
        }
      }

      dispatch(setAccount(account.address));
      chainWrapper.setSigner(account.signer);
      close();
      if (temporaryFrom) dispatch(setFrom(temporaryFrom));
      if (to) navigateToAccountRoute();
    } catch (e) {
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
