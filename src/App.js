import { useEffect } from "react";
import XpBridge from "./pages/XpBridge";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setTestNet, setTo, setValidatorsInf, setInnerWidth, setGitLatestCommit } from "./store/reducers/generalSlice";
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
import "./components/Modals/Modal.css"
import Alert from "./components/Alerts/Alert.jsx"
import SuccessModal from "./components/Modals/Success/SuccessModal.jsx"

function App() {
  const dispatch = useDispatch();
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
  });

  useEffect(() => {
    // debugger
    dispatch(setInnerWidth(window.innerWidth))
    const algoToOpt = new URLSearchParams(window.location.search).get("to_opt-in");
    const nftToOptIn = new URLSearchParams(window.location.search).get("nft_uri");
    const testnet = new URLSearchParams(window.location.search).get("testnet");
    if(algoToOpt && nftToOptIn && testnet){
      console.log("🚀 ~ file: App.js ~ line 46 ~ useEffect ~ algoToOpt", testnet)
      console.log("🚀 ~ file: App.js ~ line 46 ~ useEffect ~ algoToOpt", nftToOptIn)
      console.log("🚀 ~ file: App.js ~ line 46 ~ useEffect ~ algoToOpt", algoToOpt)
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
    localStorage.removeItem("walletconnect")
    // debugger
    axios.get("https://xpvitaldata.herokuapp.com/last-commit")
    .then((response) => {
     const d = transformToDate(response.data)
     dispatch(setGitLatestCommit(d))
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }, []);

  // useEffect(() => {
  //   if (algorandAccount) {
  //     try {
  //       setClaimablesAlgorand(algorandAccount);
  //     } catch (err) {
  //       console.log(err, "Algorand claimables error");
  //     }
  //   }
  // }, [algorandAccount]);

  useEffect(async () => {
    if (!state.validatorsInfo) await checkValidators();
  }, [state.validatorsInfo]);


  
  return (
    <div className={"App"}>
      <About />
      <Video />
      <TechnicalSupport />
      <SuccessModal />
      <TransferLoader />
      <TronConnectionErrMod />
      <ApproveLoader />
      <Error />
      <TronPopUp />
      <XpBridge />
      <Alert />
    </div>
  );
}

export default App;
