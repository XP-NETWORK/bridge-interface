import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { XPDecentralizedUtility } from "../../utils/xpDecentralizedUtility";
import { useDispatch, useSelector } from "react-redux";
import { setQuietConnection } from "../../store/reducers/signersSlice";
import { setError, setIsAssociated, setTransferLoaderModal } from "../../store/reducers/generalSlice";
import { connectHashPack } from "./HederaWallet/hederaConnections";
import { sleep } from "../../utils";

export default function ClaimNFTViaHashModal({ handleClose, bridge }) {
  const [hash, setHash] = useState("");
  const dispatch = useDispatch();


  const origin = useSelector((state) => state.general.from);
  const dest = useSelector((state) => state.general.to);
  const isAssociated = useSelector((state) => state.general.isAssociated);
  const transferModalLoader = useSelector(
    (state) => state.general.transferModalLoader
  );
  const network = useSelector((state) => state.general.testNet);

  const claimHandler = async () => {
    dispatch(setQuietConnection(true));
    dispatch(setTransferLoaderModal(true));

    await connectHashPack(network);
    await sleep(10000);

    try {
      const originChainIdentifier = await bridge.getChain(origin.nonce);
      const targetChainIdentifier = await bridge.getChain(dest.nonce);

      const xpDecentralizedUtility = new XPDecentralizedUtility();

      if (dest?.type === "Hedera" && !isAssociated) {
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
          <button
            className="changeBtn ClaimInDestination d-flex justify-content-center m-0 ml-3 text-nowrap"
            onClick={claimHandler}
            disabled={!hash || transferModalLoader}
          >
            {dest?.type !== "Hedera"
              ? "Claim"
              : isAssociated
              ? "Claim"
              : "Associate Token"}
            {transferModalLoader && (
              <Spinner animation="border" size="sm" className="ml-3" />
            )}
          </button>
        </div>
      </Modal.Body>
    </>
  );
}
