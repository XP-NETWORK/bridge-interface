import React, { useEffect } from "react";
import icon from "../../assets/img/wallet/unstoppable.svg";
import { connectUnstoppable } from "./ConnectWalletHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccount,
  setChangeWallet,
  // setChangeWallet,
  setConnectedWallet,
  setUnstoppableDomains,
  setWalletsModal
} from "../../store/reducers/generalSlice";
import PropTypes from "prop-types";
import { withServices } from "../App/hocs/withServices";
import { ethers } from "ethers";

function Unstoppables({ serviceContainer }) {
  const { bridge } = serviceContainer;
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  let unstoppableDomains = useSelector((state) => state.general.unstoppableDomains);
  let connectedWallet = useSelector((state) => state.general.connectedWallet);
  const OFF = { opacity: 0.6, pointerEvents: "none" };

  

  const disp = (()=>{
    console.log('closer')
    dispatch(setWalletsModal(false))
    dispatch(setChangeWallet(false))
  })

  useEffect(()=>{
    if(unstoppableDomains){
      disp()
    }
  },[unstoppableDomains, connectedWallet])

  useEffect(()=>{
    setUnstoppableDomains(false)
  },[from, connectedWallet])

  const handleConnect = async () => {
    // close();
    dispatch(setWalletsModal(false));

    

    window.safeLocalStorage?.clear();
    const address = await connectUnstoppable(disp);
    console.log('address: ',address)
    if (address) {
      dispatch(setUnstoppableDomains(true))
      dispatch(setAccount(address));
      dispatch(setConnectedWallet("MetaMask"))
    }
    const nonce = bridge.getNonce(from?.chainId);
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

Unstoppables.propTypes = {
  close: PropTypes.any,
  serviceContainer: PropTypes.object,
};

export default withServices(Unstoppables);
