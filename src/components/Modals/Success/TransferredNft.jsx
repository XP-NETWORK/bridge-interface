import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import "./SuccessNFT.css";
import TxStatus from "./TxStatus";

import { StringShortener, sleep } from "../../../utils";
import Tooltip from "../AccountModal/Tooltip";

import withChains from "../../NFTsBoard/hocs";
import { TIME } from "../../../constants/time";

//import { biz } from "../../values";

// @param hash: string
const evmTxStatus = async (provider, txHash) => {
  let foundedData = false;
  let status = null;
  while (!foundedData) {
    try {
      const txRecipt = await provider?.getTransactionReceipt(txHash);
      status = txRecipt?.status === 1;

      if (status) foundedData = true;
      else throw status;
    } catch (e) {
      console.log(`Retrying to tx status`, e);
      await sleep(TIME.FIVE_SECONDS);
    }
  }
  return status;
};

const TransferredNft = ({
  nft,
  links,
  serviceContainer,
  receiver,
  chainSpecificRender,
}) => {
  const { bridge } = serviceContainer;
  const {
    image,
    animation_url,
    txn,
    name,
    mintWith,
    tagetCanister,
    workarond_dest_hash,
  } = nft;
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const account = useSelector((state) => state.general.account);
  const txnHashArr = useSelector((state) => state.general.txnHashArr);

  const [txnStatus, setTxnStatus] = useState("pending");
  const [fromChain, setFromChain] = useState(null);
  const [toChain, setToChain] = useState(null);
  const [hashes, setHashes] = useState({
    depHash: "",
    destHash: "",
  });

  const depText = window.innerWidth <= 600 ? "Dep" : "Departure Hash";
  const desText = window.innerWidth <= 600 ? "Des" : "Destination Hash";

  const RenderClaimInDestination =
    chainSpecificRender?.RenderClaimInDestination;

  const checkStatus = () => {
    const { tokenId, token_id, uri, address } = nft.native;

    const t = tokenId || token_id;

    const transactionHash = nft.txn?.transactionHash || nft.txn?.hash;

    try {
      for (const tx of txnHashArr) {
        if (tx === "failed" || transactionHash === undefined) {
          setTxnStatus("failed");
        } else if (
          transactionHash === tx.transactionHash ||
          transactionHash === tx.hash ||
          uri === tx.nftUri ||
          String(t) === String(tx.tokenId) ||
          (from.type === "Elrond" && new RegExp(`^${tx.tokenId}`).test(t)) ||
          (from.type === "TON" && address === tx.contract)
        ) {
          if (
            txnStatus !== "Completed" &&
            from.type !== "Hedera" &&
            from.type !== "DFINITY" &&
            from.type !== "Tezos"
          ) {
            setTxnStatus(tx?.status?.toLowerCase());
          }
          if (to.type !== "DFINITY") {
            setHashes({
              depHash: tx.hash,
              destHash: toChain.adaptHashView(tx.toHash, receiver),
            });
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    bridge.getChain(to.nonce).then((chain) => setToChain(chain));
    bridge.getChain(from.nonce).then((chain) => setFromChain(chain));
  }, []);

  useEffect(() => {
    toChain && checkStatus();
  }, [txnHashArr, toChain]);

  const depHash = fromChain?.adaptHashView(
    hashes?.depHash || txn?.hash,
    account,
  );

  useEffect(() => {
    if (tagetCanister || workarond_dest_hash) {
      setTxnStatus("completed");

      workarond_dest_hash &&
        setHashes({
          destHash: toChain.adaptHashView(workarond_dest_hash, receiver),
        });
    }
  }, [tagetCanister, workarond_dest_hash]);

  useEffect(() => {
    if (
      from.type === "Hedera" ||
      from.type === "Tezos" ||
      from.type === "DFINITY"
    ) {
      setTxnStatus("completed");
    } else {
      evmTxStatus(txn.provider, txn.hash)
        .then((res) => {
          if (res) {
            setTxnStatus("completed");
          }
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
  }, []);

  const targetCollection = mintWith || tagetCanister;

  const v3BridgeTx = Boolean(
    depHash && fromChain?.v3Bridge && toChain?.v3Bridge,
  );
  const completed = Boolean(
    (to.type === "TON" && txnStatus === "completed") ||
      (to.type === "Hedera" && txnStatus === "completed") ||
      (v3BridgeTx && txnStatus !== "claimed") ||
      (to.type === "Tezos" && txnStatus === "completed") ||
      (to.type === "Cosmos" && txnStatus === "completed") ||
      (to.type === "EVM" && txnStatus === "completed") ||
      (to.type === "DFINITY" && txnStatus === "completed"),
  );

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
            {depHash ? StringShortener(depHash, 3) : "..."}
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

      {RenderClaimInDestination && completed && (
        <RenderClaimInDestination
          serviceContainer={serviceContainer}
          fromChain={from.nonce}
          toChain={to.nonce}
          hash={from.type === "DFINITY" ? txn?.hash : depHash}
          setDestHash={(hash) => {
            setHashes({
              ...hashes,
              destHash: toChain.adaptHashView(hash, receiver),
            });
            setTxnStatus("claimed");
          }}
          receiver={receiver}
        />
      )}

      {targetCollection && (
        <div className="transferred-nft-hashes secret-hashes">
          <div className="chain-hash">
            <span>Collection address:</span>
            <span>
              <a
                href={`${
                  typeof links.addressTo === "function"
                    ? links.addressTo(targetCollection)
                    : links.addressTo + targetCollection
                }`}
                target="_blank"
                rel="noreferrer"
              >
                {StringShortener(targetCollection, 8)}
              </a>
            </span>
            <Tooltip text={targetCollection} />
          </div>
        </div>
      )}
    </div>
  );
};

export default withChains(TransferredNft, { withDestinationChains: true });
