import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";
import {
    setChainModal,
    setDepartureOrDestination,
    setSwitchDestination,
} from "../../store/reducers/generalSlice";
import "./Buttons.css";

export default function ChainSwitch({ assignment }) {
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const connectedWallet = useSelector(
        (state) => state.general.connectedWallet
    );
    const wc = connectedWallet === "WalletConnect";
    const dispatch = useDispatch();
    const OFF = { pointerEvents: "none", opacity: "0.7" };
    function handleSwitchChain() {
        dispatch(setDepartureOrDestination("destination"));
        dispatch(setSwitchDestination(true));
        handleGA4Event(
            googleAnalyticsCategories.Chain,
            `Switching destination from account route.`
        );
    }

    const handleFromChainSwitch = () => {
        dispatch(setDepartureOrDestination("departure"));
        dispatch(setChainModal(true));
        handleGA4Event(
            googleAnalyticsCategories.Chain,
            `Switching departure from account route.`
        );
    };

    const show = () => {
        switch (assignment) {
            case "from":
                return (
                    <span
                        style={wc ? OFF : {}}
                        onClick={handleFromChainSwitch}
                        className="chain-switch"
                    >
                        <img
                            style={{ width: "30px" }}
                            src={from.image.src}
                            alt=""
                        />{" "}
                        {from.text}
                        <div className="arrow-down"></div>
                    </span>
                );
            case "to":
                return (
                    <span onClick={handleSwitchChain} className="chain-switch">
                        <img
                            style={{ width: "30px" }}
                            src={to?.image?.src}
                            alt=""
                        />{" "}
                        {to?.text}
                        <div className="arrow-down"></div>
                    </span>
                );
            default:
                break;
        }
    };

    return show();
}
