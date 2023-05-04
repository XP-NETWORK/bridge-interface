/* eslint-disable no-case-declarations, react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as InfLithComp } from "../../assets/img/icons/Inf.svg";

import {
    updateApprovedNFTs,
    setApproved,
    setApproveLoader,
    setError,
    setSelectNFTAlert,
    setPasteDestinationAlert,
} from "../../store/reducers/generalSlice";
import { errorToLog, isALLNFTsApproved } from "../../wallet/helpers";

import { withServices } from "../../components/App/hocs/withServices";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";

function Approval({ serviceContainer }) {
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();
    const [finishedApproving, setFinishedApproving] = useState([]);
    const [approvedLoading, setApprovedLoading] = useState();
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    //const testnet = useSelector((state) => state.general.testNet);
    const account = useSelector((state) => state.general.account);

    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );
    const approvedNFTList = useSelector(
        (state) => state.general.approvedNFTList
    );
    const approved = useSelector((state) => state.general.approved);
    const receiver = useSelector((state) => state.general.receiver);

    const bigNumberFees = useSelector((state) => state.general.bigNumberFees);
    const checkWallet = useSelector((state) => state.general.checkWallet);

    const approveEach = async (nft, index) => {
        const arr = new Array(index + 1).fill(0);
        try {
            const { tokenId, contract, chainId } = nft.native;
            const alreadyApproved = approvedNFTList.find(
                ({ native }) =>
                    native.tokenId === tokenId &&
                    native.contract === contract &&
                    chainId === native.chainId
            );

            if (!alreadyApproved) {
                const fromChain = await bridge.getChain(from.nonce);
                await fromChain.checkSigner();
                await fromChain.preTransfer(nft, bigNumberFees, {
                    to: Number(to.nonce),
                    receiver: receiver.trim(),
                });
                dispatch(updateApprovedNFTs(nft));
                setFinishedApproving(arr);
            }
            handleGA4Event(
                googleAnalyticsCategories.Approve,
                `Approve success`
            );
        } catch (e) {
            dispatch(setApproveLoader(false));
            setApprovedLoading(false);
            setFinishedApproving(arr);
            dispatch(setError(e));
            handleGA4Event(googleAnalyticsCategories.Approve, `Approve failed`);
            errorToLog({
                type: "Approve",
                walletAddress: account,
                time: new Date(),
                fromChain: from.text,
                toChain: to.text,
                message: e.data?.message || e.message,
                nfts: nft.native,
            });
        }
    };

    const approveAllNFTs = () => {
        if (!approvedLoading) {
            dispatch(setApproveLoader(true));
            setApprovedLoading(true);
            setFinishedApproving([]);
            handleGA4Event(
                googleAnalyticsCategories.Approve,
                `Approving ${selectedNFTList.length}`
            );
            selectedNFTList.forEach((nft, index) => {
                approveEach(nft, index);
            });
        }
    };

    const onClickHandler = async () => {
        if (!receiver) {
            dispatch(setPasteDestinationAlert(true));
        } else if (selectedNFTList.length < 1) {
            dispatch(setSelectNFTAlert(true));
        } else {
            approveAllNFTs();
        }
    };

    useEffect(() => {
        if (
            finishedApproving.length === selectedNFTList.length &&
            approvedLoading
        ) {
            setApprovedLoading(false);
            dispatch(setApproveLoader(false));
            setFinishedApproving([]);
        }

        if (selectedNFTList.length > 0) {
            dispatch(setApproved(isALLNFTsApproved()));
        } else {
            dispatch(setApproved(false));
            dispatch(setApproveLoader(false));
        }
    }, [selectedNFTList, approvedNFTList, finishedApproving]);

    return (
        <div className="approval">
            <div className="approval__header">
                <div className="approval__title">Approval</div>
                <div className="approval__inf">
                    {/* before */}
                    <InfLithComp className="svgWidget nftInfIcon" alt="info" />
                    {/* after */}
                </div>
            </div>
            <div
                style={
                    // selectedNFTList.length ?
                    approvedLoading
                        ? { opacity: 0.6, pointerEvents: "none" }
                        : {}
                    // : OFF
                }
                className="approveBtn"
            >
                Approve selected NFTs
                <div className="approveBtn">
                    <input
                        readOnly={true}
                        checked={approved || ""}
                        type="checkbox"
                        id="approveCheck"
                    />
                    <label
                        style={
                            approved || checkWallet
                                ? { pointerEvents: "none" }
                                : {}
                        }
                        onClick={onClickHandler}
                        htmlFor="approveCheck"
                    >
                        <span className="checkCircle"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default withServices(Approval);
