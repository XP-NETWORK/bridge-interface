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
  setInvalidAddressAlert,
} from "../../store/reducers/generalSlice";
import { errorToLog, isALLNFTsApproved, sleep } from "../../utils";

import { withServices } from "../../components/App/hocs/withServices";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";
//import BigNumber from "bignumber.js";

import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { v3_bridge_mode } from "../values";

function Approval({ serviceContainer }) {
  const { bridge } = serviceContainer;
  const dispatch = useDispatch();
  const [finishedApproving, setFinishedApproving] = useState([]);
  const [approvedLoading, setApprovedLoading] = useState();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const account = useSelector((state) => state.general.account);
  let isInvalidAddress = useSelector((state) => state.general.isInvalid);

  const selectedNFTList = useSelector((state) => state.general.selectedNFTList);
  const approvedNFTList = useSelector((state) => state.general.approvedNFTList);
  const approved = useSelector((state) => state.general.approved);
  const receiver = useSelector((state) => state.general.receiver);

  const bigNumberFees = useSelector((state) => state.general.bigNumberFees);

  const factory = ChainFactory(ChainFactoryConfigs.TestNet());

  const approveEach = async (nft, index) => {
    const arr = new Array(index + 1).fill(0);
    const fromChain = await bridge.getChain(from.nonce);

    try {
      const { tokenId, contract, chainId } = nft.native;
      const alreadyApproved = approvedNFTList.find(
        ({ native }) =>
          native.tokenId === tokenId &&
          native.contract === contract &&
          chainId === native.chainId
      );

      if (!alreadyApproved) {
        await fromChain.checkSigner();
        if (v3_bridge_mode) {
          const signer = fromChain.getSigner();
          const originChain = await factory.inner(
            fromChain?.chainParams?.v3_chainId
          );

          await originChain.approveNft(signer, tokenId, contract);
          await sleep(10000);
        } else {
          await fromChain.preTransfer(
            nft,
            to.nonce,
            bigNumberFees,
            /*new BigNumber(bigNumberFees)
                          .div(10)
                          .integerValue()
                          .toString(10)*/
            {
              to: Number(to.nonce),
              receiver: receiver.trim(),
            }
          );
        }
        dispatch(updateApprovedNFTs(nft));
        setFinishedApproving(arr);
      }
      handleGA4Event(googleAnalyticsCategories.Approve, `Approve success`);
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
    if (!receiver || receiver.length === 0 || receiver === "") {
      dispatch(setPasteDestinationAlert(true));
    } else if (!isInvalidAddress) {
      dispatch(setInvalidAddressAlert(true));
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
          approvedLoading ? { opacity: 0.6, pointerEvents: "none" } : {}
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
            style={approved ? { pointerEvents: "none" } : {}}
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
