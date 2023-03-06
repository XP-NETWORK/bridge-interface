import React from "react";
import icon from "../../assets/img/wallet/unstoppable.svg";
import { connectUnstoppable } from "./ConnectWalletHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccount,
  setUnstoppableDomains,
  setWalletsModal,
} from "../../store/reducers/generalSlice";
import PropTypes from "prop-types";
import { withServices } from "../App/hocs/withServices";
import { ethers } from "ethers";

function Unscopables({ serviceContainer }) {
  const { bridge } = serviceContainer;
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const OFF = { opacity: 0.6, pointerEvents: "none" };

  const handleConnect = async () => {
    // close();
    dispatch(setWalletsModal(false));

    window.safeLocalStorage?.clear();
    const address = await connectUnstoppable();
    if (address) dispatch(setUnstoppableDomains(true));
    dispatch(setAccount(address));
    const nonce = bridge.getNonce(from.chainId);
    const chainWrapper = await bridge.getChain(nonce);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(address);
    chainWrapper.setSigner(signer);
    bridge.setCurrentType(chainWrapper);
  };

  const getStyle = () => {
    switch (true) {
      case from && from.type !== "EVM":
        return OFF;
      case temporaryFrom && temporaryFrom.type !== "EVM":
        return OFF;
      default:
        break;
    }
  };

  return (
    <li
      style={getStyle()}
      onClick={handleConnect}
      className="wllListItem"
      data-wallet="Unstoppable"
    >
      <img src={icon} alt="#" />
      <p>Unstoppable Domains</p>
    </li>
  );
}

Unscopables.propTypes = {
  close: PropTypes.any,
  serviceContainer: PropTypes.object,
};

export default withServices(Unscopables);
