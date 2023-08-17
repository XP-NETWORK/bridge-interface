/* eslint-disable no-unused-vars*/
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { chainData } from "../utils";
import { switchNetwork } from "../../../../services/chains/evm/evmService";

import {
    setWalletsModal,
    setApproveLoader,
} from "../../../../store/reducers/generalSlice";

import { setTotal } from "../../../../store/reducers/eventSlice";

import { useDispatch } from "react-redux";

import xpnetClaimAbi from "../../../assets/abi/mintAbi.json";

import { useWeb3React } from "@web3-react/core";

import { REST_API } from "../utils";

export const MintNft = ({ choosenChain, bridge, account }) => {
    const MAX_MINT = 5;
    const [countMint, setCountMint] = useState(1);

    const [contract, setContract] = useState(null);

    const { chainId: x } = useWeb3React();

    const [mintLimits, setMintLimit] = useState(
        chainData.reduce((acc, curr) => {
            return {
                ...acc,
                [curr.chainNonce]: MAX_MINT,
            };
        }, {})
    );

    //const {totalMinted} = useSelector((state) => state.event)

    useEffect(() => {
        (async () => {
            const chain = chainData[choosenChain];

            if (account && chain.evm && x) {
                const { chainId, chainNonce, name } = chain;

                dispatch(setApproveLoader(true));
                try {
                    if (String(x) !== chain.chainId) {
                        try {
                            await switchNetwork({ chainId: Number(chainId) });
                        } catch {
                            dispatch(setApproveLoader(false));
                            return;
                        }
                        throw new Error("Chain does not match");
                    }

                    const [total, claims] = await Promise.all([
                        (await fetch(`${REST_API}/get-claims`)).json(),
                        (
                            await fetch(
                                `${REST_API}/get-chain-claims/${chainNonce}/${account}`
                            )
                        ).json(),
                    ]);

                    console.log(total, claims);

                    console.log(
                        total[name].total,
                        Number(claims?.claimed || 0)
                    );
                    dispatch(setTotal(total[name].total));
                    setMintLimit({
                        ...mintLimits,
                        [chainNonce]: MAX_MINT - Number(claims?.claimed || 0),
                    });

                    dispatch(setApproveLoader(false));
                } catch (e) {
                    console.log(e, "e");
                    if (e.message === "Chain does not match") {
                        return;
                    }
                }
                dispatch(setApproveLoader(false));
            }
        })();

        /*setMintLimit;



        console.log(mintLimits);
        console.log(choosenChain);*/
    }, [account, choosenChain, x]);

    const increase = () => {
        if (countMint < mintLimits[chainData[choosenChain].chainNonce])
            setCountMint((countMint) => countMint + 1);
    };
    const decrease = () => {
        if (countMint > 1) setCountMint((countMint) => countMint - 1);
    };

    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const mintNft = async () => {
        try {
            dispatch(setApproveLoader(true));
            const chain = chainData[choosenChain];
            const { chainId, chainNonce, contract: address, name } = chain;

            let chainWrapper = await bridge.getChain(Number(chainNonce));

            const contract = new ethers.Contract(
                address,
                xpnetClaimAbi,
                chainWrapper.signer
            );

            if (!contract) {
                throw Error("Contract instance is not created");
            }
            const res = await contract["claim"]();
            dispatch(setApproveLoader(false));
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    };
    const dispatch = useDispatch();

    const button = account ? (
        <button
            style={account ? {} : { opacity: 0.6, pointerEvents: "none" }}
            onClick={mintNft}
        >
            Mint on {chainData[choosenChain].name}
        </button>
    ) : (
        <button
            onClick={() => {
                dispatch(setWalletsModal(true));
            }}
        >
            Connect Wallet
        </button>
    );

    return (
        <>
            <div className="mint-nft-container line-down-margin-24">
                <div
                    className="amount-mint-nft"
                    style={
                        account ? {} : { opacity: 0.6, pointerEvents: "none" }
                    }
                >
                    <span onClick={decrease}>-</span>
                    <div>{countMint}</div>
                    <span onClick={increase}>+</span>
                </div>
                {button}
            </div>
        </>
    );
};
