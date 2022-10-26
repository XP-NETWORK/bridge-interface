import { useEffect, useState, React } from "react";

import XpBridge from "./pages/XpBridge";
import ApproveLoader from "./components/innercomponents/ApproveLoader";
import Error from "./components/innercomponents/Error";
import TronPopUp from "./components/innercomponents/TronPopUp";
import About from "./components/innercomponents/About";
import Video from "./components/innercomponents/Video";
import TechnicalSupport from "./components/innercomponents/TechnicalSupport";
import TransferLoader from "./components/innercomponents/TransferLoader";
import TronConnectionErrMod from "./components/Modals/TronModals/TronConnectionErrMod.jsx";
import Alert from "./components/Alerts/Alert.jsx";
import SuccessModal from "./components/Modals/Success/SuccessModal.jsx";
import ConnectAlgorand from "./components/Modals/AlgorandModal/ConnectAlgorand";
import DepositAlert from "./components/Alerts/DepositAlert";
import RedirectModal from "./components/Modals/Redirect/RedirectModal";
import axios from "axios";
import * as generalSlice from "./store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";

import { transformToDate } from "./wallet/helpers";
import { chains } from "./components/values";

import { Modal } from "react-bootstrap";
import "./components/Modals/Modal.css";

function App() {
    const dispatch = useDispatch();
    const [nftToOptIn, setNFTToOptIn] = useState();
    const [testnet, setTestnet] = useState();
    const txnHashArr = useSelector((state) => state.general.txnHashArr);

    const toShowSuccess = () => {
        return txnHashArr?.length ? true : false;
        // return true;
    };

    useEffect(() => {
        // debugger
        dispatch(generalSlice.setInnerWidth(window.innerWidth));
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
            dispatch(generalSlice.connectAlgorandWalletClaim(true));
        }
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

        localStorage.removeItem("walletconnect");

        // debugger
        axios
            .get("https://xpvitaldata.herokuapp.com/last-commit")
            .then((response) => {
                const d = transformToDate(response.data);
                dispatch(generalSlice.setGitLatestCommit(d));
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (window.location.href.includes("/staging"))
            dispatch(generalSlice.setStaging(true));
        else if (window.location.href.includes("/testnet"))
            dispatch(generalSlice.setTestNet(true));
    }, []);

    return (
        <div className={"App"}>
            <ConnectAlgorand nftToOptIn={nftToOptIn} testnet={testnet} />
            <About />
            <Video />
            <TechnicalSupport />
            <Modal
                animation={null}
                className="success-modal"
                show={toShowSuccess()}
            >
                <SuccessModal />
            </Modal>
            <TransferLoader />
            <TronConnectionErrMod />
            <RedirectModal />
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
