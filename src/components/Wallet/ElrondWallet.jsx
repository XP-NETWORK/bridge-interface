import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Elrond from "../../assets/img/wallet/Elrond.svg";
import Maiar from "../../assets/img/wallet/Maiar.svg";
import { connectMaiar, connectMaiarExtension } from "./ConnectWalletHelper";
import { algoConnector } from "../../wallet/connectors";
import { setAlgorandAccount, setAlgorandWallet } from "../../store/reducers/generalSlice";

export default function ElrondWallet({ wallet, close }) {
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const dispatch = useDispatch()

  const handleConnect = wallet => {
    switch (wallet) {
      case "Maiar": 
        connectMaiar()
        close()
        break;
      case "Maiar Extension":
        connectMaiarExtension()
        close()
        break;
      default:
        break;
    }
  }

  useEffect(() => {
      algoConnector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      if (accounts) {
        dispatch(setAlgorandWallet(true));
        dispatch(setAlgorandAccount(accounts[0]));
      }
    });
  }, [])
  

  return wallet === "Maiar" ? (
    <li
      onClick={() => handleConnect("Maiar")}
      className="wllListItem"
      data-wallet="Maiar"
    >
      <img src={Maiar} alt="" /><p>Maiar</p>
    </li>
  ) : (
    <li
      onClick={() => handleConnect("Maiar Extension")}
      className="wllListItem"
      data-wallet="Maiar Extension"
    >
      <img src={Elrond} alt="Elrond Icon" /><p>Maiar Extension</p>
    </li>
  );
}
