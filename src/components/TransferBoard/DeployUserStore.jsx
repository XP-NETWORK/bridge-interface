import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    setDeployUserEstimation,
    setTransferLoaderModal,
    setError,
    setUndeployedUserStore,
} from "../../store/reducers/generalSlice";

const DeployUserStore = ({ serviceContainer, nft, chainParams }) => {
    const { bridge } = serviceContainer;
    const [show, setShow] = useState(false);
    //const [locked, setLocked] = useState(true);

    const dispatch = useDispatch();
    const { from, estimation, to } = useSelector((state) => ({
        from: state.general.from,
        estimation: state.general.deployUserStoreEstimation,
        to: state.general.to,
    }));

    useEffect(() => {
        if (nft && !nft.wrapped) {
            bridge.getChain(from.nonce).then(async (fromChain) => {
                const [mapping, userStore] = await fromChain.checkUserStore(
                    nft,
                    to.nonce
                );
                if (userStore || mapping) return;
                setShow(true);
                dispatch(setUndeployedUserStore(true));
                const deployEstimation = await fromChain.estimateDeployUserStore();
                if (deployEstimation) {
                    dispatch(setDeployUserEstimation(deployEstimation));
                }
            });
        }

        return () => {
            dispatch(setUndeployedUserStore(false));
        };
    }, [nft]);

    const deployHandler = () => {
        dispatch(setTransferLoaderModal(true));
        bridge.getChain(from.nonce).then(async (fromChain) => {
            try {
                const address = await fromChain.deployUserStore(
                    nft,
                    String(estimation.formatedFees)
                );
                if (!address)
                    throw new Error(
                        "Could not deploy contract, come back later"
                    );

                setShow(false);
                dispatch(setUndeployedUserStore(false));
            } catch (e) {
                dispatch(setError(e));
            }

            dispatch(setTransferLoaderModal(false));
        });
    };

    const OFF = {
        display: "none",
    };

    return (
        <div className="deploy-container fees" style={!show ? OFF : {}}>
            <button
                //style={locked ? { pointerEvents: "none", opacity: ".7" } : {}}
                className="whitelist-btn"
                onClick={deployHandler}
            >
                Deploy Minter Contract
            </button>
            <div className="deploy-container_fees">
                <span>{estimation?.formatedFees.toFixed(3)}</span>
                <span>{chainParams?.currencySymbol}</span>
            </div>
        </div>
    );
};

export default DeployUserStore;
