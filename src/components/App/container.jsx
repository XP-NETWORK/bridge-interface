import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { compose } from "redux";
import { useDispatch } from "react-redux";
import { withNearConnection } from "../Wallet/NEARWallet/withNearConnection";
import { withEVMConnection } from "../Wallet/EVMWallet/withEVMConnection";
import { withHederaConnection } from "../Wallet/HederaWallet/withHederaConnection";
import { withServices } from "./hocs/withServices";

import { BridgeModes } from "../values";
import {
    setTestNet,
    setStaging,
    setCheckWallet,
} from "../../store/reducers/generalSlice";

import { useNavigate } from "react-router";

const Container = ({ children, serviceContainer, setContainer }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            let network;

            if (window.location.pathname.includes(BridgeModes.Staging)) {
                network = BridgeModes.Staging;
                dispatch(setStaging(true));
            } else if (window.location.pathname.includes(BridgeModes.TestNet)) {
                network = BridgeModes.TestNet;
                dispatch(setTestNet(true));
            }
            const params = new URLSearchParams(window.location.search);
            const checkWallet = params.get(BridgeModes.CheckWallet);

            const bridge = await serviceContainer?.bridge?.init(network);
            checkWallet && bridge.setCheckWallet(checkWallet);
            setContainer({ ...serviceContainer, bridge });

            const query = window.location.search;

            dispatch(setCheckWallet(checkWallet));

            !query.includes("NEARTRX=true") &&
                navigate(`/${network ? network + "/" : ""}${query || ""}`);
        })();
    }, []);

    return <>{children}</>;
};

Container.propTypes = {
    children: PropTypes.any,
    serviceContainer: PropTypes.object,
    setContainer: PropTypes.func,
};

export default compose(
    withServices,
    withNearConnection,
    withEVMConnection,
    withHederaConnection
)(Container);
