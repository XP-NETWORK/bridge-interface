/* eslint-disable no-debugger */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { convert } from "../../utils";

import {
    setCheckDestinationAddress,
    setError,
    setNoApprovedNFTAlert,
    setTransferLoaderModal,
    setTxnHash,
} from "../../store/reducers/generalSlice";
import {
    setPasteDestinationAlert,
    setSelectNFTAlert,
} from "../../store/reducers/generalSlice";
import { getFromDomain } from "../../services/resolution";

import { withServices } from "../App/hocs/withServices";
import { notifyExplorer } from "../../services/explorer";

import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";
import BigNumber from "bignumber.js";

export default withServices(function ButtonToTransfer({ serviceContainer }) {
    const { bridge } = serviceContainer;

    const txnHashArr = useSelector((state) => state.general.txnHashArr);
    const receiver = convert(useSelector((state) => state.general.receiver));
    const account = convert(useSelector((state) => state.general.account));
    const approved = useSelector((state) => state.general.approved);
    const _to = useSelector((state) => state.general.to);
    //const from = useSelector((state) => state.general.from.key);
    const _from = useSelector((state) => state.general.from);
    const bigNumberFees = useSelector((state) => state.general.bigNumberFees);
    const receiverIsContract = useSelector(
        (state) => state.general.receiverIsContract
    );

    const bigNumberDeployFees = useSelector(
        (state) => state.general.bigNumberDeployFees
    );

    const [loading, setLoading] = useState();
    const dispatch = useDispatch();

    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );
    const discountLeftUsd = useSelector((state) => state.discount.discount);

    const unstoppabledomainSwitch = (unstoppabledomain) => {
        let stop;
        if (unstoppabledomain) {
            switch (unstoppabledomain) {
                case "undefined":
                    dispatch(
                        setError({
                            message:
                                "Your domain does not explicitly support the chain you selected.",
                        })
                    );
                    dispatch(dispatch(setTransferLoaderModal(false)));
                    setLoading(false);
                    stop = true;
                    break;
                case "notEVM":
                    dispatch(
                        setError({
                            message:
                                "Domain names are currently not supported for Non-EVM chains.",
                        })
                    );
                    dispatch(dispatch(setTransferLoaderModal(false)));
                    setLoading(false);
                    stop = true;
                    break;
                case "invalid":
                    dispatch(
                        setError({
                            message:
                                "Domain does not exist. Please, check the spelling.",
                        })
                    );
                    dispatch(dispatch(setTransferLoaderModal(false)));
                    setLoading(false);
                    stop = true;
                    break;
                default:
                    break;
            }
        }
        return stop;
    };

    const sendAllNFTs = async () => {
        handleGA4Event(
            googleAnalyticsCategories.Transfer,
            `${receiver} trying to transfer ${selectedNFTList.length} nfts`
        );
        if (!receiver) {
            dispatch(setPasteDestinationAlert(true));
        } else if (receiverIsContract) {
            dispatch(setCheckDestinationAddress(true));
        } else if (selectedNFTList.length < 1) {
            dispatch(setSelectNFTAlert(true));
        } else if (!approved) {
            dispatch(setNoApprovedNFTAlert(true));
        } else if (!loading && approved) {
            setLoading(true);
            dispatch(setTransferLoaderModal(true));
            const fromChain = await bridge.getChain(_from.nonce);
            await fromChain.transferAll(selectedNFTList, sendEach);
            return stop;
        }
    };

    const sendEach = async (nft) => {
        // debugger;
        const [fromChain, toChain] = await Promise.all([
            bridge.getChain(_from.nonce),
            bridge.getChain(_to.nonce),
        ]);
        try {
            const unstoppabledomain = await getFromDomain(receiver, toChain);
            if (unstoppabledomainSwitch(unstoppabledomain)) return;

            const res = await fromChain.transfer({
                toChain,
                nft,
                receiver: unstoppabledomain || receiver,
                fee: new BigNumber(bigNumberFees || 0)
                    .div(3)
                    .plus(new BigNumber(bigNumberDeployFees || 0).div(5))
                    .integerValue()
                    .toString(10),
                discountLeftUsd,
                account,
            });

            const { result, mintWith } = res;

            const mw = toChain.showMintWith && (mintWith || toChain.XpNft);
            if (txnHashArr[0] && !result) {
                dispatch(setTxnHash({ txn: "failed", nft }));
            } else if (result) {
                const resultObject = fromChain.handlerResult(result);
                console.log(resultObject, "resultObject");
                notifyExplorer(
                    _from.nonce,
                    resultObject.hash || resultObject.transactionHash
                );
                dispatch(setTxnHash({ txn: resultObject, nft, mw }));
            }
            handleGA4Event(
                googleAnalyticsCategories.Transfer,
                `${receiver} Success transfer`
            );
        } catch (e) {
            const resultError = fromChain.handlerError(e);
            dispatch(setError(resultError));
            handleGA4Event(
                googleAnalyticsCategories.Transfer,
                `${receiver} Failed transfer`
            );
        }

        setLoading(false);
        dispatch(setTransferLoaderModal(false));
    };

    return (
        <div
            onClick={sendAllNFTs}
            className={
                !loading ? "transfer-button" : "transfer-button--disabled"
            }
        >
            {loading ? "Processing" : "Send"}
        </div>
    );
});
