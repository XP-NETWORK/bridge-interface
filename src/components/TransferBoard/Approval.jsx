import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as InfLithComp } from "../../assets/img/icons/Inf.svg";
// import { ChainFactoryConfigs,    ChainFactory } from "xp.network/dist";
import { Chain, Config } from "xp.network/dist/consts";
import { ethers } from "ethers";
import * as thor from "web3-providers-connex";
import { Driver, SimpleNet, SimpleWallet } from "@vechain/connex-driver";
import { Framework } from "@vechain/connex-framework";

import {
    updateApprovedNFTs,
    setApproved,
    setApproveLoader,
    setError,
    setSelectNFTAlert,
    setPasteDestinationAlert,
} from "../../store/reducers/generalSlice";
import {
    getFactory,
    handleChainFactory,
    isALLNFTsApproved,
} from "../../wallet/helpers";
import { ExtensionProvider } from "@elrondnetwork/erdjs/out";
import { algoConnector } from "../../wallet/connectors";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { TempleWallet } from "@temple-wallet/dapp";
import { BeaconWallet } from "@taquito/beacon-wallet";
import Connex from "@vechain/connex";

const TronWeb = require("tronweb");
function Approval(props) {
    const dispatch = useDispatch();
    const [finishedApproving, setFinishedApproving] = useState([]);
    const [approvedLoading, setApprovedLoading] = useState();
    const from = useSelector((state) => state.general.from);
    const testnet = useSelector((state) => state.general.testNet);
    const account = useSelector((state) => state.general.account);
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
    const MyAlgo = useSelector((state) => state.general.MyAlgo);
    const kukaiWallet = useSelector((state) => state.general.kukaiWallet);
    const widget = useSelector((state) => state.general.widget);
    const sync2Connex = useSelector((state) => state.general.sync2Connex);

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
        if (
            from.type !== "Elrond" &&
            from.type !== "Algorand" &&
            from.type !== "Tezos"
        ) {
            try {
                const { tokenId, contract, chainId } = nft.native;
                const isInApprovedNFTs = approvedNFTList.filter(
                    (n) =>
                        n.native.tokenId === tokenId &&
                        n.native.contract === contract &&
                        chainId === n.native.chainId
                )[0];
                if (!isInApprovedNFTs) {
                    try {
                        const ap = await chain.approveForMinter(nft, signer);
                        dispatch(updateApprovedNFTs(nft));
                        setFinishedApproving(arr);
                    } catch (err) {
                        console.log(arr, err);
                        setFinishedApproving(arr);
                        dispatch(
                            setError(err.data ? err.data.message : err.message)
                        );
                    }
                }
            } catch (error) {
                setFinishedApproving(arr);
                dispatch(setError(error));
                if (error.data) {
                    console.log(error.data.message);
                } else console.log(error);
                // dispatch(setApproved(false))
                console.log(error);
            }
        } else if (from.type === "Algorand") {
            const c = await factory.inner(15);
            const signer = await getAlgorandWalletSigner();
            try {
                const approve = await c.preTransfer(signer, nft, bigNumberFees);
            } catch (error) {
                console.log(error);
            }
            dispatch(updateApprovedNFTs(nft));
            setFinishedApproving(arr);
        } else if (from.text === "Tezos") {
            try {
                if (kukaiWallet) {
                    const factory = await getFactory();
                    const chain = await factory.inner(Chain.TEZOS);
                    const wallet = new BeaconWallet({
                        name: "XP.NETWORK Cross-Chain NFT Bridge",
                    });
                    const swap = await chain.preTransfer(wallet, nft);
                    dispatch(updateApprovedNFTs(nft));
                    setFinishedApproving(arr);
                } else {
                    const factory = await getFactory();
                    const chain = await factory.inner(Chain.TEZOS);
                    const signer = new TempleWallet("My Super DApp");
                    await signer.connect("mainnet");
                    const swap = await chain.preTransfer(signer, nft);
                    dispatch(updateApprovedNFTs(nft));
                    setFinishedApproving(arr);
                }
            } catch (error) {
                setFinishedApproving(arr);
                dispatch(
                    setError(error.data ? error.data.message : error.message)
                );
                if (error.data) {
                    console.log(error.data.message);
                } else console.log(error);
                console.log(error);
            }
        } else if (from.type === "VeChain") {
            try {
                const factory = await getFactory();
                const swap = await chain.preTransfer(
                    signer,
                    nft,
                    bigNumberFees
                );

                dispatch(updateApprovedNFTs(nft));
                setFinishedApproving(arr);
            } catch (error) {
                setFinishedApproving(arr);
                dispatch(
                    setError(error.data ? error.data.message : error.message)
                );
                if (error.data) {
                    console.log(error.data.message);
                } else console.log(error);
                console.log(error);
            }
        } else {
            // debugger
            try {
                const factory = await getFactory();
                const chain = await factory.inner(Chain.ELROND);
                const signer = maiarProvider || ExtensionProvider.getInstance();
                const swap = await chain.preTransfer(
                    signer,
                    nft,
                    bigNumberFees
                );

                dispatch(updateApprovedNFTs(nft));
                setFinishedApproving(arr);
            } catch (error) {
                setFinishedApproving(arr);
                dispatch(
                    setError(error.data ? error.data.message : error.message)
                );
                if (error.data) {
                    console.log(error.data.message);
                } else console.log(error);
                console.log(error);
            }
        }
    };

    // Since approveForMinter returns a Promise it's a good idea to await it which requires an async function
    const approveAllNFTs = async () => {
        if (!approvedLoading) {
            dispatch(setApproveLoader(true));
            setApprovedLoading(true);
            setFinishedApproving([]);
            if (from.type === "EVM") {
                const provider = new ethers.providers.Web3Provider(
                    WCProvider?.walletConnectProvider || window.ethereum
                );
                const signer = provider.getSigner(account);
                const chain = await handleChainFactory(from.key);
                selectedNFTList.forEach((nft, index) => {
                    approveEach(nft, signer, chain, index);
                });
            } else if (from.type === "VeChain") {
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
                const chain = await handleChainFactory(from.key);
                selectedNFTList.forEach((nft, index) => {
                    approveEach(nft, signer, chain, index);
                });
            } else if (from.type === "Tron") {
                setFinishedApproving(selectedNFTList);
                selectedNFTList.forEach((nft, index) => {
                    dispatch(updateApprovedNFTs(nft));
                });
            } else {
                selectedNFTList.forEach((nft, index) => {
                    approveEach(nft, undefined, undefined, index);
                });
            }
        }
    };

    const onClickHandler = () => {
        // debugger
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
