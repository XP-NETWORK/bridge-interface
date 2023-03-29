/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import {
    setSelectedNFTList,
    removeFromSelectedNFTList,
    setTransferLoaderModal,
    setWhiteListedCollection,
    setError,
    setWhitelistingLoader,
} from "../../store/reducers/generalSlice";
import NFTdetails from "./NFTdetails";
import { useSelector } from "react-redux";
import VideoAndImage from "./VideoAndImage";
import BrockenUtlGridView from "./BrockenUtlGridView";
import "./NewNFT.css";
import Preload from "./Preload";
import ClaimableCard from "./ClaimableCard";
import NotWhiteListed from "./NotWhiteListed";
import PropTypes from "prop-types";

import { parseNFT } from "../../wallet/nftParser";
import { useDidUpdateEffect } from "../Settings/hooks";
import Image from "./Image";
import OnlyVideo from "./OnlyVideo";
import { chains } from "../values";
import OriginChainMark from "./OriginChainMark";
import { selected } from "./NFTHelper";

import { WhitelistButton } from "./WhitelistButton";
import SFTMark from "./SFTMark";

NFTcard.propTypes = {
    nft: PropTypes.object,
    index: PropTypes.number,
    claimables: PropTypes.bool,
    chain: PropTypes.object,
    serviceContainer: PropTypes.object,
};

export default function NFTcard({
    serviceContainer,
    chain,
    nft,
    index,
    claimables,
}) {
    const { bridge: bridgeWrapper, whitelistedPool } = serviceContainer;
    const dispatch = useDispatch();
    const [detailsOn, setDetailsOn] = useState(false);
    const search = useSelector((state) => state.general.NFTListSearch);
    const from = useSelector((state) => state.general.from);

    const testnet = useSelector((state) => state.general.testNet);
    const selectedNFTs = useSelector((state) => state.general.selectedNFTList);

    const [isVisible, setIsVisible] = useState();
    const localhost = window.location.hostname;
    const [imageErr, setImageErr] = useState(false);

    const callBackWhenObserver = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    const getOriginChain = (originChain) => {
        const _nonce = Number(originChain);
        const origin = chains.find((e) => e.nonce === _nonce);
        return origin?.image?.src;
    };

    const originChainImg = getOriginChain(nft?.originChain);

    const cardRef = useRef(null);
    const options = useMemo(() => {
        return {
            root: null,
            tootMargin: "0px",
            threshold: 0.3,
        };
    }, []);

    function addRemoveNFT(chosen) {
        if (!selected(from.type, nft, selectedNFTs)) {
            dispatch(setSelectedNFTList(chosen));
        } else {
            dispatch(removeFromSelectedNFTList(nft));
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            callBackWhenObserver,
            options
        );
        const currentTarget = cardRef.current;

        if (currentTarget) observer.observe(currentTarget);
        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [cardRef, options, search]);

    useDidUpdateEffect(() => {
        if (isVisible) {
            if (!nft.dataLoaded) {
                chain.preParse(nft).then((_nft) => {
                    parseNFT(
                        serviceContainer,
                        _nft,
                        index,
                        testnet,
                        claimables
                    );
                });
            }
        }
    }, [isVisible, nft]);

    const onClickWhiteListButton = async () => {
        // eslint-disable-next-line no-debugger
        // debugger;
        dispatch(setWhitelistingLoader(true));
        dispatch(setTransferLoaderModal(true));
        try {
            const tx = await bridgeWrapper.bridge.whitelistEVM(
                from.nonce,
                nft.native.contract
            );

            const interval = setInterval(
                () =>
                    bridgeWrapper
                        .isWhitelisted(from.nonce, nft)
                        .then((result) => {
                            if (result) {
                                dispatch(setTransferLoaderModal(false));
                                dispatch(setWhitelistingLoader(false));
                                dispatch(
                                    setWhiteListedCollection({
                                        contract: nft.native.contract,
                                    })
                                );
                                whitelistedPool.whitelistContract(
                                    nft.native.contract
                                );
                                clearInterval(interval);
                            }
                        }),
                5000
            );

            setTimeout(() => {
                dispatch(setWhitelistingLoader(false));
                dispatch(setTransferLoaderModal(false));
                clearInterval(interval);
            }, 80 * 1000);
        } catch (error) {
            dispatch(setWhitelistingLoader(false));
            dispatch(setTransferLoaderModal(false));
            dispatch(
                setError({
                    link: "https://t.me/xp_network",
                    anchor: "XP.NETWORK",
                    message: `Smart contract cannot be automatically whitelisted. \n
            Please contact the XP.NETWORK support team`,
                })
            );
            console.log(error.message);
        }
    };

    return (
        <>
            <div className={`nft-box__wrapper`} ref={cardRef}>
                {!nft?.dataLoaded ? (
                    <Preload />
                ) : (
                    <div
                        onClick={() =>
                            nft.whitelisted && !detailsOn && !claimables
                                ? addRemoveNFT(nft, index)
                                : undefined
                        }
                        className={
                            nft.whitelisted
                                ? "nft__card--selected"
                                : "nft__card"
                        }
                    >
                        {nft.native?.amount && (
                            <SFTMark amount={nft?.native.amount} />
                        )}
                        {/* {originChainImg && (
                            <OriginChainMark icon={originChainImg} />
                        )} */}
                        <div className="nft__main">
                            <div className="nft-actions__container">
                                {originChainImg && (
                                    <OriginChainMark icon={originChainImg} />
                                )}
                                {!nft.whitelist && (
                                    <WhitelistButton
                                        isNFTWhitelisted={nft.whitelisted}
                                        whitelist={onClickWhiteListButton}
                                    />
                                )}
                            </div>
                            {nft.uri && nft.image && nft.animation_url ? (
                                <VideoAndImage
                                    index={index}
                                    videoUrl={nft.animation_url}
                                    imageUrl={nft.image}
                                    onError={setImageErr}
                                    nft={nft}
                                />
                            ) : nft.image && !imageErr ? (
                                <Image
                                    onError={setImageErr}
                                    nft={nft}
                                    index={index}
                                />
                            ) : !nft.image && nft.animation_url ? (
                                <OnlyVideo videoUrl={nft.animation_url} />
                            ) : (
                                <BrockenUtlGridView />
                            )}

                            {!claimables && nft.whitelisted ? (
                                !selected(from.type, nft, selectedNFTs) ? (
                                    <div className="nft-radio"></div>
                                ) : (
                                    <div className="nft-radio--selected"></div>
                                )
                            ) : (
                                ""
                            )}

                            {!nft.whitelisted /*|| !verifiedContract*/ && (
                                <NotWhiteListed />
                            )}
                            {claimables && (
                                <ClaimableCard nft={nft} index={index} />
                            )}
                        </div>
                        <div className="nft__footer">
                            {localhost === "localhost" && (
                                <span
                                    style={{
                                        fontSize: "10px",
                                        color: "red",
                                    }}
                                >
                                    index: {index}
                                </span>
                            )}
                            <span className="nft-name">
                                <span className="name">
                                    {nft.name || nft.native?.name}
                                </span>
                                <NFTdetails
                                    details={setDetailsOn}
                                    nftInf={nft}
                                    index={index}
                                    claimables={claimables}
                                />
                            </span>
                            {from?.text !== "Solana" && (
                                <span className="nft-number">
                                    {nft.native?.tokenId}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
