import React, { useEffect } from "react";
import {
    connectAlgoSigner,
    connectMyAlgo,
    connectAlgoWallet,
} from "./ConnectWalletHelper";
import AlgorandWalletIcon from "../../assets/img/wallet/AlgorandWallet.svg";
import MyAlgoBlue from "../../assets/img/wallet/MyAlgoBlue.svg";
import AlgoSignerIcon from "../../assets/img/wallet/Algo Signer.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setFrom,
    setAlgorandAccount,
    setMyAlgo,
    setAlgoSigner,
    setAlgorandWallet,
    setAccount,
} from "../../store/reducers/generalSlice";
import { setSigner } from "../../store/reducers/signersSlice";
import PropTypes from "prop-types";
import { getRightPath } from "../../wallet/helpers";

import { Chain } from "xp.network";
import { getChainObject } from "../../components/values";
import { withServices } from "../App/hocs/withServices";
import { algoConnector } from "../../wallet/connectors";

function AlgorandWallet({ wallet, close, serviceContainer }) {
    const { bridge } = serviceContainer;
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const testnet = useSelector((state) => state.general.testNet);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navigateToAccountRoute = () => {
        navigate(getRightPath());
    };

    const connectionHandler = async (wallet) => {
        // eslint-disable-next-line no-debugger
        debugger;
        const chainWrapper = await bridge.getChain(
            from?.nonce || Chain.ALGORAND
        );
        let account;
        switch (wallet) {
            case "MyAlgo":
                account = await connectMyAlgo(chainWrapper.chain);
                account && dispatch(setMyAlgo(true));
                break;
            case "AlgoSigner":
                account = await connectAlgoSigner(testnet);
                console.log(
                    "🚀 ~ file: AlgorandWallet.jsx:53 ~ connectionHandler ~ account",
                    account
                );
                account && dispatch(setAlgoSigner(true));

                break;
            case "Algorand Wallet": //TODO
                connectAlgoWallet();
                break;
            default:
                break;
        }

        if (account) {
            close();
            chainWrapper.setSigner(account.signer);
            bridge.setCurrentType(chainWrapper);
            dispatch(setSigner(account.signer));
            console.log(account.address);
            dispatch(setAccount(account.address));
            if (temporaryFrom) dispatch(setFrom(temporaryFrom));
            if (account && to) navigateToAccountRoute();
            if (!from) {
                dispatch(setFrom(getChainObject(Chain.ALGORAND)));
            }
        }
    };

    const getStyle = () => {
        // debugger;
        if (temporaryFrom?.type === "Algorand") {
            return {};
        } else if (temporaryFrom && temporaryFrom?.type !== "Algorand") {
            return OFF;
        } else if (!from) {
            return {};
        } else if (from && from.type === "Algorand") {
            return {};
        } else return OFF;
    };

    useEffect(() => {
        const cb = async (error, payload) => {
            console.log("setAlgorandWallet");
            const chainWrapper = await bridge.getChain(
                from?.nonce || Chain.ALGORAND
            );
            if (error) {
                throw error;
            }
            const { accounts } = payload.params[0];
            const account = accounts[0];
            if (account) {
                const signer = await chainWrapper.chain.walletConnectSigner(
                    algoConnector,
                    account
                );

                chainWrapper.setSigner(signer);
                dispatch(setAlgorandWallet(true));
                dispatch(setAlgorandAccount(account));
                if (to) navigateToAccountRoute();
            }
        };

        algoConnector.on("connect", cb);
        return () => algoConnector.off("connect", cb);
    }, []);

    return wallet === "MyAlgo" ? (
        <li
            style={getStyle()}
            // style={{pointerEvents: "none", opacity: '0.6'}}
            onClick={() => connectionHandler("MyAlgo")}
            className="wllListItem algo"
            data-wallet="MyAlgo"
        >
            <img src={MyAlgoBlue} alt="" />
            <p>MyAlgo</p>
        </li>
    ) : wallet === "AlgoSigner" ? (
        <li
            style={getStyle()}
            // style={{pointerEvents: "none", opacity: '0.6'}}
            onClick={() => connectionHandler("AlgoSigner")}
            data-wallet="AlgoSigner"
            className="wllListItem algo"
        >
            <img src={AlgoSignerIcon} alt="Algor Signer Icon" />
            <p>Algo Signer</p>
        </li>
    ) : (
        <li
            style={getStyle()}
            onClick={() => connectionHandler("Algorand Wallet")}
            data-wallet="Algorand Wallet"
            className="wllListItem algo"
        >
            <img src={AlgorandWalletIcon} alt="Algor Wallet Icon" />
            <p>Algorand Wallet</p>
        </li>
    );
}
AlgorandWallet.propTypes = {
    wallet: PropTypes.string,
    close: PropTypes.any,
    serviceContainer: PropTypes.object,
};

export default withServices(AlgorandWallet);
