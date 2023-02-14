/* eslint-disable react/prop-types */
import { useEffect, React } from "react";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alerts/Alert.jsx";
import DepositAlert from "./components/Alerts/DepositAlert";
import * as generalSlice from "./store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  checkValidators,
  fetchXPUpdate,
  transformToDate,
} from "./wallet/helpers";
import {
  setChainModal,
  setImportModal,
  setError,
  setGetFeaturedModal,
  setRedirectModal,
  setApproveLoader,
  setChangeWallet,
  setAccountModal,
  setWalletsModal,
  setAccountWalletModal,
  setTransferLoaderModal,
  setSwitchDestination,
} from "./store/reducers/generalSlice";
//  import { setQRCodeModal } from "../../Wallet/TONWallet/tonStore";
import { chains } from "./components/values";

import "./components/Modals/Modal.css";
import Modals from "./components/Modals/Modals";

import AppContainer from "./components/App/container";

import Widget from "./components/Widget";
import { withConnect } from "./components/Widget/hocs/withConnect";

function App({ network }) {
  let dispatch = useDispatch();
  let showChainModal = useSelector((state) => state.general.showChainModal);
  let importModal = useSelector((state) => state.general.importModal);
  let error = useSelector((state) => state.general.error);
  let featuredModal = useSelector((state) => state.general.featuredModal);
  let redirectModal = useSelector((state) => state.general.redirectModal);
  let approveLoader = useSelector((state) => state.general.approveLoader);
  let changeWallet = useSelector((state) => state.general.changeWallet);
  let accountModal = useSelector((state) => state.general.accountModal);
  let walletsModal = useSelector((state) => state.general.walletsModal);
  let accountWalletModal = useSelector(
    (state) => state.general.accountWalletModal
  );
  let transferModalLoader = useSelector(
    (state) => state.general.transferModalLoader
  );
  let switchDestination = useSelector(
    (state) => state.general.switchDestination
  );
  // let showChainModal = useSelector((state) => state.general.showChainModal);

  let modalArray = [
    showChainModal,
    importModal,
    featuredModal,
    error,
    redirectModal,
    approveLoader,
    changeWallet,
    accountModal,
    walletsModal,
    accountWalletModal,
    transferModalLoader,
    switchDestination,
  ];

  let location = useLocation();

  useEffect(() => {
    // console.log('array: ',modalArray)
    if (modalArray.indexOf(true) !== -1) {
      dispatch(setChainModal(false));
      dispatch(setImportModal(false));
      dispatch(setError(false));
      dispatch(setGetFeaturedModal(false));
      dispatch(setRedirectModal(false));
      dispatch(setApproveLoader(false));
      dispatch(setChangeWallet(false));
      dispatch(setAccountModal(false));
      dispatch(setWalletsModal(false));
      dispatch(setAccountWalletModal(false));
      dispatch(setTransferLoaderModal(false));
      dispatch(setSwitchDestination(false));
    }
  }, [location]);

  useEffect(() => {
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

    /*const tweb = new TonWeb(
      new TonWeb.HttpProvider("https://toncenter.com/api/v2/jsonRPC", {
        apiKey:
          "05645d6b549f33bf80cee8822bd63df720c6781bd00020646deb7b2b2cd53b73",
      })
    )
console.log(
     tweb.provider.getTransactions('EQBABLUFRe95jzxV8E_XzTsLtK-3eggjs5eVXviA4VLY0UMW', 20).then(trxs => {
      trxs, 'trxs')
    })*/

    return () => clearInterval(validatorsInt);
  }, []);

  return (
    <div className={"App"}>
      <AppContainer>
        <Modals />
        <XpBridge network={network} />
        <Alert />
        <Widget />
        <DepositAlert />
      </AppContainer>
    </div>
  );
}

export default withConnect(App);
