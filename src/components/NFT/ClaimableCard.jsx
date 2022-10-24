import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    removeAlgorandClaimable,
    setApproveLoader,
    setNFTSetToggler,
    setTransferLoaderModal,
} from "../../store/reducers/generalSlice";
import { getFactory } from "../../wallet/helpers";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { algoConnector } from "../../wallet/connectors.js";
import PropTypes from "prop-types";

export default function ClaimableCard({ nft }) {
    const dispatch = useDispatch();
    const algorandAccount = useSelector(
        (state) => state.general.algorandAccount
    );
    const algorandWallet = useSelector((state) => state.general.algorandWallet);
    const MyAlgo = useSelector((state) => state.general.MyAlgo);
    const testnet = useSelector((state) => state.general.testNet);
    const [isOptin, setIsOptin] = useState();
    const OFF = { opacity: 0.6, pointerEvents: "none" };

    const getAlgorandWalletSigner = async () => {
        const base = new MyAlgoConnect();
        if (algorandWallet) {
            try {
                const factory = await getFactory();
                const inner = await factory.inner(15);
                const signer = await inner.walletConnectSigner(
                    algoConnector,
                    algorandAccount
                );
                return signer;
            } catch (error) {
                console.log(
                    error.data
                        ? error.data.message
                        : error.data
                        ? error.data.message
                        : error.message
                );
            }
        } else if (MyAlgo) {
            const factory = await getFactory();
            const inner = await factory.inner(15);
            const signer = inner.myAlgoSigner(base, algorandAccount);
            return signer;
        } else {
            const signer = {
                address: algorandAccount,
                algoSigner: window.AlgoSigner,
                ledger: testnet ? "TestNet" : "MainNet",
            };
            return signer;
        }
    };

    const checkIfOptIn = async () => {
        const factory = await getFactory();
        const algorand = await factory.inner(15);
        const isOpted = await algorand.isOptIn(algorandAccount, nft.nftId);
        setIsOptin(isOpted);
    };

    const optIn = async () => {
        dispatch(setApproveLoader(true));
        const factory = await getFactory();
        const algorand = await factory.inner(15);
        let isOpted;
        try {
            isOpted = await algorand.isOptIn(algorandAccount, nft.nftId);
        } catch (error) {
            console.log(error);
            dispatch(setApproveLoader(false));
        }

        if (!isOpted) {
            const signer = await getAlgorandWalletSigner();
            try {
                const optin = await algorand.optInNft(signer, nft);
                if (optin) {
                    setIsOptin(true);
                }
            } catch (error) {
                console.log(error);
                dispatch(setApproveLoader(false));
            }
        } else {
            setIsOptin(true);
        }
        dispatch(setApproveLoader(false));
    };

    const claim = async () => {
        // debugger
        dispatch(setTransferLoaderModal(true));
        if (isOptin) {
            const factory = await getFactory();
            const algorand = await factory.inner(15);
            const signer = await getAlgorandWalletSigner();
            try {
                const c = await algorand.claimNft(signer, nft);
                if (c) {
                    dispatch(removeAlgorandClaimable(nft.nftId));
                }
                dispatch(setNFTSetToggler());
            } catch (err) {
                dispatch(setTransferLoaderModal(false));
                console.log(err);
            }
        }
        dispatch(setTransferLoaderModal(false));
    };

    useEffect(() => {
        checkIfOptIn();
    }, []);

    return (
        <div className="image__wrapper claimable-card">
            <div className="claimable-card__wrapper">
                <div className="claimable-card__text">
                    The NFT is not claimed
                </div>
                <div
                    style={isOptin ? OFF : {}}
                    onClick={optIn}
                    className="not-whitelisted__button"
                >
                    Optin
                </div>
                <div
                    style={isOptin ? {} : OFF}
                    onClick={claim}
                    className="not-whitelisted__button"
                >
                    Claim
                </div>
            </div>
        </div>
    );
}
ClaimableCard.propTypes = {
    nft: PropTypes.object,
};
