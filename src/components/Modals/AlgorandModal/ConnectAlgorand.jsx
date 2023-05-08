import React, { useEffect, useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as Close } from "../../../assets/img/icons/close.svg";
import AlgoSignerIcon from "../../../assets/img/wallet/Algo Signer.png";
import { useDispatch, useSelector } from "react-redux";
import {
    setAlgoSigner,
    setAlgorandAccount,
    connectAlgorandWalletClaim,
    setMyAlgo,
    setAlgoAccountToClaim,
} from "../../../store/reducers/generalSlice";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import AlgorandIcon from "../../../assets/img/algorandwallet.svg";
import MyAlgoBlue from "../../../assets/img/wallet/MyAlgoBlue.svg";
import axios from "axios";
import PropTypes from "prop-types";

function ConnectAlgorand() {
    const dispatch = useDispatch();
    const [toOptIn, setToOptIn] = useState();
    const [accounts, setAccounts] = useState();
    const [nftToOptIn, setNFTToOptIn] = useState();

    const handleClose = () => {
        dispatch(connectAlgorandWalletClaim(false));
    };

    const algorandAccountToOptIn = useSelector(
        (state) => state.general.algorandAccountToClaim
    );
    const testnet = useSelector((state) => state.general.testNet);

    const onMyAlgo = useCallback(async () => {
        const myAlgoConnect = new MyAlgoConnect();
        try {
            const accountsSharedByUser = await myAlgoConnect.connect();

            dispatch(setAlgorandAccount(accountsSharedByUser[0].address));
            dispatch(setMyAlgo(true));
            handleClose();
        } catch (error) {
            console.log(error);
        }
    });

    const onAlgoSigner = async () => {
        if (window.AlgoSigner) {
            try {
                await window.AlgoSigner.connect();
                const algo = await window.AlgoSigner.accounts({
                    ledger: testnet ? "TestNet" : "MainNet",
                });
                setAccounts(algo);
                dispatch(setAlgoSigner(true));
            } catch (e) {
                console.error(e);
                return JSON.stringify(e, null, 2);
            }
        } else {
            console.log("Algo Signer not installed.");
        }
    };

    const setAlgoAccountToOptIn = (account) => {
        dispatch(setAlgoAccountToClaim(account["address"]));
    };

    // const optIn = async () => {
    //     ;
    //     dispatch(setTransferLoaderModal(true));
    //     const algorand = await factory.inner(15);
    //     // const accounts = await window.AlgoSigner.accounts({ledger:"TestNet"})
    //     const signer = {
    //         address: algorandAccountToOptIn,
    //         algoSigner: window.AlgoSigner,
    //         ledger: testnet ? "TestNet" : "MainNet",
    //     };
    //     try {
    //         const optin = await algorand.optInNft(signer, toOptIn);
    //         if (optin) {
    //             handleClose();
    //         }
    //     } catch (error) {
    //
    //         dispatch(setTransferLoaderModal(false));
    //     }
    //     dispatch(setTransferLoaderModal(false));
    // };

    useEffect(() => {
        const algoToOpt = new URLSearchParams(window.location.search).get(
            "to_opt-in"
        );
        const nftToOptIn = new URLSearchParams(window.location.search).get(
            "nft_uri"
        );
        setNFTToOptIn(nftToOptIn);

        if (algoToOpt && nftToOptIn && testnet) {
            dispatch(connectAlgorandWalletClaim(true));
        }
    }, []);

    useEffect(async () => {
        let nft;
        if (algorandAccountToOptIn) {
            try {
                const response = await axios.get(nftToOptIn);
                nft = {
                    image: response.data.image,
                    nftId: response.data.wrapped.assetID,
                    name: response.data.name,
                };
                setToOptIn(nft);
            } catch (error) {
                console.error(error);
            }
        }
    }, [algorandAccountToOptIn]);

    return (
        <>
            {!algorandAccountToOptIn ? (
                <>
                    <Modal.Header>
                        <Modal.Title style={{ minWidth: "max-content" }}>
                            Connect Wallet
                        </Modal.Title>
                        <span className="CloseModal" onClick={handleClose}>
                            <Close className="svgWidget" />
                        </span>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="walletListBox">
                            <div className="imgcontainer">
                                <img src={AlgorandIcon} />
                            </div>
                            <h3 className="walletalgotitle">
                                {!accounts
                                    ? "Connect an Algorand wallet to opt-in NFTs"
                                    : "Select Account"}
                            </h3>
                            {window.innerWidth < 600 && (
                                <div className="no-wallets">
                                    Claiming your nft is currently only
                                    available on desktop using MyAlgo or
                                    Algosigner
                                </div>
                            )}
                            {window.innerWidth > 600 && !accounts && (
                                <ul className="walletList scrollSty">
                                    <li
                                        onClick={onAlgoSigner}
                                        className="wllListItem algo"
                                    >
                                        <img
                                            src={AlgoSignerIcon}
                                            alt="Algor Signer Icon"
                                        />
                                        <p>Algo Signer</p>
                                    </li>
                                    {testnet && (
                                        <li
                                            onClick={onMyAlgo}
                                            className="wllListItem algo"
                                        >
                                            <img src={MyAlgoBlue} alt="" />{" "}
                                            MyAlgo
                                        </li>
                                    )}
                                </ul>
                            )}
                            {accounts && (
                                <ul className="algoSigner__accounts">
                                    {accounts?.map((account) => (
                                        <li
                                            onClick={() =>
                                                setAlgoAccountToOptIn(account)
                                            }
                                            className="algo-opt-in__button"
                                            key={`${account["address"]}`}
                                        >{`${account["address"].substring(
                                            0,
                                            4
                                        )}...${account["address"].substring(
                                            account["address"].length - 4
                                        )}`}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Modal.Body>
                </>
            ) : (
                <>
                    <Modal.Header>
                        <Modal.Title className="algo-opt-in__header">
                            Algorand Opt-in
                        </Modal.Title>
                        <span className="CloseModal" onClick={handleClose}>
                            <Close className="svgWidget" />
                        </span>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="walletListBox">
                            <div className="imgcontainer">
                                <img src={toOptIn?.image} alt="" />
                            </div>
                            <div className="algo-opt-in__name">
                                {toOptIn?.name}
                            </div>
                            <div className="algo-opt-in__btns">
                                <div
                                    onClick={handleClose}
                                    className="algo-opt-in__button"
                                >
                                    Skip for now
                                </div>
                                <div
                                    // onClick={optIn}
                                    className="algo-opt-in__button"
                                >
                                    Opt-in NFT
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </>
            )}
        </>
    );
}
ConnectAlgorand.propTypes = {
    nftToOptIn: PropTypes.object,
    testnet: PropTypes.bool,
};
export default ConnectAlgorand;
