import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    setDeployUserEstimation,
    setTransferLoaderModal,
    setLockMainPannel,
    setError,
    setUndeployedUserStore,
} from "../../store/reducers/generalSlice";

import { ReactComponent as InfLithComp } from "../../assets/img/icons/Inf.svg";

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
            try {
                dispatch(setLockMainPannel(true));
                bridge.getChain(from.nonce).then(async (fromChain) => {
                    const [mapping, userStore] = await fromChain.checkUserStore(
                        nft,
                        to.nonce
                    );

                    dispatch(setLockMainPannel(false));

                    if (userStore || mapping) return;

                    dispatch(setUndeployedUserStore(true));
                    setShow(true);
                    const deployEstimation = await fromChain.estimateDeployUserStore();
                    if (deployEstimation) {
                        dispatch(setDeployUserEstimation(deployEstimation));
                    }
                });
            } catch (e) {
                dispatch(setLockMainPannel(false));
                dispatch(setUndeployedUserStore(false));
                dispatch(setError(e));
            }
        }

        return () => {
            setShow(false);
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
        <div className="deploy-container" style={!show ? OFF : {}}>
            <div className="deploy-userStore_inf ">
                {/* before */}
                <InfLithComp className="svgWidget nftInfIcon" alt="info" />
                {/* after */}
            </div>
            <h3>Origin Deployment Fee</h3>
            <p>
                Pay one-time origin chain deployment fee to get your NFT
                collection integrated with the bridge.{" "}
            </p>
            <div className="deploy-container_fees">
                One Time Fee
                <div>
                    <span>{estimation?.formatedFees.toFixed(3)}</span>
                    <span>{chainParams?.currencySymbol}</span>
                </div>
            </div>
            <button onClick={deployHandler}>Pay</button>
        </div>
    );
};

export default DeployUserStore;
