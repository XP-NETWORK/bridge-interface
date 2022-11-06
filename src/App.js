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

import TonWeb from "tonweb";

function App() {
  const dispatch = useDispatch();
  const factory = useSelector((state) => state.general.factory);
  //const signer = useSelector((state) => state.signers.signer);

  useEffect(async () => {
    const ton = new TonWeb(
      new TonWeb.HttpProvider("https://toncenter.com/api/v2/jsonRPC", {
        apiKey:
          "05645d6b549f33bf80cee8822bd63df720c6781bd00020646deb7b2b2cd53b73",
      })
    );

    const trxs = await ton.provider.getTransactions(
      "EQCllgpGmqhhjcrfLoQ7ozsKufa2KFeU3it3f8hn9tG_pDgz",
      20
    );

    console.log(trxs);
  }, []);

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
    if (window.location.href.includes("/staging")) {
      network = "staging";
      dispatch(generalSlice.setStaging(true));
    } else if (window.location.href.includes("/testnet")) {
      network = "testnet";
      dispatch(generalSlice.setTestNet(true));
    }
    const saveFactory = async () => {
      await getAndSetFactory(network);
    };
    if (!factory) saveFactory();
    const hardcoded = new URLSearchParams(window.location.search).get(
      "checkWallet"
    );
    dispatch(generalSlice.setCheckWallet(hardcoded));
  }, []);

  return (
    <div className={"App"}>
      <Modals />
      <XpBridge />
      <Alert />
      <DepositAlert />
    </div>
  );
}

export default App;
