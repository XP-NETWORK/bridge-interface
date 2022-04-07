import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setSelectedNFTList,
  removeFromSelectedNFTList,
} from "../../store/reducers/generalSlice";
import CheckGreen from "../../assets/img/icons/check_green.svg";
import NFTdetails from './NFTdetails'
import { useSelector } from "react-redux";
import { setupURI } from "../../wallet/oldHelper";
import { getUrl, isWhiteListed } from "./NFTHelper.js";
import "./NewNFT.css";
import { isValidHttpUrl } from "../../wallet/helpers";
import VideoOrImage from "./VideoOrImage";
import VideoAndImage from "./VideoAndImage"
import NotWhiteListed from "./NotWhiteListed"
import BrockenUtlGridView from "./BrockenUtlGridView";


export default function NFTcard({ nft, index }) {

    const from = useSelector(state => state.general.from)
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
    const [whiteListed, setWhitelisted] = useState(true)
    const { video, videoUrl, imageUrl, image, ipfsArr } = getUrl(nft);
  
    useEffect(async() => {
      const whitelisted = nft.native.contract === "0xED1eFC6EFCEAAB9F6d609feC89c9E675Bf1efB0a" ? false 
      : await isWhiteListed(from.text, nft)
      setWhitelisted(whitelisted)
    }, [])
    

    function addRemoveNFT(chosen) {
        if (!isSelected) {
            dispatch(setSelectedNFTList(chosen));
        } else {
            dispatch(removeFromSelectedNFTList(nft));
        }
    }

    const imageLoadedHandler = () => {
      setImageLoaded(true)
    }

    useEffect(() => {
        setTimeout(() => {
            setImageLoaded(true);
        }, 5000);
    }, [selectedNFTs]);
    
    return (
        <div className={`nft-box__wrapper`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}>
            <div className={isSelected ? "nft-box__container--selected" : "nft-box__container"}>
              <div onClick={() => whiteListed ? addRemoveNFT(nft, index) : undefined} className="nft-image__container">
                <div className="image__wrapper">
                  { nft.uri && isValidHttpUrl(nft.uri, index) ? 
                    video && image ? <VideoAndImage index={index} imageLoaded={() => imageLoadedHandler} videoUrl={videoUrl} imageUrl={imageUrl} />
                  : image && !video ? <img onLoad={() => imageLoadedHandler} alt="only image"  src={setupURI(imageUrl)} /> 
                  : !image && video ? <video onLoadedData={imageLoadedHandler} controls={false}  playsInline={true} autoPlay={true} loop={true}  muted={true} src={setupURI(videoUrl)} />
                  : ipfsArr?.length && <VideoOrImage urls={ipfsArr} i={index} />
                  : <BrockenUtlGridView />
                  }
                  { (!whiteListed ) && <NotWhiteListed /> }
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
                <span className="nft-name"><span className="name">{nft.name || nft.native.name}</span><NFTdetails nftInf={nft} index={index} /></span>
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
