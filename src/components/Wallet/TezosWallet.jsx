import React from "react";
import { useSelector } from "react-redux";
import { connectTempleWallet, connectBeacon } from "../ConnectWalletHelper";
import BeaconW from "../../assets/img/wallet/BeaconWhite.svg";
import Temple from "../../assets/img/wallet/Temple.svg";

export default function TezosWallet({ wallet }) {
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  return wallet === "TempleWallet" ? (
    <li
      onClick={connectTempleWallet}
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
      onClick={connectBeacon}
      style={from?.text === "Tezos" ? {} : OFF}
      className="wllListItem beacon"
    >
      <img src={BeaconW} alt="Kukai Icon" /> Beacon
    </li>
  );
}
