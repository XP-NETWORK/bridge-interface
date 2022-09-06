import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  chains,
  CHAIN_INFO,
  TESTNET_CHAIN_INFO,
} from "../../components/values";
import {
  setChainModal,
  setDepartureOrDestination,
  setTo,
  setFrom,
  setChainSearch,
  setSwitchDestination,
  setValidatorsInf,
  setChangeWallet,
  setTemporaryFrom,
} from "../../store/reducers/generalSlice";
import Chain from "./Chain";
import ChainSearch from "../Chains/ChainSearch";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useLocation } from "react-router-dom";
import { switchNetwork } from "../../services/chains/evm/evmService";

export default function ChainListBox() {
  const dispatch = useDispatch();
  const location = useLocation();
  const departureOrDestination = useSelector(
    (state) => state.general.departureOrDestination
  );
  const chainSearch = useSelector((state) => state.general.chainSearch);
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const globalTestnet = useSelector((state) => state.general.testNet);
  const show = useSelector((state) => state.general.showChainModal);
  const switchChain = useSelector((state) => state.general.switchDestination);
  const [fromChains, setFromChains] = useState(chains);
  const [toChains, setToChains] = useState(chains);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const evmAccount = useSelector((state) => state.general.account);
  const tronAccount = useSelector((state) => state.general.tronWallet);
  const Sync2 = useSelector((state) => state.general.Sync2);
  const { account } = useWeb3React();
  const testnet = useSelector((state) => state.general.testNet);
  const validatorsInfo = useSelector((state) => state.general.validatorsInfo);
  const bitKeep = useSelector((state) => state.general.bitKeep);
  const axios = require("axios");
  const userAgent = navigator.userAgent;
  const isVeChainThor = userAgent.match(/vechainthorwallet|vechain|thor/);

  const checkValidators = async () => {
    let res;
    try {
      res = await axios.get("https://bridgestatus.herokuapp.com/status");
    } catch (error) {
      console.error(error);
    }
    if (res?.data) dispatch(setValidatorsInf(res.data));
  };

  const handleClose = () => {
    dispatch(setChainModal(false));
    dispatch(setDepartureOrDestination(""));
    dispatch(setSwitchDestination(false));
    dispatch(setChainSearch(""));
  };

  const typeOfChainConnected = () => {
    switch (true) {
      case evmAccount?.length > 0:
        return Sync2 ? "VeChain" : "EVM";
      case algorandAccount?.length > 0:
        return "Algorand";
      case tezosAccount?.length > 0:
        return "Tezos";
      case elrondAccount?.length > 0:
        return "Elrond";
      case tronAccount?.length > 0:
        return "Tron";
      default:
        return undefined;
    }
  };

  const chainSelectHandler = async (chain) => {
    if (departureOrDestination === "departure") {
      if (chain.type === typeOfChainConnected() || !typeOfChainConnected()) {
        if (to && to?.text === chain.text) {
          if (to?.text === "Harmony" && bitKeep) {
            dispatch(setTemporaryFrom(chain));
            dispatch(setChangeWallet(true));
            handleClose();
          } else if ((account || evmAccount) && from.text !== "VeChain") {
            const switched = await switchNetwork(from);
            if (switched) {
              dispatch(setTo(from));
              dispatch(setFrom(to));
            }
          }
        } else {
          if ((account || evmAccount) && chain.text !== "VeChain") {
            const switched = await switchNetwork(chain);

            if (switched) {
              dispatch(setFrom(chain));
            }
          } else dispatch(setFrom(chain));
        }
        handleClose();
      } else {
        dispatch(setTemporaryFrom(chain));
        dispatch(setChangeWallet(true));
        handleClose();
      }
    } else if (departureOrDestination === "destination") {
      if (from?.text === chain.text) {
        if (to?.text === "Harmony" && bitKeep) {
          dispatch(setTemporaryFrom(to));
          dispatch(setChangeWallet(true));
          handleClose();
        } else if (account || evmAccount) {
          const switched = await switchNetwork(to);
          if (switched) {
            dispatch(setTo(from));
            dispatch(setFrom(to));
          }
        }
      } else {
        dispatch(setTo(chain));
      }
      handleClose();
    }
  };

  useEffect(() => {
    // debugger
    let filteredChains = chains;
    const withNew = filteredChains
      .filter((chain) => chain.newChain)
      .sort((a, b) => a.order - b.order);
    const withComing = filteredChains
      .filter((chain) => chain.coming && !chain.newChain)
      .sort((a, b) => b.order - a.order);
    const withMaintenance = filteredChains.filter(
      (chain) => chain.maintenance && !chain.newChain
    );
    const noComingNoMaintenance = filteredChains
      .filter((chain) => !chain.coming && !chain.maintenance && !chain.newChain)
      .sort((a, b) => a.order - b.order);
    let sorted = [
      ...withNew,
      ...noComingNoMaintenance,
      ...withMaintenance,
      ...withComing,
    ];
    if (chainSearch && departureOrDestination === "departure") {
      sorted = chains.filter((chain) =>
        chain.text.toLowerCase().includes(chainSearch.toLowerCase())
      );
    }
    if (
      location.pathname === "connect" ||
      location.pathname === "/testnet/connect" ||
      location.pathname === "/"
    ) {
      setFromChains(sorted.filter((e) => e.text !== to?.text));
    } else setFromChains(sorted);
  }, [
    elrondAccount,
    tezosAccount,
    algorandAccount,
    tronAccount,
    evmAccount,
    chainSearch,
    to,
  ]);

  useEffect(async () => {
    if (!validatorsInfo) await checkValidators();
  }, [validatorsInfo]);

  useEffect(() => {
    // debugger
    let filteredChains = chains;
    const withNew = filteredChains
      .filter((chain) => chain.newChain)
      .sort((a, b) => a.order - b.order);
    const withComing = filteredChains
      .filter((chain) => chain.coming && !chain.newChain)
      .sort((a, b) => b.order - a.order);
    const withMaintenance = filteredChains.filter(
      (chain) => chain.maintenance && !chain.newChain
    );
    const noComingNoMaintenance = filteredChains
      .filter((chain) => !chain.coming && !chain.maintenance && !chain.newChain)
      .sort((a, b) => a.order - b.order);
    let sorted = [
      ...withNew,
      ...noComingNoMaintenance,
      ...withMaintenance,
      ...withComing,
    ];
    if (chainSearch && departureOrDestination === "destination") {
      sorted = chains.filter((chain) =>
        chain.text.toLowerCase().includes(chainSearch.toLowerCase())
      );
    }
    if (
      location.pathname === "connect" ||
      location.pathname === "/testnet/connect" ||
      location.pathname === "/"
    ) {
      setToChains(sorted.filter((e) => e.text !== from?.text));
    } else {
      setToChains(sorted);
    }
  }, [from, chainSearch, departureOrDestination]);

  useEffect(() => {
    if (
      from?.text === to?.text &&
      (!location.pathname === "/account" ||
        !location.pathname === "/testnet/account")
    ) {
      dispatch(setTo(""));
    }
  }, [to, from]);

  return (
    <Modal
      animation={false}
      show={show || switchChain}
      onHide={handleClose}
      className="ChainModal"
    >
      <Modal.Header className="text-left">
        <Modal.Title>{`Select ${
          departureOrDestination === "destination" ? "destination" : "departure"
        } chain`}</Modal.Title>
        <span className="CloseModal" onClick={handleClose}>
          <div className="close-modal"></div>
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="nftChainListBox">
          <ChainSearch />
          <ul className="nftChainList scrollSty">
            {//! Show only mainnet FROM chains //
            departureOrDestination === "departure" &&
              !globalTestnet &&
              fromChains.map((chain) => {
                const {
                  image,
                  text,
                  key,
                  coming,
                  newChain,
                  maintenance,
                  mainnet,
                  updated,
                } = chain;
                return (
                  (mainnet || coming) && (
                    <Chain
                      chainSelectHandler={chainSelectHandler}
                      updated={updated}
                      newChain={newChain}
                      maintenance={maintenance}
                      coming={coming}
                      text={text}
                      chainKey={key}
                      filteredChain={chain}
                      image={image}
                      key={`chain-${key}`}
                    />
                  )
                );
              })}
            {//! Show only mainnet TO chains //
            departureOrDestination === "destination" &&
              !globalTestnet &&
              toChains.map((chain) => {
                const {
                  image,
                  text,
                  key,
                  coming,
                  newChain,
                  maintenance,
                  mainnet,
                  updated,
                } = chain;
                return (
                  (mainnet || coming) && (
                    <Chain
                      chainSelectHandler={chainSelectHandler}
                      updated={updated}
                      newChain={newChain}
                      maintenance={maintenance}
                      coming={coming}
                      text={text}
                      chainKey={key}
                      filteredChain={chain}
                      image={image}
                      key={`chain-${key}`}
                    />
                  )
                );
              })}
            {//! Show only testnet FROM chains //
            departureOrDestination === "departure" &&
              globalTestnet &&
              fromChains.map((chain) => {
                const {
                  image,
                  text,
                  key,
                  coming,
                  newChain,
                  maintenance,
                  testNet,
                  updated,
                } = chain;
                return (
                  testNet && (
                    <Chain
                      chainSelectHandler={chainSelectHandler}
                      updated={updated}
                      newChain={newChain}
                      maintenance={maintenance}
                      coming={coming}
                      text={text}
                      chainKey={key}
                      filteredChain={chain}
                      image={image}
                      key={`chain-${key}`}
                    />
                  )
                );
              })}
            {//! Show only testnet TO chains //
            departureOrDestination === "destination" &&
              globalTestnet &&
              toChains.map((chain) => {
                const {
                  image,
                  text,
                  key,
                  coming,
                  newChain,
                  maintenance,
                  testNet,
                  updated,
                } = chain;
                return (
                  testNet && (
                    <Chain
                      chainSelectHandler={chainSelectHandler}
                      updated={updated}
                      newChain={newChain}
                      maintenance={maintenance}
                      coming={coming}
                      text={text}
                      chainKey={key}
                      filteredChain={chain}
                      image={image}
                      key={`chain-${key}`}
                    />
                  )
                );
              })}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}
