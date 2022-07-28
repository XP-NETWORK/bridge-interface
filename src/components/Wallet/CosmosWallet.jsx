import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import keplr from "../../assets/img/wallet/keplr.svg";
import { connectKeplr } from "./ConnectWalletHelper";

import { chainsConfig } from "../values";

export default function CosmosWallet({ wallet, close }) {
  const OFF = { opacity: 0.6, pointerEvents: "none" };

  const from = useSelector((state) => state.general.from);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const testnet = useSelector((state) => state.general.testNet);
  const navigate = useNavigate();

  const navigateToAccountRoute = () => {
    navigate(testnet ? `/testnet/account` : `/account`);
  };

  const onClickHandler = async () => {
    const connected = await connectKeplr(testnet, chainsConfig.Secret);
    if (connected) navigateToAccountRoute();
    close();
  };

  const getStyle = () => {
    if (temporaryFrom?.type === "Cosmos") {
      return {};
    } else if (temporaryFrom && temporaryFrom?.type !== "Cosmos") {
      return OFF;
    } else if (!from) {
      return {};
    } else if (from && from.type === "Cosmos") {
      return {};
    } else return OFF;
  };

  return (
    <li
      style={getStyle()}
      onClick={onClickHandler}
      className="wllListItem keplr"
      data-wallet="Keplr"
    >
      <img src={keplr} alt="Keplr" />
      <p>Keplr</p>
    </li>
  );
}
