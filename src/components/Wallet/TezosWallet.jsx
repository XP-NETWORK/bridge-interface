import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectTempleWallet, connectBeacon } from "./ConnectWalletHelper";
import BeaconW from "../../assets/img/wallet/BeaconWhite.svg";
import Temple from "../../assets/img/wallet/Temple.svg";
import { chains } from "../../components/values";
import { setFrom } from "../../store/reducers/generalSlice";

export default function TezosWallet({ wallet, close }) {
  const OFF = { opacity: 0.6, pointerEvents: "none" };

  const handleConnect = async wallet => {
    let connected
    switch (wallet) {
      case "TempleWallet":
        connectTempleWallet()
        close()
        break;
      case "Beacon":
          await connectBeacon()
          close()
        break;
      default:
        break;
    }
  }

  return wallet === "TempleWallet" ? (
    <li
      onClick={() => handleConnect("TempleWallet")}
      data-wallet="TempleWallet"
      style={window.innerWidth > 600 ? {} : OFF}
      className="wllListItem"
    >
      <img style={{ width: "28px" }} src={Temple} alt="Temple Icon" /> Temple
      Wallet
    </li>
  ) : (
    <li
      data-wallet="Beacon"
      onClick={() => handleConnect("Beacon")}
      className="wllListItem beacon"
    >
      <img src={BeaconW} alt="Kukai Icon" /> Beacon
    </li>
  );
}
