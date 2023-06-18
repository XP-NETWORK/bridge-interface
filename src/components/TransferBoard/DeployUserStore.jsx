import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    setDeployUserEstimation,
    setTransferLoaderModal,
    setLockMainPannel,
    setError,
    setUndeployedUserStore,
    cleanSelectedNFTList,
} from "../../store/reducers/generalSlice";

import { ReactComponent as Close } from "../../assets/img/icons/close.svg";

const DeployUserStore = ({ chainWrapper, nft, chainParams }) => {
    const [show, setShow] = useState(false);
    //const [locked, setLocked] = useState(true);

    const dispatch = useDispatch();
    const { estimation, to } = useSelector((state) => ({
        estimation: state.general.deployUserStoreEstimation,
        to: state.general.to,
    }));

    useEffect(() => {
        (async () => {
            if (nft && !nft.wrapped) {
                try {
                    dispatch(setLockMainPannel(true));

                    const [
                        mapping,
                        userStore,
                    ] = await chainWrapper.checkUserStore(nft, to.nonce);

                    dispatch(setLockMainPannel(false));

                    if (userStore || mapping) return;

                    dispatch(setUndeployedUserStore(true));
                    setShow(true);
                    const deployEstimation = await chainWrapper.estimateDeployUserStore();
                    if (deployEstimation) {
                        dispatch(setDeployUserEstimation(deployEstimation));
                    }
                } catch (e) {
                    dispatch(setLockMainPannel(false));
                    dispatch(setUndeployedUserStore(false));
                    dispatch(setError(e));
                }
            }
        })();
        return () => {
            setShow(false);
            dispatch(setUndeployedUserStore(false));
        };
    }, [nft]);

    const cancelDeployHandler = () => {
        document
            .querySelectorAll(".nft-box__wrapper.selected")
            .forEach((el) => el.classList.remove("selected"));

        dispatch(cleanSelectedNFTList());
    };

    const deployHandler = async () => {
        dispatch(setTransferLoaderModal(true));
        try {
            const address = await chainWrapper.deployUserStore(
                nft,
                String(estimation.formatedFees)
            );
            if (!address)
                throw new Error("Could not deploy contract, come back later");

            setShow(false);
            dispatch(setUndeployedUserStore(false));
        } catch (e) {
            dispatch(setError(e));
        }

        dispatch(setTransferLoaderModal(false));
    };

    const OFF = {
        display: "none",
    };

    const DISABLED = {
        pointerEvents: "none",
        opacity: ".7",
    };

    return (
        <div className="deploy-container" style={!show ? OFF : {}}>
            <div className="approval__header">
                {" "}
                <h3>Origin Deployment Fee</h3>
                <Close
                    onClick={cancelDeployHandler}
                    className="svgWidget closeIcon"
                />
            </div>

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
            <button onClick={deployHandler} style={estimation ? {} : DISABLED}>
                Pay
            </button>
        </div>
    );
};

export default DeployUserStore;
