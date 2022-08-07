import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setAccount,
    setAccountWalletModal,
    setAlgorandAccount,
    setAlgorandClaimables,
    setAlgoSigner,
    setChangeWallet,
    setConfirmMaiarMob,
    setElrondAccount,
    setFrom,
    setKeplrAccount,
    setKeplrWallet,
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
    setTemporaryFrom,
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
import { useLocation } from "react-router-dom";

export default function ChangeWalletModal() {
    const location = useLocation();
    const changeWallet = useSelector((state) => state.general.changeWallet);
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const testnet = useSelector((state) => state.general.testNet);
    const temporaryTo = useSelector((state) => state.general.temporaryTo);
    const Sync2 = useSelector((state) => state.general.Sync2);

    const dispatch = useDispatch();
    const { deactivate } = useWeb3React();
    const evmAccount = useSelector((state) => state.general.account);
    const tronAccount = useSelector((state) => state.general.tronWallet);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const tezosAccount = useSelector((state) => state.general.tezosAccount);
    const secretAccount = useSelector((state) => state.general.secretAccount);

    const algorandAccount = useSelector(
        (state) => state.general.algorandAccount
    );
    const handleClose = () => {
        dispatch(setChangeWallet(false));
        dispatch(setTemporaryFrom(""));
    };

    const handleSwitch = (e) => {
        const temp = to;
        dispatch(setTo(from));
        dispatch(setFrom(temp));
    };

    const chooseWalletModal = () =>
        isRightLocation()
            ? dispatch(setAccountWalletModal(true))
            : dispatch(setWalletsModal(true));

    const typeOfChainConnected = () => {
        switch (true) {
            case evmAccount?.length > 0:
                return Sync2 ? "VeChain" : "EVM";
            case algorandAccount?.length > 0:
                return "Algorand";
            case tezosAccount?.length > 0:
                return "Tezos";
            case elrondAccount?.length > 0:
                return "Elrond";
            case tronAccount?.length > 0:
                return "Tron";
            case secretAccount?.length > 0:
                return "Cosmos";
            default:
                return undefined;
        }
    };

    const isRightLocation = () => {
        switch (location.pathname) {
            case "/account":
                return true;
            case "/testnet/account":
                return true;
            default:
                break;
        }
    };

    const setTempTo = () => {
        dispatch(setTo(temporaryTo));
    };

    const handleClick = () => {
        // debugger;
        switch (typeOfChainConnected()) {
            case "EVM":
                dispatch(setAccount(""));
                dispatch(setOnWC(""));
                dispatch(setWC(""));
                dispatch(setMetaMask(""));
                dispatch(setChangeWallet(false));
                deactivate();
                chooseWalletModal();
                // dispatch(setNFTSetToggler());
                if (temporaryTo) setTempTo();
                break;
            case "Tron":
                dispatch(setTronWallet(""));
                dispatch(setTronLink(""));
                handleSwitch();
                chooseWalletModal();
                // dispatch(setNFTSetToggler());
                if (temporaryTo) setTempTo();
                break;
            case "Elrond":
                dispatch(setOnMaiar(""));
                dispatch(setElrondAccount(""));
                dispatch(setMaiarProvider(""));
                dispatch(setQrImage(""));
                dispatch(setQrCodeString(""));
                dispatch(setConfirmMaiarMob(""));
                dispatch(setChangeWallet(false));
                chooseWalletModal();
                // dispatch(setNFTSetToggler());
                if (temporaryTo) setTempTo();
                break;
            case "Tezos":
                dispatch(setTezosAccount(""));
                dispatch(setKukaiWallet(""));
                dispatch(setTempleWallet(""));
                dispatch(setChangeWallet(false));
                chooseWalletModal();
                // dispatch(setNFTSetToggler());
                if (temporaryTo) setTempTo();
                break;
            case "VeChain":
                // debugger;
                dispatch(setSync2Connecx(""));
                dispatch(setSync2(""));
                dispatch(setAccount(""));
                dispatch(setChangeWallet(false));
                chooseWalletModal();
                // dispatch(setNFTSetToggler());
                if (temporaryTo) setTempTo();
                break;
            case "Algorand":
                dispatch(setAlgoSigner(""));
                dispatch(setAlgorandAccount(""));
                dispatch(setAlgorandClaimables([]));
                dispatch(setMyAlgo(""));
                dispatch(setChangeWallet(false));
                chooseWalletModal();
                // dispatch(setNFTSetToggler());
                if (temporaryTo) setTempTo();
                break;
            case "Cosmos":
                dispatch(setKeplrWallet(""));
                dispatch(setKeplrAccount(""));
                dispatch(setChangeWallet(false));
                chooseWalletModal();
                // dispatch(setNFTSetToggler());s
                if (temporaryTo) setTempTo();
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
