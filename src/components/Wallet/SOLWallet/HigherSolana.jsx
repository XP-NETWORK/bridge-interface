import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { getRightPath } from "../../../wallet/helpers";

import { withServices } from "../../App/hocs/withServices";
import { Chain } from "xp.network";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccount,
    setConnectedWallet,
    setRedirectModal,
    // setError,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";
import { onPhantom, onSolflare } from "./SoloanaConnectors";
import { useNavigate } from "react-router-dom";
import { getRightPath } from "../../../wallet/helpers";
import { biz } from "../../values";

export default function HigherSolana(OriginalComponent) {
    const updatedComponent = withServices((props) => {
        const { innerWidth, from, testNet, to } = useSelector(
            (state) => state.general
        );
        const { serviceContainer, close } = props;
        const { bridge } = serviceContainer;
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const navigateToAccountRoute = () => {
            if (from && to) navigate(getRightPath());
        };

        const connectHandler = async (wallet) => {
            let account;
            switch (wallet) {
                case "Phantom":
                    if (innerWidth < 425) {
                        dispatch(setRedirectModal("Phantom"));
                        return;
                    }
                    account = await onPhantom();
                    dispatch(setConnectedWallet("Phantom"));
                    break;
                case "Solflare":
                    if (innerWidth < 425) {
                        dispatch(setRedirectModal("Solflare"));
                        return;
                    }
                    account = await onSolflare();
                    dispatch(setConnectedWallet("Solflare"));
                    break;
                default:
                    break;
            }
            const chainWrapper = await bridge.getChain(Chain.SOLANA);
            chainWrapper.setSigner(account.signer);
            bridge.setCurrentType(chainWrapper);
            dispatch(setAccount(account.address));
            dispatch(setWalletsModal(false));
            close();
            navigateToAccountRoute();
        };

        const getStyle = () => {
            // eslint-disable-next-line no-debugger
            if (biz || testNet) {
                if (!from) return {};
                else if (from && from?.type !== "Solana")
                    return { pointerEvents: "none", opacity: "0.6" };
            } else return { pointerEvents: "none", opacity: "0.6" };
            // if (!testNet) return { display: "none" };
            // else if (!from && biz) return {};
            // else if (from && biz && from?.type !== "Solana")
            //     return { pointerEvents: "none", opacity: "0.6" };
        };

        return (
            <OriginalComponent
                {...props}
                connectWallet={connectHandler}
                styles={getStyle}
            />
        );
    });
    return updatedComponent;
}
