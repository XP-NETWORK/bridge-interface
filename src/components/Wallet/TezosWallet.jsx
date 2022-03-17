import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connectTempleWallet, connectBeacon } from "./ConnectWalletHelper";
import BeaconW from "../../assets/img/wallet/BeaconWhite.svg";
import Temple from "../../assets/img/wallet/Temple.svg";
import { TempleWallet } from "@temple-wallet/dapp";

export default function TezosWallet({ wallet }) {
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const testnet = useSelector(state => state.general.testNet)
  const [ available, setAvailable ] = useState()


  const handleTempleConnect = () => {
      connectTempleWallet(testnet)
  }

  return wallet === "TempleWallet" ? (
    <li
      onClick={handleTempleConnect}
      data-wallet="TempleWallet"
      style={from?.text === "Tezos" && window.innerWidth > 600 ? {} : OFF}
      className="wllListItem"
    >
      <img style={{ width: "28px" }} src={Temple} alt="Temple Icon" /> Temple
      Wallet
    </li>
  ) : (
    <li
      data-wallet="Beacon"
      onClick={() => connectBeacon(testnet)}
      style={from?.text === "Tezos" ? {} : OFF}
      className="wllListItem beacon"
    >
      <img src={BeaconW} alt="Kukai Icon" /> Beacon
    </li>
  );
}
