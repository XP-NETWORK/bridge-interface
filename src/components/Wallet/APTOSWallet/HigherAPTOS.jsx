/* eslint-disable no-debugger */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAccount,
  setConnectedWallet,
  setWalletsModal,
} from "../../../store/reducers/generalSlice";

import { getRightPath } from "../../../wallet/helpers";
import { withServices } from "../../App/hocs/withServices";
import { Chain } from "xp.network";

export default function HigherAPTOS(OriginalComponent) {
  const updatedComponent = withServices((props) => {
    const { serviceContainer, close } = props;
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { from, testNet, to } = useSelector((state) => state.general);

    const navigateToAccountRoute = () => {
      if (from && to) navigate(getRightPath());
    };

    const getStyles = () => {
      let styles = {};
      if (!testNet) return { display: "none" };
      else if (from && from.type !== "APTOS") {
        styles = {
          pointerEvents: "none",
          opacity: "0.6",
        };
      }
      return styles;
    };

    const connectWallet = async (wallet) => {
      let signer;
      let address;
      const chainWrapper = await bridge.getChain(Chain.APTOS);

      switch (wallet) {
        case "Martian":
          //signer = await connectMartian();
          //dispatch(setWalletsModal(false));
          //dispatch(setConnectedWallet("Martian"));
          // signer = connected;
          break;
        case "Petra": {
          const petra = window.petra;
          if (!petra) return window.open("https://petra.app/", "_blank");
          const account = await petra.connect();
          address = account.address;
          signer = petra;
          chainWrapper.chain.setPetraSigner(signer);
          dispatch(setWalletsModal(false));
          dispatch(setConnectedWallet("Petra"));

          break;
        }
        case "Pontem":
          //signer = await connectPontem();
          //dispatch(setWalletsModal(false));
          //dispatch(setConnectedWallet("Pontem"));
          // signer = connected;
          break;
        default:
          break;
      }

      chainWrapper.setSigner(signer);
      bridge.setCurrentType(chainWrapper);
      dispatch(setAccount(address));
      dispatch(setWalletsModal(false));
      close();
      navigateToAccountRoute();
    };

    return (
      <OriginalComponent styles={getStyles} connectWallet={connectWallet} />
    );
  });
  return updatedComponent;
}
