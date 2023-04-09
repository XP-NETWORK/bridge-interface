/* eslint-disable no-debugger */
import React, { useState } from "react";
import hashpack from "../../../assets/img/wallet/hashpack.svg";
import { HashConnect } from "hashconnect";
// import { Chain } from "xp.network";

import HigherHEDERA from "./HigherHEDERA";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { biz } from "../../values";

// import { useDispatch, useSelector } from "react-redux";
// import {
//     setAccount,
//     setConnectedWallet,
//     setWalletsModal,
// } from "../../../store/reducers/generalSlice";

function Hashpack({ connect }) {
  const [loading, setLoading] = useState(false);

  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
  const from = useSelector((state) => state.general.from);
  let hashConnect = new HashConnect(true);
  // let provider;
  // let signer;
  // const testnet = useSelector((state) => state.general.testNet);

  // const setSigner = async (signer) => {
  //     debugger;
  //     try {
  //         console.log(Chain.HEDERA);
  //         const chainWrapper = await getChain();
  //         chainWrapper.setSigner(signer);
  //         dispatch(setWalletsModal(false));
  //         dispatch(setConnectedWallet("HashPack"));
  //         // connected();
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };
  // const getChain = async () => {
  //     let chain;
  //     try {
  //         chain = await bridge.getChain(Chain.HEDERA);
  //     } catch (error) {
  //         console.log(error);
  //     }
  //     return chain;
  // };

  // useEffect(async () => {
  //     // getChain.then((chain) => (chainWrapper = chain));
  //     hashConnect.pairingEvent.once((pairingData) => {
  //         debugger;
  //         console.log("pairingEvent", { pairingData });
  //         const network = testnet ? "testnet" : "mainnet";
  //         const topic = pairingData.topic;
  //         const accountId = pairingData.accountIds[0];
  //         dispatch(setAccount(accountId));
  //         try {
  //             provider = hashConnect.getProvider(network, topic, accountId);
  //             signer = hashConnect.getSigner(provider);
  //             setSigner(signer);
  //             dispatch(setWalletsModal(false));
  //             dispatch(setConnectedWallet("HashPack"));
  //         } catch (error) {
  //             console.log("pairingEvent error", error);
  //         }
  //     });
  //     hashConnect.acknowledgeMessageEvent.once((acknowledgeData) => {
  //         console.log("acknowledgeMessageEvent", { acknowledgeData });
  //     });
  //     hashConnect.connectionStatusChangeEvent.once((connectionStatus) => {
  //         console.log("connectionStatusChangeEvent", { connectionStatus });
  //     });
  // }, []);
  const getStyle = () => {
    if (!biz) {
      return { display: "none" };
    }
    if (temporaryFrom?.type === "Hedera") {
      return {};
    } else if (temporaryFrom && temporaryFrom?.type !== "Hedera") {
      return OFF;
    } else if (from && from?.text !== "Hedera") return OFF;
    else if (loading) return OFF;
    else return {};
  };
  return (
    <li
      onClick={() => {
        setLoading(true);
        connect("HashPack", hashConnect);
        setTimeout(() => setLoading(false), 2000);
      }}
      className="wllListItem"
      style={getStyle()}
      data-wallet="Hashpack"
    >
      <img style={{ width: "28px" }} src={hashpack} alt="Hashpack Icon" />
      <p>Hashpack</p>
    </li>
  );
}

Hashpack.propTypes = {
  getStyles: PropTypes.func,
  connect: PropTypes.func,
  bridge: PropTypes.object,
  connected: PropTypes.func,
};

export default HigherHEDERA(Hashpack);
