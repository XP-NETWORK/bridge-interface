import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { XPDecentralizedUtility } from "../../utils/xpDecentralizedUtility";
import { useDispatch, useSelector } from "react-redux";
import { setQuietConnection } from "../../store/reducers/signersSlice";
import {
  setError,
  setIsAssociated,
  setSuccess,
  setTransferLoaderModal,
} from "../../store/reducers/generalSlice";
import { connectWalletByChain } from "../../utils";
import { useWeb3React } from "@web3-react/core";
import { v3_ChainId, v3_getChainNonce } from "../../utils/chainsTypes";

export default function ClaimNFTViaHashModal({ handleClose, bridge }) {
  const xpDecentralizedUtility = new XPDecentralizedUtility();

  const [hash, setHash] = useState("");
  const dispatch = useDispatch();

  const origin = useSelector((state) => state.general.from);
  // const dest = useSelector((state) => state.general.to);
  const isAssociated = useSelector((state) => state.general.isAssociated);
  const transferModalLoader = useSelector(
    (state) => state.general.transferModalLoader
  );
  const network = useSelector((state) => state.general.testNet);

  const [nftData, setNFTData] = useState(null);

  const { activate } = useWeb3React();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setSuccess(null));
    }, 3000);
  }, []);

  useEffect(() => {
    hash && origin?.nonce && getNFTData();
  }, [hash, origin]);

  const getNFTData = async () => {
    const originChain = await xpDecentralizedUtility.getChainFromFactory(
      v3_ChainId[origin.nonce].name
    );
    const res = await xpDecentralizedUtility.getClaimData(origin.nonce, originChain, hash);
    setNFTData(res);
  };

  const claimHandler = async () => {
    if (!nftData) {
      return;
    }
    dispatch(setQuietConnection(true));
    dispatch(setTransferLoaderModal(true));

    try {
      const originChainIdentifier = await bridge.getChain(origin.nonce);

      const targetChainIdentifier = await bridge.getChain(
        v3_getChainNonce[nftData.destinationChain]
      );

      await connectWalletByChain(
        nftData?.destinationChain,
        v3_getChainNonce[nftData?.destinationChain],
        network,
        bridge,
        activate
      );

      if (nftData.destinationChain === "HEDERA" && !isAssociated) {
        console.log("inside association");
        await xpDecentralizedUtility.associateTokens(targetChainIdentifier);
        dispatch(setIsAssociated(true));
        dispatch(setTransferLoaderModal(false));
        return;
      }

      const claimed = await xpDecentralizedUtility.claimNFT_V3(
        originChainIdentifier,
        hash,
        bridge
      );

      console.log({ claimed });
      setHash("");
      dispatch(setTransferLoaderModal(false));
      dispatch(setSuccess("NFT Claimed Successfully"));
    } catch (e) {
      console.log("in catch block", e);
      dispatch(setError({ message: e.message }));
      setHash("");
      dispatch(setTransferLoaderModal(false));
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Claim NFT</Modal.Title>
        <span className="CloseModal" onClick={handleClose}>
          <div className="close-modal"></div>
        </span>
      </Modal.Header>
      <Modal.Body>
        <div
          className={
            "destination__address px-5 py-3 d-flex flex-column justify-content-around align-items-center"
          }
        >
          <p>Claim your NFT by pasting the tx hash</p>
          <input
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            type="text"
            placeholder="Paste tx hash here"
            className={"reciverAddress spaced-item"}
          />
          {!hash ? (
            ""
          ) : !nftData ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <button
              className="changeBtn ClaimInDestination d-flex justify-content-center m-0 ml-3 text-nowrap"
              onClick={claimHandler}
              disabled={!hash || transferModalLoader}
            >
              {nftData.destinationChain === "HEDERA" && !isAssociated
                ? "Associate Token"
                : "Claim"}
              {transferModalLoader && (
                <Spinner animation="border" size="sm" className="ml-3" />
              )}
            </button>
          )}
        </div>
      </Modal.Body>
    </>
  );
}
