import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CHAIN_INFO, TESTNET_CHAIN_INFO } from "../values";
import { chainsConfig } from "../values";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { algoConnector } from "../../wallet/connectors";
import BigNumber from "bignumber.js";

import {
    getFactory,
    setClaimablesAlgorand,
    checkIfOne1,
    convertOne1,
    convert,
} from "../../wallet/helpers";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TempleWallet } from "@temple-wallet/dapp";
import { ExtensionProvider } from "@elrondnetwork/erdjs/out";
import { ethers } from "ethers";
import {
    setError,
    setNFTsToWhitelist,
    setNoApprovedNFTAlert,
    setTransferLoaderModal,
    setTxnHash,
    setURLToOptIn,
} from "../../store/reducers/generalSlice";
import {
    setPasteDestinationAlert,
    setSelectNFTAlert,
} from "../../store/reducers/generalSlice";
import * as thor from "web3-providers-connex";
import { Driver, SimpleNet, SimpleWallet } from "@vechain/connex-driver";
import { Framework } from "@vechain/connex-framework";
import Connex from "@vechain/connex";
import Web3 from "web3";
import { getFromDomain } from "../../services/resolution";

export default function ButtonToTransfer() {
    const kukaiWallet = useSelector((state) => state.general.kukaiWallet);
    const kukaiWalletSigner = useSelector(
        (state) => state.general.kukaiWalletSigner
    );
    const txnHashArr = useSelector((state) => state.general.txnHashArr);
    const receiver = useSelector((state) => state.general.receiver);
    const receiverAddress = convert(receiver);
    const approved = useSelector((state) => state.general.approved);
    const testnet = useSelector((state) => state.general.testNet);
    const to = useSelector((state) => state.general.to.key);
    const _to = useSelector((state) => state.general.to);
    const from = useSelector((state) => state.general.from.key);
    const _from = useSelector((state) => state.general.from);
    const bigNumberFees = useSelector((state) => state.general.bigNumberFees);
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    const algorandWallet = useSelector((state) => state.general.AlgorandWallet);
    const MyAlgo = useSelector((state) => state.general.MyAlgo);
    const algorandAccount = useSelector((s) => s.general.algorandAccount);
    const maiarProvider = useSelector((state) => state.general.maiarProvider);
    const templeSigner = useSelector((state) => state.general.templeSigner);
    const keplrWallet = useSelector((state) => state.general.keplrWallet);
    const account = useSelector((state) => state.general.account);
    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );
    const nfts = useSelector((state) => state.general.NFTList);
    const WCProvider = useSelector((state) => state.general.WCProvider);
    const sync2Connex = useSelector((state) => state.general.sync2Connex);
    const bitKeep = useSelector((state) => state.general.bitKeep);
    const hederaSigner = useSelector((state) => state.signers.signer);
    const chainConfig = useSelector(
        (state) => state.signers.chainFactoryConfig
    );
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

    const getSigner = async () => {
        let signer;
        try {
            if (from === "Secret") {
                return keplrWallet;
            } else if (from === "Tezos") {
                return templeSigner || kukaiWalletSigner;
            } else if (from === "Algorand") {
                signer = await getAlgorandWalletSigner();
                return signer;
            } else if (from === "Elrond")
                return maiarProvider || ExtensionProvider.getInstance();
            else if (from === "VeChain") {
                const provider = thor.ethers.modifyProvider(
                    new ethers.providers.Web3Provider(
                        new thor.ConnexProvider({
                            connex: new Connex({
                                node: testnet
                                    ? "https://testnet.veblocks.net/"
                                    : "https://sync-mainnet.veblocks.net",
                                network: testnet ? "test" : "main",
                            }),
                        })
                    )
                );
                const signer = await provider.getSigner(account);
                return signer;
            } else if (from === "Secret") {
                const signer = window.getOfflineSigner(
                    testnet
                        ? CHAIN_INFO[from.text].tnChainId
                        : CHAIN_INFO[from.text].chainId
                );
                return signer;
            } else {
                let provider;

                if (bitKeep) {
                    provider = new ethers.providers.Web3Provider(
                        window.bitkeep.ethereum
                    );
                    signer = provider.getSigner(account);
                } else {
                    provider = new ethers.providers.Web3Provider(
                        WCProvider?.walletConnectProvider || window.ethereum
                    );
                    signer = provider.getSigner(account);
                }
                return signer;
            }
        } catch (error) {
            console.error(error);
            return;
        }
    };

    const unstoppabledomainSwitch = (unstoppabledomain) => {
        let stop;
        if (unstoppabledomain) {
            switch (unstoppabledomain) {
                case "undefined":
                    dispatch(
                        setError(
                            "Your domain does not explicitly support the chain you selected."
                        )
                    );
                    dispatch(dispatch(setTransferLoaderModal(false)));
                    setLoading(false);
                    stop = true;
                    break;
                case "notEVM":
                    dispatch(
                        setError(
                            "Domain names are currently not supported for Non-EVM chains."
                        )
                    );
                    dispatch(dispatch(setTransferLoaderModal(false)));
                    setLoading(false);
                    stop = true;
                    break;
                case "invalid":
                    dispatch(
                        setError(
                            "Domain does not exist. Please, check the spelling."
                        )
                    );
                    dispatch(dispatch(setTransferLoaderModal(false)));
                    setLoading(false);
                    stop = true;
                    break;
                default:
                    break;
            }
        }
        return stop;
    };

    const sendEach = async (nft, index) => {
        const signer = await getSigner();
        const toNonce = CHAIN_INFO[to].nonce;
        const fromNonce = CHAIN_INFO[from].nonce;
        const nftSmartContract = nft.native.contract;
        const unstoppabledomain = await getFromDomain(receiver, _to);
        const stop = unstoppabledomainSwitch(unstoppabledomain);
        if (stop) return;
        let factory;
        let toChain;
        let fromChain;
        let result;
        try {
            const tokenId =
                nft.native &&
                "tokenId" in nft.native &&
                nft.native.tokenId.toString();
            if (from === "Tron") {
                factory = await getFactory();
                const contract = nftSmartContract.toLowerCase();
                const wrapped = await factory.isWrappedNft(nft, fromNonce);
                let mintWidth;
                if (!wrapped) {
                    mintWidth = await factory.getVerifiedContract(
                        contract,
                        toNonce,
                        fromNonce,
                        tokenId && !isNaN(Number(tokenId)) ? tokenId : undefined
                    );
                }
                if (mintWidth.length < 1 && from.type === "Secret") {
                    const contractAddress =
                        chainConfig?.secretParams?.bridge?.contractAddress;
                    const codeHash =
                        chainConfig?.secretParams?.bridge?.codeHash;
                    mintWidth = `${contractAddress}${codeHash}`;
                }
                toChain = await factory.inner(chainsConfig[to].Chain);
                fromChain = await factory.inner(chainsConfig[from].Chain);
                result = await factory.transferNft(
                    fromChain,
                    toChain,
                    nft,
                    undefined,
                    receiverAddress || receiver,
                    bigNumberFees,
                    Array.isArray(mintWidth) ? mintWidth[0] : mintWidth
                );
                console.debug("Transfer result: ", result, "index: ", index);
                dispatch(dispatch(setTransferLoaderModal(false)));
                setLoading(false);
                dispatch(setTxnHash({ txn: result, nft }));
            } else {
                debugger;
                factory = await getFactory();
                const contract =
                    nft.collectionIdent || nftSmartContract.toLowerCase();
                const wrapped = await factory.isWrappedNft(nft, fromNonce);
                let mintWidth;
                if (!wrapped) {
                    mintWidth = await factory.getVerifiedContract(
                        contract,
                        toNonce,
                        fromNonce,
                        tokenId && !isNaN(Number(tokenId)) ? tokenId : undefined
                    );
                }
                if (
                    (_from.type === "EVM" || _from.type === "Elrond") &&
                    !testnet
                ) {
                    if (mintWidth?.length < 1 || !mintWidth) {
                        dispatch(setError("An error has occurred"));
                        dispatch(dispatch(setTransferLoaderModal(false)));
                        setLoading(false);
                        if (txnHashArr.length) {
                            dispatch(setTxnHash({ txn: "failed", nft }));
                        }
                        return;
                    }
                }
                toChain = await factory.inner(chainsConfig[to].Chain);
                fromChain = await factory.inner(chainsConfig[from].Chain);
                nft.native.amount
                    ? (result = await factory.transferSft(
                          fromChain,
                          toChain,
                          nft,
                          from === "Hedera" ? hederaSigner : signer,
                          receiverAddress || unstoppabledomain || receiver,
                          new BigNumber(nft.amountToTransfer),
                          bigNumberFees,
                          Array.isArray(mintWidth) ? mintWidth[0] : mintWidth
                      ))
                    : (result = await factory.transferNft(
                          fromChain,
                          toChain,
                          nft,
                          from === "Hedera" ? hederaSigner : signer,
                          receiverAddress || unstoppabledomain || receiver,
                          bigNumberFees,
                          Array.isArray(mintWidth) ? mintWidth[0] : mintWidth
                      ));
                // console.log("result", result);
                result =
                    from === "Algorand" || from === "Tezos"
                        ? { hash: result }
                        : result;
                dispatch(dispatch(setTransferLoaderModal(false)));
                setLoading(false);
                dispatch(setTxnHash({ txn: result, nft }));
            }
        } catch (err) {
            console.error("This is error in sendeach: ", err);
            setLoading(false);
            dispatch(dispatch(setTransferLoaderModal(false)));
            const { data, message } = err;
            if (txnHashArr.length) {
                dispatch(setTxnHash({ txn: "failed", nft }));
            }
            if (message) {
                if (
                    message.includes("User cant pay the bills") ||
                    (data
                        ? data.message.includes("User cant pay the bills")
                        : false)
                )
                    dispatch(
                        setError(`You don't have enough funds to pay the fees`)
                    );
                else if (message) {
                    // if(message === "receiver hasn't opted-in to wrapped nft"){
                    // dispatch(setURLToOptIn(`${window.location}/?to_opt-in=true&testnet=${testnet}&nft_uri=${nft.uri}`))
                    // }
                    dispatch(
                        setError(err.data ? err.data.message : err.message)
                    );
                } else
                    dispatch(
                        setError(err.data ? err.data.message : err.message)
                    );
                return;
            } else {
                dispatch(setError(err.data ? err.data.message : err.message));
            }
            return;
        }
    };

    const sendAllNFTs = async () => {
        if (!receiver) {
            dispatch(setPasteDestinationAlert(true));
        } else if (selectedNFTList.length < 1) {
            dispatch(setSelectNFTAlert(true));
        } else if (!approved) {
            dispatch(setNoApprovedNFTAlert(true));
        } else if (!loading && approved) {
            setLoading(true);
            dispatch(setTransferLoaderModal(true));
            selectedNFTList.forEach((nft, index) => {
                sendEach(nft, index);
            });
        }
    };

    return (
        <div
            onClick={sendAllNFTs}
            className={
                !loading ? "transfer-button" : "transfer-button--disabled"
            }
        >
            {loading ? "Processing" : "Send"}
        </div>
    );
}
