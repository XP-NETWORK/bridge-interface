import React from "react";
import { useSelector } from "react-redux";
import { connectTronlink } from "./ConnectWalletHelper";
import Tron from "../../assets/img/wallet/TronLink.svg";

export default function TronWallet() {
  const from = useSelector((state) => state.general.from);
  const OFF = { opacity: 0.6, pointerEvents: "none" };

  return (
    <li
      onClick={connectTronlink}
      style={from ? (from.type === "Tron" ? {} : OFF) : ""}
      data-wallet="TronLink"
      className="wllListItem"
    >
      <img src={Tron} alt="Tron Icon" /> TronLink
    </li>
  );
}
