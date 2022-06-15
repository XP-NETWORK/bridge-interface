import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setAccount,
    setAlgorandAccount,
    setAlgorandClaimables,
    setAlgoSigner,
    setChangeWallet,
    setConfirmMaiarMob,
    setElrondAccount,
    setFrom,
    setKukaiWallet,
    setMaiarProvider,
    setMetaMask,
    setMyAlgo,
    setOnMaiar,
    setOnWC,
    setQrCodeString,
    setQrImage,
    setSync2,
    setSync2Connecx,
    setTempleWallet,
    setTezosAccount,
    setTo,
    setTronLink,
    setTronWallet,
    setWalletsModal,
    setWC,
} from "../../../store/reducers/generalSlice";
import { ReactComponent as CloseComp } from "../../../assets/img/icons/close.svg";
import { Modal } from "react-bootstrap";
import icon from "../../../assets/img/icons/book.svg";
import { useWeb3React } from "@web3-react/core";
import { getAddEthereumChain } from "../../../wallet/chains";
import { CHAIN_INFO, TESTNET_CHAIN_INFO } from "../../values";

export default function ChangeWalletModal() {
    const changeWallet = useSelector((state) => state.general.changeWallet);
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const testnet = useSelector((state) => state.general.testNet);
    const dispatch = useDispatch();
    const { deactivate } = useWeb3React();

    const handleClose = () => {
        dispatch(setChangeWallet(false));
    };

    const handleSwitch = (e) => {
        const temp = to;
        dispatch(setTo(from));
        dispatch(setFrom(temp));
    };

    const handleClick = () => {
        switch (from.type) {
            case "EVM":
                dispatch(setAccount(""));
                dispatch(setOnWC(""));
                dispatch(setWC(""));
                dispatch(setMetaMask(""));
                dispatch(setChangeWallet(false));
                deactivate();
                handleSwitch();
                dispatch(setWalletsModal(true));
                break;
            case "Tron":
                dispatch(setTronWallet(""));
                dispatch(setTronLink(""));
                handleSwitch();
                dispatch(setChangeWallet(false));
                break;
            case "Elrond":
                dispatch(setOnMaiar(""));
                dispatch(setElrondAccount(""));
                dispatch(setMaiarProvider(""));
                dispatch(setQrImage(""));
                dispatch(setQrCodeString(""));
                dispatch(setConfirmMaiarMob(""));
                dispatch(setChangeWallet(false));
                handleSwitch();
                dispatch(setWalletsModal(true));
                break;
            case "Tezos":
                dispatch(setTezosAccount(""));
                dispatch(setKukaiWallet(""));
                dispatch(setTempleWallet(""));
                dispatch(setChangeWallet(false));
                handleSwitch();
                dispatch(setWalletsModal(true));
                break;
            case "VeChain":
                dispatch(setSync2Connecx(""));
                dispatch(setSync2(""));
                dispatch(setAccount(""));
                dispatch(setChangeWallet(false));
                handleSwitch();
                dispatch(setWalletsModal(true));
                break;
            case "Algorand":
                dispatch(setAlgoSigner(""));
                dispatch(setAlgorandAccount(""));
                dispatch(setAlgorandClaimables([]));
                dispatch(setMyAlgo(""));
                dispatch(setChangeWallet(false));
                handleSwitch();
                dispatch(setWalletsModal(true));
                break;
            default:
                break;
        }
    };

    return (
        <Modal
            className="ChainModal switchWallet"
            animation={false}
            size="sm"
            show={changeWallet}
            onHide={() => handleClose()}
        >
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
        </Modal>
    );
}
