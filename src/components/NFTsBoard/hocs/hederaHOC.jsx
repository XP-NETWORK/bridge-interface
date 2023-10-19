/* eslint-disable react/prop-types */
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";

import {
    setTransferLoaderModal,
    setError,
    setHederaClaimables,
    setNFTSetToggler,
    //setTransferLoaderModal,
    toggleChainSelect,
} from "../../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";

import { ChainType, Chain } from "xp.network";

import { withServices } from "../../App/hocs/withServices";

import { StringShortener } from "../../../utils";

import { connectHashPack } from "../../Wallet/HederaWallet/hederaConnections";
import { setHederaQuietConnection } from "../../../store/reducers/signersSlice";
import DeployUserStore from "../../TransferBoard/DeployUserStore";

const CheckClaimables = withServices(({ serviceContainer }) => {
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();

    const selectedChain = useSelector((state) => state.general.selectedChain);

    /*useEffect(() => {
        (async () => {
            const chainWapper = await bridge.getChain(Chain.HEDERA);
            if (chainWapper.chain?.isInjected) setVisisble(true);
        })();
    }, []);*/

    useEffect(() => {
        if (selectedChain) {
            dispatch(toggleChainSelect(false));
            (async () => {
                const chainWapper = await bridge.getChain(Chain.HEDERA);

                const toAssosiate = await bridge?.bridge
                    .hederaGetMintedCollection(
                        selectedChain,
                        chainWapper.signer.address
                    )
                    .catch(() => []);

                if (!toAssosiate.length)
                    return dispatch(setError({ message: "Nothing to claim" }));

                const toClaim = await chainWapper
                    .getClaimables(toAssosiate)
                    .catch((e) => {
                        dispatch(setError({ message: e.message }));
                        return;
                    });

                if (!toClaim) return;

                const flatClaimables = toClaim.reduce((acc, cur) => {
                    return [
                        ...acc,
                        ...cur.tokens.map((item) => ({
                            contract: cur.contract,
                            associated: cur.associated,
                            htsToken: cur.htsToken,
                            tokenId: item,
                        })),
                    ];
                }, []);

                if (flatClaimables.length) {
                    dispatch(setHederaClaimables(flatClaimables));
                    const frame = document.querySelector(".nft-list__wrapper");
                    frame.scrollTo(0, frame.scrollHeight + 200);
                }
            })();
        }
    }, [selectedChain]);

    const getClaimables = () => dispatch(toggleChainSelect(true));

    /*   dispatch(toggleChainSelect(true));
  



        false &&
            bridge.bridge
                .hederaGetMintedCollection(
                    6,
                    "0x00000000000000000000000000000000002b22a1"
                )
                .then(async (res) => {
                    if (res?.length) {
                        const chainWapper = await bridge.getChain(Chain.HEDERA);
                        await chainWapper.assosiate({
                            htsToken: res[0].hts_token,
                        });
                    }
                });

        false &&
            bridge.getChain(Chain.HEDERA).then(async (wrapper) => {
                dispatch(setTransferLoaderModal(true));
                const claimables = await wrapper
                    .getClaimables()
                    .catch(() => []);

                const flatClaimables = claimables.reduce((acc, cur) => {
                    return [
                        ...acc,
                        ...cur.tokens.map((item) => ({
                            contract: cur.contract,
                            htsToken: cur.htsToken,
                            tokenId: new BigNumber(item._hex).toString(16),
                        })),
                    ];
                }, []);

                flatClaimables?.length &&
                    dispatch(setHederaClaimables(flatClaimables));
                dispatch(setTransferLoaderModal(false));
            });
    };*/

    return (
        <button className="hederaCheckClaimBtn" onClick={getClaimables}>
            Check Claimables
        </button>
    );
});

