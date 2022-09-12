import { useEffect, useState } from "react";
import XpBridge from "./pages/XpBridge";
import { useDispatch, useSelector } from "react-redux";
import {
  setFrom,
  setTestNet,
  setTo,
  setValidatorsInf,
  setInnerWidth,
  setGitLatestCommit,
  connectAlgorandWalletClaim,
} from "./store/reducers/generalSlice";
import ApproveLoader from "./components/innercomponents/ApproveLoader";
import Error from "./components/innercomponents/Error";
import TronPopUp from "./components/innercomponents/TronPopUp";
import { chains } from "./components/values";
import About from "./components/innercomponents/About";
import Video from "./components/innercomponents/Video";
import { transformToDate } from "./wallet/helpers";
import TechnicalSupport from "./components/innercomponents/TechnicalSupport";
import TransferLoader from "./components/innercomponents/TransferLoader";
import TronConnectionErrMod from "./components/Modals/TronModals/TronConnectionErrMod.jsx";
import "./components/Modals/Modal.css";
import Alert from "./components/Alerts/Alert.jsx";
import SuccessModal from "./components/Modals/Success/SuccessModal.jsx";
import ConnectAlgorand from "./components/ConnectAlgorand";
import { Modal } from "react-bootstrap";
import Widget from "./components/Widget";
import DepositAlert from "./components/Alerts/DepositAlert";
import RedirectModal from "./components/Modals/Redirect/RedirectModal";

import { ChainFabric } from "./services/chains";

function App() {
  const dispatch = useDispatch();
  const axios = require("axios");
  const [nftToOptIn, setNFTToOptIn] = useState();
  const [testnet, setTestnet] = useState();
  const txnHashArr = useSelector((state) => state.general.txnHashArr);

  useEffect(() => {
    dispatch(setTestNet(window.location.href.indexOf("/testnet") > 0));
  });

  const toShowSuccess = () => {
    return txnHashArr?.length ? true : false;
    return true;
  };

  useEffect(() => {
    // debugger
    dispatch(setInnerWidth(window.innerWidth));
    const algoToOpt = new URLSearchParams(window.location.search).get(
      "to_opt-in"
    );
    const nftToOptIn = new URLSearchParams(window.location.search).get(
      "nft_uri"
    );
    setNFTToOptIn(nftToOptIn);
    const test = new URLSearchParams(window.location.search).get("testnet");
    setTestnet(test);
    if (algoToOpt && nftToOptIn && test) {
      dispatch(connectAlgorandWalletClaim(true));
    }
    const from = new URLSearchParams(window.location.search).get("from");
    const to = new URLSearchParams(window.location.search).get("to");
    if (from !== to) {
      if (from) {
        const fromChain = chains.filter(
          (n) => n.text === from.replace("/", "")
        )[0];
        if (fromChain) {
          dispatch(setFrom(fromChain));
        }
      }
      if (to) {
        const toChain = chains.filter((n) => n.text === to.replace("/", ""))[0];
        if (toChain) {
          dispatch(setTo(toChain));
        }
      }
    }
    localStorage.removeItem("walletconnect");

    // debugger
    axios
      .get("https://xpvitaldata.herokuapp.com/last-commit")
      .then((response) => {
        const d = transformToDate(response.data);
        dispatch(setGitLatestCommit(d));
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className={"App"}>
      <ConnectAlgorand nftToOptIn={nftToOptIn} testnet={testnet} />
      <About />
      <Video />
      <TechnicalSupport />
      <Modal animation={null} className="success-modal" show={toShowSuccess()}>
        <SuccessModal />
      </Modal>
      <TransferLoader />
      <TronConnectionErrMod />
      {/* <BitKeepModal /> */}
      <RedirectModal />
      {/* <VeChainThorModal /> */}
      <ApproveLoader />
      <Error />
      <TronPopUp />
      <XpBridge />
      <Alert />
      <DepositAlert />
    </div>
  );
}

export default App;
