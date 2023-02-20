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
import { setupUnitTestWatcherTimeouts } from "@elrondnetwork/erdjs/out/testutils";
import axios from "axios";

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
    const [nftState, setNftState] = useState(nft)
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

    const originChainImg = getOriginChain(nftState?.originChain);

    const cardRef = useRef(null);
    const options = useMemo(() => {
        return {
            root: null,
            tootMargin: "0px",
            threshold: 0.3,
        };
    }, []);

    function addRemoveNFT(chosen) {
        if (!selected(from.type, nftState, selectedNFTs)) {
            dispatch(setSelectedNFTList(chosen));
        } else {
            dispatch(removeFromSelectedNFTList(nftState));
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

    const getDetails = async (nft) => {
        // const headers = {
        //     "Content-Type": "application/json",
        // }
      if (!nftState.image && !nftState.animation_url && nftState.uri) {

        const client = axios.create({
            baseURL:nftState.uri
          });
          client.get().then((response) => {
            console.log('response.data: ',response.data);
          })
          
        // axios.create({baseURL:nftState.uri}).then((result)=>{
        //     console.log('result: ',result)
        // })
        // console.log("nftState.uri: ", nftState.uri);
        // const data = await (axios.get(nftState.uri)).data
        // console.log("result -> ", data);
        // nft["image"] = data.image;
        // nft["animation_url"] = data.animation_url;
        // setNftState(nft);
        // console.log("updated nft state : ", nftState);
        }
    };

    useEffect(async ()=>{
        getDetails(nft)
    },[])

    useDidUpdateEffect(() => {
        if (isVisible) {
            if (!nftState.dataLoaded) {
                chain.preParse(nftState).then((_nft) => {
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
    }, [isVisible, nftState]);

    const onClickWhiteListButton = async () => {
        // eslint-disable-next-line no-debugger
        // debugger;
        dispatch(setWhitelistingLoader(true));
        dispatch(setTransferLoaderModal(true));
        try {
            const tx = await bridgeWrapper.bridge.whitelistEVM(
                from.nonce,
                nftState.native.contract
            );

            const interval = setInterval(
                () =>
                    bridgeWrapper
                        .isWhitelisted(from.nonce, nftState)
                        .then((result) => {
                            if (result) {
                                dispatch(setTransferLoaderModal(false));
                                dispatch(setWhitelistingLoader(false));
                                dispatch(
                                    setWhiteListedCollection({
                                        contract: nftState.native.contract,
                                    })
                                );
                                whitelistedPool.whitelistContract(
                                    nftState.native.contract
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

    

    // const [isImageAndOrVideo, setIsImageAndOrVideo] = useState('')
    // useEffect(async () => {
    //   if (nft.uri && nft.image && nft.animation_url) {
    //     setIsImageAndOrVideo("both");
    //   } else if (nft.image && !imageErr) {
    //     setIsImageAndOrVideo("image");
    //   } else if (!nft.image && nft.animation_url) {
    //     setIsImageAndOrVideo("video");
    //   } else if(!nft.image && !nft.animation_url) {
    //     let url = await (await axios.get(nft?.uri)).data
    //     console.log('get url', await url)
    //     setNftUrl(await url)
    //     console.log('nftUrl: ',nftUrl)
    //     nft['image']=nftUrl
    //     await url ? setIsImageAndOrVideo(url) : setIsImageAndOrVideo(undefined)

    //   }
    // }, []);

    return (
        <>
            <div className={`nft-box__wrapper`} ref={cardRef}>
                {!nftState?.dataLoaded ? (
                    <Preload />
                ) : (
                    <div
                        onClick={() =>
                            nftState.whitelisted && !detailsOn && !claimables
                                ? addRemoveNFT(nftState, index)
                                : undefined
                        }
                        className={
                            nftState.whitelisted
                                ? "nft__card--selected"
                                : "nft__card"
                        }
                    >
                        {nftState.native?.amount && (
                            <SFTMark amount={nftState?.native.amount} />
                        )}
                        {/* {originChainImg && (
                            <OriginChainMark icon={originChainImg} />
                        )} */}
                        <div className="nft__main">
                            <div className="nft-actions__container">
                                {originChainImg && (
                                    <OriginChainMark icon={originChainImg} />
                                )}
                                {!nftState.whitelisted && (
                                    <WhitelistButton
                                        isNFTWhitelisted={nftState.whitelisted}
                                        whitelist={onClickWhiteListButton}
                                    />
                                )}
                            </div>
                            {nftState.uri && nftState.image && nftState.animation_url ? (
                                <VideoAndImage
                                    index={index}
                                    videoUrl={nftState.animation_url}
                                    imageUrl={nftState.image}
                                    onError={setImageErr}
                                    nft={nftState}
                                />
                            ) : nftState.image && !imageErr ? (
                                <Image
                                    onError={setImageErr}
                                    nft={nftState}
                                    index={index}
                                />
                            ) : !nftState.image && nftState.animation_url ? (
                                <OnlyVideo videoUrl={nftState.animation_url} />
                            ) : (
                                <BrockenUtlGridView />
                            )}

                            {!claimables && nftState.whitelisted ? (
                                !selected(from.type, nftState, selectedNFTs) ? (
                                    <div className="nft-radio"></div>
                                ) : (
                                    <div className="nft-radio--selected"></div>
                                )
                            ) : (
                                ""
                            )}

                            {!nftState.whitelisted /*|| !verifiedContract*/ && (
                                <NotWhiteListed />
                            )}
                            {claimables && (
                                <ClaimableCard nft={nftState} index={index} />
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
                                    {nftState.name || nftState.native?.name}
                                </span>
                                <NFTdetails
                                    details={setDetailsOn}
                                    nftInf={nftState}
                                    index={index}
                                    claimables={claimables}
                                />
                            </span>
                            <span className="nft-number">
                                {nftState.native?.tokenId}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
