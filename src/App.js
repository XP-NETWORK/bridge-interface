import { useEffect, React } from "react";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alerts/Alert.jsx";
import DepositAlert from "./components/Alerts/DepositAlert";
import * as generalSlice from "./store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchXPUpdate,
    getAndSetFactory,
    transformToDate,
} from "./wallet/helpers";
import { chains } from "./components/values";

import "./components/Modals/Modal.css";
import Modals from "./components/Modals/Modals";

function App() {
    const dispatch = useDispatch();
    const factory = useSelector((state) => state.general.factory);

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
