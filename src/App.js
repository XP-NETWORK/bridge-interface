import { useEffect, React } from "react";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alerts/Alert.jsx";
import DepositAlert from "./components/Alerts/DepositAlert";
import * as generalSlice from "./store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  checkValidators,
  fetchXPUpdate,
  getAndSetFactory,
  transformToDate,
} from "./wallet/helpers";
import { chains } from "./components/values";

import "./components/Modals/Modal.css";
import Modals from "./components/Modals/Modals";
import { useNavigate } from "react-router-dom";

import { BridgeModes } from "./components/values";

import Widget from "./components/Widget";
import { withConnect } from "./components/Widget/hocs/withConnect";

function App() {
  const dispatch = useDispatch();
  const factory = useSelector((state) => state.general.factory);
  const navigate = useNavigate();

  useEffect(() => {
    // debugger
    localStorage.removeItem("walletconnect");
    dispatch(generalSlice.setInnerWidth(window.innerWidth));
    const from = new URLSearchParams(window.location.search).get("from");
    const to = new URLSearchParams(window.location.search).get("to");
    if (from !== to) {
      if (from) {
        const fromChain = chains.filter(
          (n) => n.text === from.replace("/", "")
        )[0];
        if (fromChain) {
          dispatch(generalSlice.setFrom(fromChain));
        }
      }
      if (to) {
        const toChain = chains.filter((n) => n.text === to.replace("/", ""))[0];
        if (toChain) {
          dispatch(generalSlice.setTo(toChain));
        }
      }
    }
    fetchXPUpdate().then((data) => {
      const d = transformToDate(data);
      dispatch(generalSlice.setGitLatestCommit(d));
    });
    checkValidators().then((data) => {
      dispatch(generalSlice.setValidatorsInf(data));
    });
    const validatorsInt = setInterval(() => {
      checkValidators().then((data) => {
        dispatch(generalSlice.setValidatorsInf(data));
      });
    }, 10000);
    return () => clearInterval(validatorsInt);
  }, []);

  useEffect(() => {
    let network;
    if (window.location.pathname.includes(BridgeModes.Staging)) {
      network = BridgeModes.Staging;
      dispatch(generalSlice.setStaging(true));
    } else if (window.location.pathname.includes(BridgeModes.TestNet)) {
      network = BridgeModes.TestNet;
      dispatch(generalSlice.setTestNet(true));
    }
    const saveFactory = async () => {
      await getAndSetFactory(network);
    };
    if (!factory) saveFactory();
    const hardcoded = new URLSearchParams(window.location.search).get(
      BridgeModes.CheckWallet
    );

    const query = window.location.search;

    dispatch(generalSlice.setCheckWallet(hardcoded));
    navigate(`/${network ? network + "/" : ""}connect${query || ""}`);
  }, []);

  return (
    <div className={"App"}>
      <Modals />
      <XpBridge />
      <Alert />
      <Widget />
      <DepositAlert />
    </div>
  );
}

export default withConnect(App);
