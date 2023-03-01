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
import { notifyExplorer } from "../../services/explorer";
import {
    mainnetSecretMintWith,
    stagingSecretMintWith,
    testnetSecretMintWith,
} from "../values";

export default withServices(function ButtonToTransfer({ serviceContainer }) {
    const { bridge } = serviceContainer;

    const txnHashArr = useSelector((state) => state.general.txnHashArr);
    const receiver = convert(useSelector((state) => state.general.receiver));

    const approved = useSelector((state) => state.general.approved);
    const _to = useSelector((state) => state.general.to);
    const from = useSelector((state) => state.general.from.key);
    const _from = useSelector((state) => state.general.from);
    const bigNumberFees = useSelector((state) => state.general.bigNumberFees);
    const testnet = useSelector((state) => state.general.testNet);
    const staging = useSelector((state) => state.general.staging);

    const isInvalid = useSelector((state) => state.general.isInvalid);

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
        if (!receiver) {
            dispatch(setPasteDestinationAlert(true));
        } else if (selectedNFTList.length < 1) {
            dispatch(setSelectNFTAlert(true));
        } else if (!approved) {
            dispatch(setNoApprovedNFTAlert(true));
        } else if (!isInvalid) {
            // console.log(isInvalid)
        } else if (!loading && approved) {
            setLoading(true);
            dispatch(setTransferLoaderModal(true));

            for (let index = 0; index < selectedNFTList.length; index++) {
                if (from === "VeChain" || from === "TON") {
                    await sendEach(selectedNFTList[index], index);
                } else {
                    sendEach(selectedNFTList[index], index);
                }
                return stop;
            }
        }
    };

    const sendEach = async (nft) => {
        try {
            const [fromChain, toChain] = await Promise.all([
                bridge.getChain(_from.nonce),
                bridge.getChain(_to.nonce),
            ]);

            const unstoppabledomain = await getFromDomain(receiver, toChain);
            if (unstoppabledomainSwitch(unstoppabledomain)) return;

            const { result, mintWith } = await fromChain.transfer({
                toChain,
                nft,
                receiver: unstoppabledomain || receiver,
                fee: bigNumberFees,
                discountLeftUsd,
            });
            let mw = mintWith || undefined;
            if (!mintWith) {
                mw = mintWith
                    ? mintWith
                    : testnet
                    ? testnetSecretMintWith
                    : staging
                    ? stagingSecretMintWith
                    : mainnetSecretMintWith;
            }
            if (txnHashArr[0] && !result) {
                dispatch(setTxnHash({ txn: "failed", nft }));
            } else if (result) {
                const resultObject = fromChain.handlerResult(result);
                notifyExplorer(_from.nonce, resultObject.hash);
                dispatch(setTxnHash({ txn: resultObject, nft, mw }));
            }
        } catch (e) {
            console.log(e, "eee");
            dispatch(setError(e));
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
