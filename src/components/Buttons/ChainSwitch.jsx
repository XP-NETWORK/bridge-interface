import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChainModal,
  setDepartureOrDestination,
  setSwitchDestination,
} from "../../store/reducers/generalSlice";
import "./Buttons.css";

export default function ChainSwitch({ assignment, func }) {
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const walletconnect = useSelector((state) => state.general.WalletConnect);
  const OFF = { opacity: "0.6", pointerEvents: "none" };
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const tronAccount = useSelector((state) => state.general.tronWallet);
  const dispatch = useDispatch();
  const nonEVM =
    tezosAccount || tronAccount || algorandAccount || elrondAccount;

  function handleSwitchChain() {
    dispatch(setDepartureOrDestination("destination"));
    dispatch(setSwitchDestination(true));
  }

  const handleFromChainSwitch = () => {
    dispatch(setDepartureOrDestination("departure"));
    dispatch(setChainModal(true));
  };

  const show = () => {
    switch (assignment) {
      case "from":
        return (
          <span
            style={walletconnect || nonEVM ? OFF : {}}
            onClick={handleFromChainSwitch}
            className="chain-switch"
          >
            <img style={{ width: "30px" }} src={from.image.src} alt="" />{" "}
            {from.key === "xDai" ? "Gnosis" : from.key}
            <div className="arrow-down"></div>
          </span>
        );
      case "to":
        return (
          <span onClick={handleSwitchChain} className="chain-switch">
            <img style={{ width: "30px" }} src={to?.image?.src} alt="" />{" "}
            {to?.key === "xDai" ? "Gnosis" : to?.key}
            <div className="arrow-down"></div>
          </span>
        );
      default:
        break;
    }
  };
  return show();
}
