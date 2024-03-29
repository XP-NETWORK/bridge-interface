import React from "react";
import icon from "../../assets/img/wallet/unstoppable.svg";
import { connectUnstoppable } from "./ConnectWalletHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccount,
  setChangeWallet,
  setConnectedWallet,
  setWalletsModal,
  setAccountWalletModal,
  setUnstoppableDomains,
  setUnstoppableDomainsIsSelected
} from "../../store/reducers/generalSlice";
import PropTypes from "prop-types";
import { withServices } from "../App/hocs/withServices";
import { ethers } from "ethers";

function Unstoppables({ serviceContainer }) {
  const { bridge } = serviceContainer;
  const dispatch = useDispatch();
  let from = useSelector((state) => state.general.from);
  const OFF = { opacity: "0.7", pointerEvents: "none" };

  const disp = (()=>{
    dispatch(setWalletsModal(false))
    dispatch(setChangeWallet(false))
    dispatch(setAccountWalletModal(false))
  })

  const handleConnect = async () => {

    dispatch(setUnstoppableDomainsIsSelected(true))
    disp()
    dispatch(setWalletsModal(false));

    window.safeLocalStorage?.clear();
    const address = await connectUnstoppable(disp);
    if (address) {
      dispatch(setAccount(address));
      dispatch(setConnectedWallet("MetaMask"))
      dispatch(setUnstoppableDomains(true))
    }
    const nonce = bridge.getNonce(from?.chainId);
    const chainWrapper = await bridge.getChain(nonce);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(address);
    chainWrapper.setSigner(signer);
    bridge.setCurrentType(chainWrapper);
  };

  const getStyle = () => {
    if (from) {
      if (from?.type !== "EVM") {
        return OFF;
      }
    } else {
      return OFF;
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

Unstoppables.propTypes = {
  close: PropTypes.any,
  serviceContainer: PropTypes.object,
};

export default withServices(Unstoppables);
