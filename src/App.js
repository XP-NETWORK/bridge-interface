import { useEffect, React } from "react";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alerts/Alert.jsx";
import DepositAlert from "./components/Alerts/DepositAlert";
import axios from "axios";
import * as generalSlice from "./store/reducers/generalSlice";
import { useDispatch } from "react-redux";

import { getAndSetFactory, transformToDate } from "./wallet/helpers";
import { chains } from "./components/values";

import "./components/Modals/Modal.css";
import Modals from "./components/Modals/Modals";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // debugger
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
        saveFactory();
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
