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
  setIsInvalidAddress,
  setShowAbout,
  setShowVideo,
} from "./store/reducers/generalSlice";
//  import { setQRCodeModal } from "../../Wallet/TONWallet/tonStore";
import { bridgeUrl, chains } from "./components/values";

import "./components/Modals/Modal.css";
import Modals from "./components/Modals/Modals";
import AppContainer from "./components/App/container";
import { generateKey } from "./services/utils";

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
    let account = useSelector((state) => state.general.account);
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
    if (!location.pathname.includes("account")) {
      dispatch(setIsInvalidAddress(true));
    }
    window.onpopstate = function() {
      dispatch(setShowAbout(false));
      dispatch(setShowVideo(false));
      dispatch(setError(false));
    };
  }, [location]);

  useEffect(() => {
    dispatch(setWalletsModal(false));
  }, [account]);

    useEffect(() => {
        window.safeLocalStorage?.removeItem("walletconnect");
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
                const toChain = chains.filter(
                    (n) => n.text === to.replace("/", "")
                )[0];
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

        const key = generateKey(10); // assuming generateKey() is a function that generates a random string

        const deepLink = `wc:connect/xp?bridge=${encodeURIComponent(
            bridgeUrl
        )}&key=${encodeURIComponent(key)}`;
        dispatch(generalSlice.setDeepLink(deepLink));

        return () => clearInterval(validatorsInt);
    }, []);

    return (
        <div className={"App"}>
            <AppContainer>
                <Modals />
                <XpBridge network={network} />
                <Alert />
                <DepositAlert />
            </AppContainer>
        </div>
    );
}

export default App;
