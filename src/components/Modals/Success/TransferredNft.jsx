import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { claimAlgorandPopup } from "../../../store/reducers/generalSlice";
import { setClaimablesAlgorand, getFactory } from "../../../wallet/helpers";
import TxStatus from "./TxStatus";
import { chainsConfig } from "../../values";

export default function TransferredNft({ nft }) {
    const { image, animation_url, txn, name, native } = nft;
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const algorandAccount = useSelector(
        (state) => state.general.algorandAccount
    );
    const dispatch = useDispatch();
    const txnHashArr = useSelector((state) => state.general.txnHashArr);
    const [txnStatus, setTxnStatus] = useState("pending");
    const [hashes, setHashes] = useState({
        depHash: "",
        destHash: "",
    });

    const depText = window.innerWidth <= 600 ? "Dep" : "Departure Hash";
    const desText = window.innerWidth <= 600 ? "Des" : "Destination Hash";

    const getSubstringValue = () => {
        if (window.innerWidth <= 320) return 3;
        else if (window.innerWidth <= 375) return 3;
        else return false;
    };

    const checkStatus = () => {
        // debugger
        for (const tx of txnHashArr) {
            if (nft.native.uri === tx.nftUri) {
                if (txnStatus !== "Completed")
                    setTxnStatus(tx?.status?.toLowerCase());

                setHashes({
                    depHash: tx.hash,
                    destHash: tx.toHash,
                });
            }
        }
    };

    useEffect(() => {
        checkStatus();
    }, [txnHashArr]);

    useEffect(async () => {
        if (to.key === "Algorand") {
            const claimables = await setClaimablesAlgorand(
                algorandAccount,
                true
            );
        }
    }, []);

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
                <TxStatus status={txn ? txnStatus : "failed"} />
            </div>

            <div className="transferred-nft-hashes">
                <div className="chain-hash">
                    <span>{depText}:</span>
                    <a
                        target="_blank"
                        href={`${chainsConfig[from.key]?.tx}${hashes?.depHash ||
                            txn.hash}`}
                    >
                        {txn?.hash
                            ? `${txn?.hash.substring(
                                  0,
                                  getSubstringValue() || 10
                              )}...${txn?.hash.substring(txn?.hash.length - 3)}`
                            : hashes.depHash
                            ? `${hashes?.depHash?.substring(
                                  0,
                                  getSubstringValue() || 10
                              )}...${hashes?.depHash?.substring(
                                  hashes?.depHash?.length - 3
                              )}`
                            : "..."}
                    </a>
                </div>
                <div className="chain-hash">
                    <span>{desText}:</span>
                    <a
                        target="_blank"
                        href={`${chainsConfig[to.key]?.tx}${hashes?.destHash}`}
                    >
                        {hashes.destHash
                            ? `${hashes?.destHash?.substring(
                                  0,
                                  getSubstringValue() || 10
                              )}...${hashes?.destHash?.substring(
                                  hashes?.destHash?.length - 3
                              )}`
                            : "..."}
                    </a>
                </div>
            </div>
        </div>
    );
}
