import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as InfLithComp } from "../../assets/img/icons/Inf.svg";
import { Chain } from "xp.network/dist/consts";
import { ethers } from "ethers";
import * as thor from "web3-providers-connex";
import { WalletConnectProvider, ExtensionProvider } from "@elrondnetwork/erdjs";
import {
    updateApprovedNFTs,
    setApproved,
    setApproveLoader,
    setError,
    setSelectNFTAlert,
    setPasteDestinationAlert,
} from "../../store/reducers/generalSlice";
import {
    errorToLog,
    getFactory,
    handleChainFactory,
    isALLNFTsApproved,
} from "../../wallet/helpers";
import { algoConnector } from "../../wallet/connectors";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import Connex from "@vechain/connex";
import { CHAIN_INFO } from "../values";
import BigNumber from "bignumber.js";

function Approval() {
    const dispatch = useDispatch();
    const [finishedApproving, setFinishedApproving] = useState([]);
    const [approvedLoading, setApprovedLoading] = useState();
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const testnet = useSelector((state) => state.general.testNet);
    const account = useSelector((state) => state.general.account);
    const templeSigner = useSelector((state) => state.general.templeSigner);
    const bitKeep = useSelector((state) => state.general.bitKeep);
    const hederaSigner = useSelector((state) => state.signers.signer);
    const algorandAccount = useSelector(
        (state) => state.general.algorandAccount
    );
    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );
    const approvedNFTList = useSelector(
        (state) => state.general.approvedNFTList
    );
    const approved = useSelector((state) => state.general.approved);
    const receiver = useSelector((state) => state.general.receiver);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const WCProvider = useSelector((state) => state.general.WCProvider);
    const maiarProvider = useSelector((state) => state.general.maiarProvider);

    const bigNumberFees = useSelector((state) => state.general.bigNumberFees);
    const algorandWallet = useSelector((state) => state.general.AlgorandWallet);
    const tezosAccount = useSelector((state) => state.general.tezosAccount);

    const MyAlgo = useSelector((state) => state.general.MyAlgo);
    const kukaiWallet = useSelector((state) => state.general.kukaiWallet);
    const kukaiWalletSigner = useSelector(
        (state) => state.general.kukaiWalletSigner
    );
    const keplrWallet = useSelector((state) => state.general.keplrWallet);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const secretAccount = useSelector((state) => state.general.secretAccount);
    const hederaAccount = useSelector((state) => state.general.hederaAccount);

    const wallet = () => {
        return (
            account ||
            algorandAccount ||
            tezosAccount ||
            elrondAccount ||
            secretAccount ||
            hederaAccount
        );
    };

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
                console.log(error.message);
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

    const approveEach = async (nft, signer, chain, index) => {
        const arr = new Array(index + 1).fill(0);
        const factory = await getFactory();
        const { tokenId, contract, chainId } = nft.native;
        const isInApprovedNFTs = approvedNFTList.filter(
            (n) =>
                n.native.tokenId === tokenId &&
                n.native.contract === contract &&
                chainId === n.native.chainId
        )[0];
        try {
            switch (from.type) {
                case "EVM":
                    if (!isInApprovedNFTs) {
                        await chain.approveForMinter(nft, signer);
                        dispatch(updateApprovedNFTs(nft));
                        setFinishedApproving(arr);
                    }
                    break;
                case "Cosmos":
                    await chain.preTransfer(keplrWallet, nft, new BigNumber(0));
                    dispatch(updateApprovedNFTs(nft));
                    setFinishedApproving(arr);
                    break;
                case "Algorand":
                    const c = await factory.inner(15);
                    await c.preTransfer(
                        await getAlgorandWalletSigner(),
                        nft,
                        bigNumberFees
                    );
                    dispatch(updateApprovedNFTs(nft));
                    setFinishedApproving(arr);
                    break;
                case "Tezos":
                    const tezos = await factory.inner(Chain.TEZOS);
                    await tezos.preTransfer(
                        templeSigner || kukaiWalletSigner,
                        nft
                    );
                    dispatch(updateApprovedNFTs(nft));
                    setFinishedApproving(arr);
                    break;
                case "VeChain":
                    await chain.preTransfer(signer, nft, bigNumberFees);
                    dispatch(updateApprovedNFTs(nft));
                    setFinishedApproving(arr);
                    break;
                case "Elrond":
                    const elrond = await factory.inner(Chain.ELROND);
                    await elrond.preTransfer(
                        maiarProvider || ExtensionProvider.getInstance(),
                        nft,
                        bigNumberFees
                    );
                    dispatch(updateApprovedNFTs(nft));
                    setFinishedApproving(arr);
                    break;
                default:
                    break;
            }
        } catch (error) {
            setFinishedApproving(arr);
            dispatch(setError(error));
            const date = new Date();
            const logBody = {
                type: "Approve",
                walletAddress: wallet(),
                time: date.toString(),
                fromChain: from.text,
                toChain: to.text,
                message: error,
                nfts: nft.native,
            };

            errorToLog(logBody);
            if (error.data) {
                console.log(error.data.message);
                dispatch(setError(error.data.message));
            } else console.log(error);
            dispatch(setError(error));
            console.log(error);
        }
    };

    // const approveEach = async (nft, signer, chain, index) => {
    //     const arr = new Array(index + 1).fill(0);
    //     const factory = await getFactory();

    //     if (
    //         from.type !== "Elrond" &&
    //         from.type !== "Algorand" &&
    //         from.type !== "Tezos" &&
    //         from.type !== "Cosmos"
    //     ) {
    //         try {
    //             const { tokenId, contract, chainId } = nft.native;
    //             const isInApprovedNFTs = approvedNFTList.filter(
    //                 (n) =>
    //                     n.native.tokenId === tokenId &&
    //                     n.native.contract === contract &&
    //                     chainId === n.native.chainId
    //             )[0];
    //             if (!isInApprovedNFTs) {
    //                 try {
    //                     const ap = await chain.approveForMinter(nft, signer);
    //                     dispatch(updateApprovedNFTs(nft));
    //                     setFinishedApproving(arr);
    //                 } catch (err) {
    //                     console.log(err);
    //                     setFinishedApproving(arr);
    //                     dispatch(setError(err));
    //                 }
    //             }
    //         } catch (error) {
    //             setFinishedApproving(arr);
    //             dispatch(setError(error));
    //             if (error.data) {
    //                 console.log(error.data.message);
    //                 dispatch(setError(error.data.message));
    //             } else console.log(error);
    //             dispatch(setError(error));
    //             console.log(error);
    //         }
    //     } else if (from.type === "Cosmos") {
    //         const signer = keplrWallet;
    //         const factory = await getFactory();
    //         const chain = await factory.inner(Chain.SECRET);
    //         try {
    //             const result = await chain.preTransfer(
    //                 signer,
    //                 nft,
    //                 new BigNumber(0)
    //             );
    //             dispatch(updateApprovedNFTs(nft));
    //             setFinishedApproving(arr);
    //         } catch (e) {
    //             console.log(e.message, "approve for cosmos");
    //             dispatch(setApproveLoader(false));
    //             dispatch(setError(e.message));
    //         }
    //     } else if (from.type === "Algorand") {
    //         const c = await factory.inner(15);
    //         const signer = await getAlgorandWalletSigner();
    //         try {
    //             await c.preTransfer(signer, nft, bigNumberFees);
    //         } catch (error) {
    //             console.log(error);
    //             dispatch(setApproveLoader(false));
    //             dispatch(setError(error.message));
    //         }
    //         dispatch(updateApprovedNFTs(nft));
    //         setFinishedApproving(arr);
    //     } else if (from.text === "Tezos") {
    //         try {
    //             const factory = await getFactory();
    //             const chain = await factory.inner(Chain.TEZOS);
    //             await chain.preTransfer(templeSigner || kukaiWalletSigner, nft);
    //             dispatch(updateApprovedNFTs(nft));
    //             setFinishedApproving(arr);
    //             // }
    //         } catch (error) {
    //             setFinishedApproving(arr);
    //             dispatch(
    //                 setError(error.data ? error.data.message : error.message)
    //             );
    //             if (error.data) {
    //                 console.log(error.data.message);
    //             } else console.log(error);
    //             console.log(error);
    //         }
    //     } else if (from.type === "VeChain") {
    //         try {
    //             await chain.preTransfer(signer, nft, bigNumberFees);

    //             dispatch(updateApprovedNFTs(nft));
    //             setFinishedApproving(arr);
    //         } catch (error) {
    //             setFinishedApproving(arr);
    //             dispatch(
    //                 setError(error.data ? error.data.message : error.message)
    //             );
    //             if (error.data) {
    //                 console.log(error.data.message);
    //             } else console.log(error);
    //             console.log(error);
    //         }
    //     } else {
    //         try {
    //             const factory = await getFactory();
    //             const chain = await factory.inner(Chain.ELROND);
    //             const signer = maiarProvider || ExtensionProvider.getInstance();
    //             console.log("inst", signer instanceof WalletConnectProvider);
    //             const swap = await chain.preTransfer(
    //                 signer,
    //                 nft,
    //                 bigNumberFees
    //             );
    //             dispatch(updateApprovedNFTs(nft));
    //             setFinishedApproving(arr);
    //         } catch (error) {
    //             setFinishedApproving(arr);
    //             dispatch(
    //                 setError(error.data ? error.data.message : error.message)
    //             );
    //             if (error.data) {
    //                 console.error(error.data.message);
    //             } else console.error(error);
    //             console.error(error);
    //         }
    //     }
    // };

    // Since approveForMinter returns a Promise it's a good idea to await it which requires an async function
    const approveAllNFTs = async () => {
        if (!approvedLoading) {
            dispatch(setApproveLoader(true));
            setApprovedLoading(true);
            setFinishedApproving([]);
            // let provider;
            let signer;
            let chain;
            switch (from.type) {
                case "EVM":
                    if (bitKeep) {
                        const provider = new ethers.providers.Web3Provider(
                            window.bitkeep.ethereum
                        );
                        signer = provider.getSigner(account);
                    } else {
                        const provider = new ethers.providers.Web3Provider(
                            WCProvider?.walletConnectProvider || window.ethereum
                        );
                        signer = provider.getSigner(account);
                    }
                    chain = await handleChainFactory(from.key);
                    selectedNFTList.forEach((nft, index) => {
                        approveEach(nft, signer, chain, index);
                    });
                    break;
                case "Skale":
                    if (bitKeep) {
                        const provider = new ethers.providers.Web3Provider(
                            window.bitkeep.ethereum
                        );
                        signer = provider.getSigner(account);
                    } else {
                        const provider = new ethers.providers.Web3Provider(
                            WCProvider?.walletConnectProvider || window.ethereum
                        );
                        signer = provider.getSigner(account);
                    }
                    chain = await handleChainFactory(from.key);
                    selectedNFTList.forEach((nft, index) => {
                        approveEach(nft, signer, chain, index);
                    });
                    break;
                case "Hedera":
                    chain = await handleChainFactory(from.key);
                    selectedNFTList.forEach((nft, index) => {
                        approveEach(nft, hederaSigner, chain, index);
                    });
                    break;
                case "VeChain":
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
                    signer = await provider.getSigner(account);
                    chain = await handleChainFactory(from.key);

                    for (
                        let index = 0;
                        index < selectedNFTList.length;
                        index++
                    ) {
                        await approveEach(
                            selectedNFTList[index],
                            signer,
                            chain,
                            index
                        );
                    }
                    break;
                case "Cosmos":
                    signer = window.getOfflineSigner(
                        testnet
                            ? CHAIN_INFO[from.text].tnChainId
                            : CHAIN_INFO[from.text].chainId
                    );
                    chain = await handleChainFactory(from.key);
                    selectedNFTList.forEach((nft, index) => {
                        approveEach(nft, signer, chain, index);
                    });
                    break;
                case "Tron":
                    setFinishedApproving(selectedNFTList);
                    selectedNFTList.forEach((nft, index) => {
                        dispatch(updateApprovedNFTs(nft));
                    });
                    break;
                default:
                    selectedNFTList.forEach((nft, index) => {
                        approveEach(nft, undefined, undefined, index);
                    });
                    break;
            }
        }
    };

    const onClickHandler = async () => {
        // debugger
        // const isSC = await checkIfReceiverIsSmartContract();
        // if (isSC) {
        //     dispatch(setReceiverIsSmartContractAddress(true));
        // } else

        if (!receiver) {
            dispatch(setPasteDestinationAlert(true));
        } else if (selectedNFTList.length < 1) {
            dispatch(setSelectNFTAlert(true));
        } else if (!bigNumberFees) {
            console.log("no fees need to estimate");
        } else {
            approveAllNFTs();
        }
    };

    // sdsdfsddsfsdf
    useEffect(() => {
        if (
            finishedApproving.length === selectedNFTList.length &&
            approvedLoading
        ) {
            setApprovedLoading(false);
            dispatch(setApproveLoader(false));
            setFinishedApproving([]);
        }

        if (selectedNFTList.length > 0) {
            dispatch(setApproved(isALLNFTsApproved()));
        } else {
            dispatch(setApproved(false));
            dispatch(setApproveLoader(false));
        }
    }, [selectedNFTList, approvedNFTList, finishedApproving]);

    return (
        <div className="approval">
            <div className="approval__header">
                <div className="approval__title">Approval</div>
                <div className="approval__inf">
                    {/* before */}
                    <InfLithComp className="svgWidget nftInfIcon" alt="info" />
                    {/* after */}
                </div>
            </div>
            <div
                style={
                    // selectedNFTList.length ?
                    approvedLoading
                        ? { opacity: 0.6, pointerEvents: "none" }
                        : {}
                    // : OFF
                }
                className="approveBtn"
            >
                Approve selected NFTs
                <div className="approveBtn">
                    <input
                        readOnly={true}
                        checked={approved || ""}
                        type="checkbox"
                        id="approveCheck"
                    />
                    <label
                        style={
                            // !receiver
                            //   ? { pointerEvents: "none", opacity: "0.6" }
                            approved ? { pointerEvents: "none" } : {}
                        }
                        onClick={bigNumberFees ? onClickHandler : undefined}
                        htmlFor="approveCheck"
                    >
                        <span className="checkCircle"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Approval;
