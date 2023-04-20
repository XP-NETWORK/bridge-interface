import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { convert } from "../../wallet/helpers";

import {
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
import { withWidget } from "../Widget/hocs/withWidget";
import { notifyExplorer } from "../../services/explorer";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";
import { compose } from "redux";

export default compose(
    withServices,
    withWidget
)(function ButtonToTransfer({ serviceContainer, setTxForWidget, getExtraFee }) {
    const { bridge } = serviceContainer;

    const txnHashArr = useSelector((state) => state.general.txnHashArr);
    const receiver = convert(useSelector((state) => state.general.receiver));

    const approved = useSelector((state) => state.general.approved);
    const _to = useSelector((state) => state.general.to);
    const from = useSelector((state) => state.general.from.key);
    const _from = useSelector((state) => state.general.from);
    const account = useSelector((state) => state.general.account);
    const bigNumberFees = useSelector((state) => state.general.bigNumberFees);

    //const isInvalid = useSelector((state) => state.general.isInvalid);
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

    const sendEach = async (nft) => {
        try {
            const [fromChain, toChain] = await Promise.all([
                bridge.getChain(_from.nonce),
                bridge.getChain(_to.nonce),
            ]);

            const unstoppabledomain = await getFromDomain(receiver, toChain);
            if (unstoppabledomainSwitch(unstoppabledomain)) return;

            const res = await fromChain.transfer({
                toChain,
                nft,
                receiver: unstoppabledomain || receiver,
                fee: bigNumberFees,
                discountLeftUsd,
                extraFee: getExtraFee(from),
            });
            const { result, mintWith } = res;
            let mw = toChain.showMintWith && (mintWith || toChain.XpNft);
            if (txnHashArr[0] && !result) {
                dispatch(setTxnHash({ txn: "failed", nft }));
            } else if (result) {
                const resultObject = fromChain.handlerResult(result);
                notifyExplorer(_from.nonce, resultObject.hash);
                dispatch(setTxnHash({ txn: resultObject, nft, mw }));
                setTxForWidget({
                    result: resultObject,
                    fromNonce: _from.nonce,
                    toNonce: _to.nonce,
                    bigNumberFees,
                    from,
                    nft,
                    senderAddress: account,
                    targetAddress: unstoppabledomain || receiver,
                });
            }
            handleGA4Event(
                googleAnalyticsCategories.Transfer,
                `${receiver} Success transfer`
            );
        } catch (e) {
            console.log(e, "eee");
            dispatch(setError(e));
            handleGA4Event(
                googleAnalyticsCategories.Transfer,
                `${receiver} Failed transfer`
            );
        }

        setLoading(false);
        dispatch(setTransferLoaderModal(false));
    };

    const sendAllNFTs = async () => {
        handleGA4Event(
            googleAnalyticsCategories.Transfer,
            `${receiver} trying to transfer ${selectedNFTList.length} nfts`
        );
        if (!receiver) {
            dispatch(setPasteDestinationAlert(true));
        } else if (selectedNFTList.length < 1) {
            dispatch(setSelectNFTAlert(true));
        } else if (!approved) {
            dispatch(setNoApprovedNFTAlert(true));
        } else if (!loading && approved) {
            setLoading(true);
            dispatch(setTransferLoaderModal(true));

            for (let index = 0; index < selectedNFTList.length; index++) {
                if (from === "VeChain" || from === "TON") {
                    await sendEach(selectedNFTList[index], index);
                } else {
                    sendEach(selectedNFTList[index], index);
                }
            }
        }
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

/***
 * 
 * 
 * import { withWidget } from "../Widget/hocs/withWidget";

export default withWidget(function ButtonToTransfer({

const params = {
  extraFees: getExtraFee(from),
}


   } else if (result) {
      setTxForWidget({
        result,
        fromNonce: _from.nonce,
        toNonce: _to.nonce,
        bigNumberFees,
        from,
        nft,
        senderAddress: account || algorandAccount,
        targetAddress: receiverAddress || unstoppabledomain || receiver,
      });
 */
