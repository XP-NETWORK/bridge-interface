import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import "./SuccessNFT.css";
import TxStatus from "./TxStatus";

import { StringShortener } from "../../../utils";
import Tooltip from "../AccountModal/Tooltip";

import { withServices } from "../../App/hocs/withServices";

export default withServices(function TransferredNft({
    nft,
    links,
    serviceContainer,
    receiver,
}) {
    const { bridge } = serviceContainer;
    const { image, animation_url, txn, name, mintWith } = nft;
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);

    const txnHashArr = useSelector((state) => state.general.txnHashArr);

    const [txnStatus, setTxnStatus] = useState("pending");
    const [toChain, setToChain] = useState(null);
    const [hashes, setHashes] = useState({
        depHash: "",
        destHash: "",
    });

    const depText = window.innerWidth <= 600 ? "Dep" : "Departure Hash";
    const desText = window.innerWidth <= 600 ? "Des" : "Destination Hash";

    const checkStatus = () => {
        // eslint-disable-next-line no-debugger
        // debugger;

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
                    (from.type === "Elrond" &&
                        new RegExp(`^${tx.tokenId}`).test(t)) ||
                    (from.type === "TON" && address === tx.contract)
                ) {
                    if (txnStatus !== "Completed")
                        setTxnStatus(tx?.status?.toLowerCase());

                    setHashes({
                        depHash: tx.hash,
                        destHash: toChain.adaptDestHash(tx.toHash, receiver),
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        bridge.getChain(to.nonce).then((chain) => setToChain(chain));
    }, []);

    useEffect(() => {
        toChain && checkStatus();
    }, [txnHashArr, toChain]);

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
                        {hashes.destHash
                            ? StringShortener(hashes.destHash, 3)
                            : "..."}
                    </a>
                </div>
            </div>
            {mintWith && (
                <div className="transferred-nft-hashes secret-hashes">
                    <div className="chain-hash">
                        <span>Collection address:</span>
                        <span>
                            <a
                                href={`${
                                    typeof links.addressTo === "function"
                                        ? links.addressTo(mintWith)
                                        : links.addressTo + mintWith
                                }`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {StringShortener(mintWith, 8)}
                            </a>
                        </span>
                        <Tooltip text={mintWith} />
                    </div>
                </div>
            )}
        </div>
    );
});
