import React from "react";
import { useSelector } from "react-redux";
import Elrond from "../../assets/img/wallet/Elrond.svg";
import Maiar from "../../assets/img/wallet/Maiar.svg";
import { connectMaiar, connectMaiarExtension } from "./ConnectWalletHelper";

export default function ElrondWallet({ wallet }) {
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);

  return wallet === "Maiar" ? (
    <li
      onClick={connectMaiar}
      // style={from ? (from?.type === "Elrond" ? {} : OFF) : ""}
      className="wllListItem"
      data-wallet="Maiar"
    >
      <img src={Maiar} alt="" /> Maiar
    </li>
  ) : (
    <li
      onClick={connectMaiarExtension}
      // style={from ? (from?.type === "Elrond" ? {} : OFF) : ""}
      className="wllListItem"
      data-wallet="Maiar Extension"
    >
      <img src={Elrond} alt="Elrond Icon" /> Maiar Extension
    </li>
  );
}
