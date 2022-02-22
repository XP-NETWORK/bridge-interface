import { useEffect, useState } from "react";
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
import VideoAndImage from "./VideoAndImage"
import NotWhiteListed from "./NotWhiteListed"

export default function NFTcard({ nft, index }) {

    const off = { pointerEvents: "none" }
    const dispatch = useDispatch();
    const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
    const isSelected = selectedNFTs.filter(
      (n) =>
        n.native.tokenId === nft.native.tokenId &&
        n.native.contract === nft.native.contract &&
        n.native.chainId === nft.native.chainId
    )[0];
    const [onHover, setOnHover] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false);
    const HIDDEN = { visibility: "hidden" };
    const [brokenURL, setBrokenURL] = useState(false)
    const { video, videoUrl, imageUrl, image, ipfsArr } = getUrl(nft);


    function addRemoveNFT(chosen) {
        if (!isSelected) {
            dispatch(setSelectedNFTList(chosen));
        } else {
            dispatch(removeFromSelectedNFTList(nft));
        }
    }


    // console.log("index: ", index, "video: ", video, videoUrl, "image: ", image, imageUrl, "ipfsArr: ", ipfsArr)
    // console.log("nft.uri: ", nft.uri, "valid: ", isValidHttpUrl(nft.uri))
    // console.log("whiteListed: ", whiteListed)
    console.log("onHover: ", onHover)

    useEffect(() => {
        setTimeout(() => {
            setImageLoaded(true);
        }, 5000);
    }, [selectedNFTs]);

    
    return (
        // <div className={`nft-box__wrapper ${!imageLoaded ? "preload-cont" : ""}`}>
        // <div className={`nft-box__wrapper ${!whiteListed ? "not-whitelisted" : ""}`}>
        <div className={`nft-box__wrapper`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}>
            <div className={isSelected ? "nft-box__container--selected" : "nft-box__container"}>
              <div onClick={() => addRemoveNFT(nft, index)} className="nft-image__container">
                <div className="image__wrapper">
                  { nft.uri && isValidHttpUrl(nft.uri) && !brokenURL ? 
                    video && image ? <VideoAndImage />
                  : image && !video ? <img alt="#" src={imageUrl} /> 
                  : (!image && video) ? <div>Only video</div> 
                  : (!image && !video) && <dic>Try Links</dic>
                  : <div>Brocken</div> 
                  }
                  {/* {(imageUrl || videoUrl) && nft.uri && isValidHttpUrl(nft.uri) ? 
                    video ? <video onLoadedData={() => setImageLoaded(true)} controls={false}  playsInline={true} autoPlay={true} loop={true} src={setupURI(videoUrl)} />
                  : <img alt="#" onLoad={() => setImageLoaded(true)} alt="NFT image" src={setupURI(imageUrl)} />
                  : ipfsArr.length ? <VideoOrImage urls={ipfsArr} i={index} />
                  : ( <div className="brocken-url"><img onLoad={() => setImageLoaded(true)} src={brockenurl} alt="uri is broken" />
                      <span className="brocken-url__msg">
                        NFTs URL
                        <br /> is broken
                      </span>
                    </div>
                  )} */}
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
            { (!nft.whitelisted && onHover) && <NotWhiteListed /> }
        </div>
      );
}
