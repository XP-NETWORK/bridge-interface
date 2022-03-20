import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./Global.css";
import "./Responsive.css";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setGetFeaturedModal, setTestNet, setTo, setValidatorsInf } from "./store/reducers/generalSlice";
import ApproveLoader from "./components/innercomponents/ApproveLoader";
import Error from "./components/innercomponents/Error";
import TronPopUp from "./components/innercomponents/TronPopUp";
import { chains } from "./components/values";
import { setClaimablesAlgorand } from "./wallet/helpers";
import Widget from "./components/Widget";
import TechnicalSupport from "./components/innercomponents/TechnicalSupport";
import TransferLoader from "./components/innercomponents/TransferLoader";
import TronConnectionErrMod from "./components/TronConnectionErrMod";
import GetFeatured from "./components/innercomponents/GetFeatured";
import WSettings from "./components/Settings";
import Video from "./components/innercomponents/Video";
import About from "./components/innercomponents/About"

function App() {
  const dispatch = useDispatch();
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const state = useSelector((state) => state.general);
  const axios = require("axios");

  const checkValidators = async () => {
    let res;
    try {
      res = await axios.get("https://bridgestatus.herokuapp.com/status");
    } catch (error) {
      console.error(error);
    }
    if (res?.data) dispatch(setValidatorsInf(res.data));
  };

  useEffect(() => {
    dispatch(setTestNet(window.location.href.indexOf("/testnet") > 0));
  },[]);

  useEffect(async () => {
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
    localStorage.removeItem("walletconnect")
  }, []);

  useEffect(async () => {
    if (algorandAccount) {
      try {
        setClaimablesAlgorand(algorandAccount);
      } catch (err) {
        console.log(err, "algorand claimables error");
      }
    }
  }, [algorandAccount]);

  useEffect(async () => {
    if (!state.validatorsInfo) await checkValidators();
  }, [state.validatorsInfo]);

  return (
    <div className={"App"}>
      {state.wsettings && <WSettings />}
      <About />
      <Video />
      <TechnicalSupport />
      {/* <TnProcess /> */}
      {/* <SuccessModal /> */}
      <TransferLoader />
      <TronConnectionErrMod />
      <ApproveLoader />
      <Error />
      <TronPopUp />
      <Widget />
      <GetFeatured />
      <XpBridge />
      <Alert />
    </div>
  );
}

export default App;
