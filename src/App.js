/* eslint-disable react/prop-types */
import { useEffect, React } from "react";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alerts/Alert.jsx";
import DepositAlert from "./components/Alerts/DepositAlert";
import * as generalSlice from "./store/reducers/generalSlice";
import { useDispatch } from "react-redux";

import {
    checkValidators,
    fetchXPUpdate,
    transformToDate,
} from "./wallet/helpers";
import { chains } from "./components/values";

import "./components/Modals/Modal.css";
import Modals from "./components/Modals/Modals";

import AppContainer from "./components/App/container";

function App({ network }) {
    const dispatch = useDispatch();

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
