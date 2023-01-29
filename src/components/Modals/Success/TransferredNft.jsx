import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./SuccessNFT.css";
import TxStatus from "./TxStatus";

import { StringShortener } from "../../../wallet/helpers";

export default function TransferredNft({ nft, links }) {
  const { image, animation_url, txn, name } = nft;
  const from = useSelector((state) => state.general.from);

  const txnHashArr = useSelector((state) => state.general.txnHashArr);

  const [txnStatus, setTxnStatus] = useState("pending");
  const [hashes, setHashes] = useState({
    depHash: "",
    destHash: "",
  });

  const depText = window.innerWidth <= 600 ? "Dep" : "Departure Hash";
  const desText = window.innerWidth <= 600 ? "Des" : "Destination Hash";

  const checkStatus = () => {
    const { tokenId, token_id, uri, address } = nft.native;

    const t = tokenId || token_id;

    try {
      console.log(nft.native);
      console.log(txnHashArr);
      for (const tx of txnHashArr) {
        if (tx === "failed") {
          setTxnStatus("failed");
        } else if (
          uri === tx.nftUri ||
          String(t) === String(tx.tokenId) ||
          (from.type === "Elrond" && new RegExp(`^${tx.tokenId}`).test(t)) ||
          (from.type === "TON" && address === tx.contract)
        ) {
          if (txnStatus !== "Completed")
            setTxnStatus(tx?.status?.toLowerCase());

          setHashes({
            depHash: tx.hash,
            destHash: tx.toHash,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkStatus();
  }, [txnHashArr]);

  const depHash = hashes?.depHash || txn?.hash;

  return (
    <div className="success-nft-info__wrapper">
      <div className="transferred-nft">
        <div className="nft-image-name">
          {animation_url ? (
            <video src={animation_url}></video>
          ) : (
            <img src={image} alt={name} />
          )}
          <div className="transferred-nft-name">{name}</div>
        </div>

        <TxStatus status={txn ? txnStatus : "processing"} />
      </div>

      <div className="transferred-nft-hashes">
        <div className="chain-hash">
          <span>{depText}:</span>
          <a
            target="_blank"
            rel="noreferrer"
            href={`${
              typeof links.txFrom === "function"
                ? links.txFrom(depHash)
                : links.txFrom + depHash
            }`}
          >
            {txn?.hash
              ? StringShortener(txn?.hash, 3)
              : hashes.depHash
                ? StringShortener(hashes.depHash, 3)
                : "..."}
          </a>
        </div>
        <div className="chain-hash">
          <span>{desText}:</span>
          <a
            target="_blank"
            rel="noreferrer"
            href={
              typeof links.txTo === "function"
                ? links.txTo(hashes.destHash)
                : links.txTo + hashes.destHash
            }
          >
            {hashes.destHash ? StringShortener(hashes.destHash, 3) : "..."}
          </a>
        </div>
      </div>
    </div>
  );
}
TransferredNft.propTypes = {
  nft: PropTypes.object,
  testnet: PropTypes.bool,
  links: PropTypes.object,
};