const RenderClaimables = withServices(({ serviceContainer, setClaimables }) => {
    const { bridge } = serviceContainer;
    const hederaClaimables = useSelector(
        (state) => state.general.hederaClaimables
    );

    useEffect(() => {
        setClaimables(hederaClaimables.length);
    }, [hederaClaimables]);

    const dispatch = useDispatch();

    const clickClaim = (token) => {
        dispatch(setTransferLoaderModal(true));
        try {
            bridge.getChain(Chain.HEDERA).then(async (wrapper) => {
                const assosiated = token.associated
                    ? true
                    : await wrapper.associate(token);

                if (!assosiated) {
                    dispatch(setError({ message: "Token assosiation error" }));
                    return;
                }

                await wrapper
                    .claim(token)
                    .catch((e) => dispatch(setError({ message: e.message })));
                const index = hederaClaimables.findIndex((t) => t === token);

                dispatch(
                    setHederaClaimables([
                        ...hederaClaimables.slice(0, index),
                        ...hederaClaimables.slice(index + 1),
                    ])
                );

                await new Promise((r) => setTimeout(r, 1000));
                dispatch(setNFTSetToggler());
                dispatch(setTransferLoaderModal(false));
            });
        } catch (e) {
            dispatch(setTransferLoaderModal(false));
            throw e;
        }
    };

    return (
        <>
            {Array.isArray(hederaClaimables) &&
                hederaClaimables.map((item) => (
                    <div key={item} className="nft-box__wrapper">
                        <div className="nft__card--selected claimable-card__wrapper">
                            <div className="claimable-card__text">
                                The NFT is not claimed
                            </div>
                            <div>{StringShortener(item.contract, 5)}</div>
                            {new BigNumber(item.tokenId).toString()}
                            <div
                                onClick={() => clickClaim(item)}
                                style={{ background: "black" }}
                                className="not-whitelisted__button"
                            >
                                Claim
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
});

export const RenderClaimInDestination = ({
    serviceContainer,
    fromChain,
    receiver,
}) => {
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();
    const [visible, setVisisble] = useState(false);
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        (async () => {
            const toAssosiate = await bridge?.bridge
                .hederaGetMintedCollection(fromChain, receiver)
                .catch(() => []);

            if (toAssosiate?.length) setVisisble(true);
            setTokens(toAssosiate);
            //const chainWapper = await bridge.getChain(Chain.HEDERA);
        })();

        () => {
            console.log("unmount RenderClaimInDestination");
            dispatch(setHederaQuietConnection(false));
        };
    }, []);

    const handler = async () => {
        //setVisisble(false);
        // localStorage.setItem("XP_HEDERA_QUIET_CONNECTION", true);
        dispatch(setHederaQuietConnection(true));
        connectHashPack(bridge.network === "testnet" ? true : false);

        const chainWapper = await new Promise((r) => {
            (async () => {
                let chainWapper = await bridge.getChain(Chain.HEDERA, {
                    overwrite: true,
                });
                while (!chainWapper.signer) {
                    console.log(chainWapper.signer, "signer");
                    chainWapper = await bridge.getChain(Chain.HEDERA, {
                        overwrite: true,
                    });
                    await new Promise((r) => setTimeout(r, 2000));
                }

                r(chainWapper);
            })();
        });

        dispatch(setHederaQuietConnection(false));

        await chainWapper.checkAndAssociate(tokens).catch((e) => {
            dispatch(setError({ message: e.message }));
        });
    };

    return (
        <button
            className="changeBtn ClaimInDestination"
            onClick={handler}
            style={{ display: visible ? "block" : "none" }}
        >
            Assosiate minted Token
        </button>
    );
};

export const withHedera = (Wrapped) =>
    function CBU(props) {
        return (
            <Wrapped
                {...props}
                //algorandAccount={algorandAccount}
                chainSpecificRender={{
                    ...(props.chainSpecificRender || {}),
                    [ChainType.HEDERA]: {
                        CheckClaimables,
                        RenderClaimables,
                        RenderClaimInDestination,
                        DeployUserStore,
                    },
                }}
                chainSpecific={{
                    ...(props.chainSpecific || {}),
                }}
            />
        );
    };
