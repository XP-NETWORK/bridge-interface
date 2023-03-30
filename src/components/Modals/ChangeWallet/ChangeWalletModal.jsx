import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccount,
    setAccountWalletModal,
    setChangeWallet,
    setFrom,
    setTemporaryFrom,
    setTo,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";
import { ReactComponent as CloseComp } from "../../../assets/img/icons/close.svg";
import { Modal } from "react-bootstrap";
import icon from "../../../assets/img/icons/book.svg";
import { useWeb3React } from "@web3-react/core";
import {
    googleAnalyticsCategories,
    handleGA4Event,
} from "../../../services/GA4";

export default function ChangeWalletModal() {
    // const location = useLocation();
    const dispatch = useDispatch();
    const { deactivate } = useWeb3React();
    let { temporaryTo, temporaryFrom, testNet, from, to } = useSelector(
        (state) => state.general
    );

    const path = window.location.pathname;

    // );
    const handleClose = () => {
        dispatch(setChangeWallet(false));
        dispatch(setTemporaryFrom(""));
    };

    const handleClick = () => {
        // eslint-disable-next-line no-debugger
        // debugger;
        handleGA4Event(
            googleAnalyticsCategories.Chain,
            `Changing chain from ${from?.text} to: ${to.text}`
        );
        deactivate();
        dispatch(setFrom(temporaryFrom));
        dispatch(setTo(temporaryTo));
        dispatch(setAccount(""));
        dispatch(setChangeWallet(false));
        if (path === `${testNet ? "/testnet/connect" : "/connect"}`) {
            dispatch(setWalletsModal(true));
        } else dispatch(setAccountWalletModal(true));
    };

    return (
        <>
            <span className="tron-connection-error-close" onClick={handleClose}>
                <CloseComp className="svgWidget" />
            </span>
            <Modal.Header className="border-0 tron-login-error__header">
                <Modal.Title className="switch-Wallet__title">
                    Change Wallet
                </Modal.Title>
                <span className="worngImg">
                    <div className="wrong-icon">
                        <div className="first-wrong__bg">
                            <div className="second-wrong__bg">
                                <img src={icon} alt="" />
                            </div>
                        </div>
                    </div>
                </span>
            </Modal.Header>
            <Modal.Body className="tron-connection-error__body">
                <div className="switch-Wallet__text">
                    <div className="text__top">
                        Selected blockchain doesn’t support this wallet
                    </div>
                    <div className="text__bottom">
                        Changing wallet will end your current session
                    </div>
                    <div onClick={handleClick} className="switch__button">
                        Change wallet
                    </div>
                </div>
            </Modal.Body>
        </>
    );
}

//     );

//     return updatedComponent;
// }
