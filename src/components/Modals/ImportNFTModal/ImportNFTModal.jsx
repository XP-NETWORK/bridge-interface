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
import EVMBody from "./EVMBody";
import CosmosBody from "./CosmosBody";
import { getFactory } from "../../../wallet/helpers";
import { Chain } from "xp.network";

export default function ImportNFTModal() {
    const dispatch = useDispatch();
    const from = useSelector((state) => state.general.from);
    const account = useSelector((state) => state.general.account);
    const secretAccount = useSelector(state => state.general.secretAccount)
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
        const baseURL = "https://indexnft.herokuapp.com/nfts/nftCheck";
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

    const importSecretNFTS = async () => {
        try {
            const factory = await getFactory();
        const secret = await factory.inner(Chain.SECRET);
        const secretNFTS = await secret.nftList(secretAccount, tokenId, contract)
        } catch (error) {
            
        }

    return (
        <>
            <Modal.Header className="border-0">
                <Modal.Title>Import NFT</Modal.Title>
                <span className="CloseModal">
                    <div onClick={handleClose} className="close-modal"></div>
                </span>
            </Modal.Header>
            {from?.type === "Cosmos" ? (
                <CosmosBody
                    validContract={validContract}
                    contract={contract}
                    contractOnBlur={contractOnBlur}
                    setContractOnBlur={setContractOnBlur}
                    tokenId={tokenId}
                    setTokenId={setTokenId}
                    importBlocked={importBlocked}
                    error={error}
                    validForm={validForm}
                    OFF={OFF}
                    handleClose={handleClose}
                    handleContractChange={handleContractChange}
                    handleImport={handleImport}
                />
            ) : (
                <EVMBody
                    validContract={validContract}
                    contract={contract}
                    contractOnBlur={contractOnBlur}
                    setContractOnBlur={setContractOnBlur}
                    tokenId={tokenId}
                    setTokenId={setTokenId}
                    importBlocked={importBlocked}
                    error={error}
                    validForm={validForm}
                    OFF={OFF}
                    handleClose={handleClose}
                    handleContractChange={handleContractChange}
                    handleImport={handleImport}
                />
            )}
        </>
    );
}
//42
