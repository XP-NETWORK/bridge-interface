import React from "react";
import BeaconW from "../../assets/img/wallet/BeaconWhite.svg";
import Temple from "../../assets/img/wallet/Temple.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setFrom,
  setTempleWallet,
  setAccount,
  setError,
  setKukaiWallet,
} from "../../store/reducers/generalSlice";
import { setSigner } from "../../store/reducers/signersSlice";
import PropTypes from "prop-types";

import { withServices } from "../App/hocs/withServices";
import { Chain } from "xp.network";

import { TempleWallet } from "@temple-wallet/dapp";

import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

function TezosWallet({ wallet, close, serviceContainer }) {
  const { bridge } = serviceContainer;
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const testnet = useSelector((state) => state.general.testNet);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const query = window.location.search || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToAccountRoute = () => {
    navigate(testnet ? `/testnet/account${query}` : `/account${query}`);
  };

  const handleConnect = async (wallet) => {
    try {
      let connected;
      const chain = await bridge.getChain(from?.nonce || Chain.TEZOS);
      let account = {};

      switch (wallet) {
        case "TempleWallet": {
          const available = await TempleWallet.isAvailable();
          if (!available) {
            throw new Error("Temple Wallet not installed");
          }
          const wallet = new TempleWallet("XP.NETWORK Cross-Chain NFT Bridge");
          await wallet.connect("mainnet");
          const tezos = wallet.toTezos();
          const accountPkh = await tezos.wallet.pkh();
          account.signer = wallet;
          account.address = accountPkh;
          dispatch(setTempleWallet(true));
          break;
        }
        case "Beacon": {
          const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
          const wallet = new BeaconWallet({
            name: "XP.NETWORK Cross-Chain NFT Bridge",
          });
          Tezos.setWalletProvider(wallet);
          const permissions = await wallet.client.requestPermissions();
          account.signer = wallet;
          account.address = permissions.address;
          dispatch(setKukaiWallet(true));
          break;
        }
        default:
          break;
      }

      dispatch(setSigner(account.signer));
      dispatch(setAccount(account.address));
      chain.setSigner(account.signer);
      bridge.setCurrentType(chain);
      close();
      if (temporaryFrom) dispatch(setFrom(temporaryFrom));
      if (connected && to) navigateToAccountRoute();
    } catch (e) {
      dispatch(setError(e));
    }
  };

  const getStyle = () => {
    switch (wallet) {
      case "TempleWallet":
        if (window.innerWidth < 600) {
          return { display: "none" };
        } else if (temporaryFrom?.type === "Tezos") {
          return {};
        } else if (temporaryFrom && temporaryFrom?.type !== "Tezos") {
          return OFF;
        } else if (!from) {
          return {};
        } else if (from.text !== "Tezos") {
          return OFF;
        }
        break;
      case "Beacon":
        if (temporaryFrom?.type === "Tezos") {
          return {};
        } else if (!from) {
          return {};
        } else if (from.text !== "Tezos") return OFF;
        break;
      default:
        break;
    }
  };

  return wallet === "TempleWallet" ? (
    <li
      onClick={() => handleConnect("TempleWallet")}
      data-wallet="TempleWallet"
      style={getStyle()}
      className="wllListItem"
    >
      <img style={{ width: "28px" }} src={Temple} alt="Temple Icon" />{" "}
      <p>Temple Wallet</p>
    </li>
  ) : (
    <li
      style={getStyle()}
      data-wallet="Beacon"
      onClick={() => handleConnect("Beacon")}
      className="wllListItem beacon"
    >
      <img src={BeaconW} alt="Kukai Icon" />
      <p>Beacon</p>
    </li>
  );
}
TezosWallet.propTypes = {
  close: PropTypes.any,
  wallet: PropTypes.string,
  serviceContainer: PropTypes.object,
};

export default withServices(TezosWallet);
