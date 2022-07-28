import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    setImportModal,
    addImportedNFTtoNFTlist,
    setError,
    setNFTList,
    setBigLoader,
    setSecretLoggedIn,
} from "../../../store/reducers/generalSlice";
import { CHAIN_INFO } from "../../values";
import axios from "axios";
import "./importNFTModal.css";
import EVMBody from "./EVMBody";
import CosmosBody from "./CosmosBody";
import { getFactory } from "../../../wallet/helpers";
import { Chain } from "xp.network";
import { useDidUpdateEffect } from "../../Settings/hooks";

const SecretAuth = ({ nfts, setLogdIn, refreshSecret, render }) => {
    const dispatch = useDispatch();

    const [importBlocked, setImportBlocked] = useState(false);
    const [viewKey, setViewKey] = useState("MyViewingKey#1");
    //MyViewingKey#1
    const [contract, setContract] = useState(
        "secret146snljq0kjsva7qrx4am54nv3fhfaet7srx4n2"
    );
    //secret146snljq0kjsva7qrx4am54nv3fhfaet7srx4n2
    /// const [error, setError] = useState("");

    const { secretAccount, checkWallet } = useSelector(
        ({ general: { secretAccount, checkWallet } }) => ({
            secretAccount,
            checkWallet,
        })
    );

    const fetchSecretNfts = async () => {
        try {
            setImportBlocked(true);
            const factory = await getFactory();
            const secret = await factory.inner(Chain.SECRET);
            const secretNFTs = await secret.nftList(
                checkWallet || secretAccount,
                viewKey,
                contract
            );
            dispatch(addImportedNFTtoNFTlist(secretNFTs));

            setLogdIn(true);
        } catch (error) {
            dispatch(setError(error.message));
            console.log(error);
        }
        setImportBlocked(false);
        dispatch(setBigLoader(false));
    };

    useDidUpdateEffect(async () => {
        await fetchSecretNfts();
    }, [refreshSecret]);

    return (
        <div
            style={render ? {} : { display: "none" }}
            className="nftListBox withSecret"
        >
            <div className="secretAuth">
                <h3>Private ownership </h3>
                <p>
                    Your assets are protected. Please enter contract address and
                    viewing key below.
                </p>
                <div className="fieldsWrapper">
                    <input
                        type="text"
                        placeholder="Paste contract address"
                        value={contract}
                        onChange={(e) => setContract(e.target.value)}
                    />
                    <div className="inputWrapper">
                        <input
                            type="text"
                            placeholder="Enter viewing key"
                            value={viewKey}
                            onChange={(e) => setViewKey(e.target.value)}
                        />
                    </div>
                </div>
                <div
                    className="transfer-button"
                    onClick={fetchSecretNfts}
                    style={
                        !importBlocked
                            ? {}
                            : { opacity: 0.6, pointerEvents: "none" }
                    }
                >
                    Show assets
                </div>
            </div>
        </div>
    );
};
//sdfsdfsdf
export const withSecretAuth = (Wrapped) => (props) => {
    const [logdIn, setLogdIn] = useState(false);
    const secretLoggedIn = useSelector((state) => state.general.secretLoggedIn);
    const { from, nfts } = useSelector(({ general: { from, NFTList } }) => ({
        from,
        nfts: NFTList,
    }));

    const dispatch = useDispatch();
    const refreshSecret = useSelector((state) => state.general.refreshSecret);

    return (
        <div>
            <SecretAuth
                refreshSecret={refreshSecret}
                nfts={nfts}
                setLogdIn={(val) => dispatch(setSecretLoggedIn(val))}
                render={!secretLoggedIn && from.text === "Secret"}
            />
            <div
                style={
                    !secretLoggedIn && from.text === "Secret"
                        ? { display: "none" }
                        : {}
                }
            >
                <Wrapped {...props} />
            </div>
        </div>
    );
};

export default SecretAuth;
