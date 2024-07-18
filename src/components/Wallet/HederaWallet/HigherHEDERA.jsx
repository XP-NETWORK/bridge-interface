import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withServices } from "../../App/hocs/withServices";
import { connectHashPack } from "./hederaConnections";

import {
    setConnectedWallet,
    setMetaMask,
    setFrom,
    setError,
    setConnectedWalletType,
} from "../../../store/reducers/generalSlice";

import { getChainObject } from "../../values";
import { connectMetaMask } from "../ConnectWalletHelper";

import { useWeb3React } from "@web3-react/core";

import { useNavigate } from "react-router";

import { getRightPath } from "../../../utils";

import { Chain } from "xp.network";

function HigherHEDERA(OriginalComponent) {
    function updatedComponent({ serviceContainer }) {
        const { bridge } = serviceContainer;
        const dispatch = useDispatch();
        const network = useSelector((state) => state.general.testNet);
        const to = useSelector((state) => state.general.to);
        const { activate, chainId } = useWeb3React();
        const navigate = useNavigate();
        const temporaryFrom = useSelector(
            (state) => state.general.temporaryFrom
        );

        const getStyles = () => {};

        const connectWallet = async (wallet) => {
            switch (wallet) {
                case "HashPack":
                    await connectHashPack(network);
                    dispatch(setConnectedWallet("HashPack"));
                    dispatch(setConnectedWalletType("Hedera"));
                    break;
                case "MM": {
                    const provider = window.ethereum;
                    if (!provider) {
                        return dispatch(
                            setError({ message: "Meta Mask is not installed" })
                        );
                    }

                    const from = getChainObject(Chain.HEDERA);

                    const connected = await connectMetaMask(
                        activate,
                        from,
                        to,
                        chainId
                    );
                    if (connected) {
                        dispatch(setMetaMask(true));
                        dispatch(setConnectedWallet("MetaMask"));
                        dispatch(setConnectedWalletType("Hedera"));
                        if (temporaryFrom) dispatch(setFrom(temporaryFrom));
                        if (to)
                            navigate(getRightPath(bridge.network, from, to));
                    }

                    break;
                }

                default:
                    break;
            }
        };

        return (
            <OriginalComponent
                styles={getStyles}
                connect={connectWallet}
                bridge={bridge}
            />
        );
    }

    return withServices(updatedComponent);
}
export default HigherHEDERA;
