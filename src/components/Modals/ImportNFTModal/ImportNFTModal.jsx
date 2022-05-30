import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    setImportModal,
    addImportedNFTtoNFTlist,
} from "../../../store/reducers/generalSlice";
import { CHAIN_INFO } from "../../../components/values";
import axios from "axios";
import "./importNFTModal.css";

export default function ImportNFTModal() {
    const dispatch = useDispatch();
    const from = useSelector((state) => state.general.from);
    const account = useSelector((state) => state.general.account);
    const [validContract, setValidContract] = useState(NaN);
    const [contract, setContract] = useState();
    const [contractOnBlur, setContractOnBlur] = useState(false);
    const [tokenId, setTokenId] = useState();
    const [importBlocked, setImportBlocked] = useState(false);
    const [error, setError] = useState("");
    const validForm = contract?.length === 42 && tokenId;
    const chainNonce = CHAIN_INFO[from.text].nonce;
    const OFF = { opacity: 0.6, pointerEvents: "none" };

    const handleClose = () => {
        dispatch(setImportModal(false));
    };

    const handleContractChange = (value) => {
        setContract(value);
        if (value.length !== 42) {
            setValidContract(false);
        } else setValidContract(true);
    };
    //"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ";
    //"http://192.168.129.241:3000/nfts/nftCheck";
    const handleImport = async () => {
        debugger;
        const baseURL =
            "https://xp-network-check-nft.herokuapp.com/nfts/nftCheck";
        const _headers = {
            Accept: "*",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
        };
        try {
            setImportBlocked(true);
            setTimeout(() => {
                setImportBlocked(false);
            }, 10000);
            const imported = await axios({
                method: "post",
                url: baseURL,
                headers: _headers,
                data: JSON.stringify({
                    chainNonce,
                    tokenId,
                    contract,
                    address: account,
                }),
            });
            setImportBlocked(false);
            if (typeof imported.data === "object") {
                dispatch(addImportedNFTtoNFTlist(imported.data));
            } else setError(imported.data);
            dispatch(setImportModal(false));
        } catch (error) {
            setError(error.message);
            setImportBlocked(false);
            console.error(error);
        }
    };

    return (
        <>
            <Modal.Header className="border-0">
                <Modal.Title>Import NFT</Modal.Title>
                <span className="CloseModal">
                    <div onClick={handleClose} className="close-modal"></div>
                </span>
            </Modal.Header>
            <Modal.Body className="import-nft__body">
                {error && <div className="import-error">{error}</div>}
                <div className="import-nft__form">
                    <form action="">
                        <div>
                            <label htmlFor="contractAdd">
                                1. Paste contract address
                            </label>
                            <input
                                onBlur={() => setContractOnBlur(true)}
                                onChange={(e) =>
                                    handleContractChange(e.target.value)
                                }
                                type="text"
                                id="contractAdd"
                                name="contractAddress"
                                placeholder="0x..."
                                value={contract}
                                className={
                                    contractOnBlur && !validContract
                                        ? "contract__input--invalid"
                                        : "contract__input--valid"
                                }
                            />
                            <div
                                className={
                                    contractOnBlur && !validContract
                                        ? "contract--invalid"
                                        : "contract--valid"
                                }
                            >
                                Error contract address
                            </div>
                        </div>
                        <div>
                            <label htmlFor="tokeId">2. Paste Toked ID</label>
                            <input
                                onChange={(e) => setTokenId(e.target.value)}
                                type="text"
                                id="tokedId"
                                name="tokenId"
                                placeholder="Enter Token ID"
                                value={tokenId}
                            />
                        </div>
                        <div className="import-nft__buttons">
                            <div
                                onClick={handleImport}
                                style={validForm && !importBlocked ? {} : OFF}
                                className="btn-import"
                            >
                                Import
                            </div>
                            <div onClick={handleClose} className="btn-cancel">
                                Cancel
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </>
    );
}
//42
