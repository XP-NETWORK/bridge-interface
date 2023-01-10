import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setSelectedNFTList,
  removeFromSelectedNFTList,
} from "../../store/reducers/generalSlice";
import brockenurl from "../../assets/img/brockenurl.png";
import CheckGreen from "../../assets/img/icons/check_green.svg";
import NFTdetails from './NFTdetails'
import { useSelector } from "react-redux";
import { setupURI } from "../../wallet/oldHelper";
import { getUrl, isWhiteListed } from "./NFTHelper.js";
import "./NewNFT.css";
import { isValidHttpUrl } from "../../wallet/helpers";
import VideoOrImage from "./VideoOrImage";
import { CHAIN_INFO } from "../../components/values"

export default function NFT({ nft, index }) {
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
  const dispatch = useDispatch();
  const isSelected = selectedNFTs.filter(
    (n) =>
      n.native.tokenId === nft.native.tokenId &&
      n.native.contract === nft.native.contract &&
      n.native.chainId === nft.native.chainId
  )[0];
  const [imageLoaded, setImageLoaded] = useState(false);
  const HIDDEN = { visibility: "hidden" };
  const { video, videoUrl, imageUrl, image, ipfsArr } = getUrl(nft);
  const from = useSelector(state => state.general.from)
  const [whiteListed, setWhiteListed] = useState(false)

  function addRemoveNFT(chosen) {
    if (!isSelected) {
      dispatch(setSelectedNFTList(chosen));
    } else {
      dispatch(removeFromSelectedNFTList(nft));
    }
  }

  const whiteListCheck = async () => {
    const whitelisted = await isWhiteListed(CHAIN_INFO[from.text].nonce, nft)
    setWhiteListed(whitelisted)
  }

  useEffect(() => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 5000);
  }, [selectedNFTs]);

  useEffect(() => {
    whiteListCheck()
  },[setImageLoaded])

  const imageLoadedHandler = () => {
    setImageLoaded(true)
  }
  

  return (
    <div className={`nft-box__wrapper ${!imageLoaded ? "preload-cont" : ""}`}>
      <div style={!imageLoaded && (imageUrl || videoUrl) ? HIDDEN : {}} className={isSelected ? "nft-box__container--selected" : "nft-box__container"}>
        <div onClick={() => addRemoveNFT(nft, index)} className="nft-image__container">
          <div className="image__wrapper">
            {(imageUrl || videoUrl) && nft.uri && isValidHttpUrl(nft.uri) ? 
              video ? <video onLoadedData={imageLoadedHandler} controls={false}  playsInline={true} autoPlay={true} loop={true} src={setupURI(videoUrl)} />
            : <img alt="#" onLoad={imageLoadedHandler} alt="NFT image" src={setupURI(imageUrl)} />
            : ipfsArr.length ? <VideoOrImage imageLoadedHandler={() => imageLoadedHandler} urls={ipfsArr} i={index} />
            : (<div className="brocken-url"><img onLoad={imageLoadedHandler} src={brockenurl} alt="uri is broken" />
                <span className="brocken-url__msg">
                  NFTs URL
                  <br /> is broken
                </span>
              </div>
              )}
              <div className="radio__container">
                {!isSelected ? (
                  <span className="selected-radio"></span>
                ) : (
                  <img src={CheckGreen} alt="" />
                )}
              </div>
          </div>
        </div>
        <div className={`nft-content__container ${!imageLoaded ? "preload-content-container" : ""}`}>
          <span className="nft-name"><span className="name">{nft.name}</span><NFTdetails nftInf={nft} index={index} /></span>
          <span className="nft-number">{nft.native.tokenId}</span>
        </div>
      </div>
        { !imageLoaded && 
                <div className="preload__container">
                    <div className="preload__image"></div>
                    <div className="preload__content">
                        <div className="preload__name"></div>
                        <div className="preload__number"></div>
                    </div>
                </div>
            }
    </div>
  );
}
