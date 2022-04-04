import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedNFTList,removeFromSelectedNFTList, updateNFTs } from "../../store/reducers/generalSlice";
import NFTdetails from './NFTdetails'
import { useSelector } from "react-redux";
import { setupURI } from "../../wallet/oldHelper";
import { getUrl, isWhiteListed } from "./NFTHelper.js";
import { isValidHttpUrl, parseEachNFT } from "../../wallet/helpers";
import VideoOrImage from "./VideoOrImage";
import VideoAndImage from "./VideoAndImage"
import NotWhiteListed from "./NotWhiteListed"
import BrockenUtlGridView from "./BrockenUtlGridView";
import "./NewNFT.css";
import Preload from "./Preload";


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
    const [dataLoaded, setDataloaded] = useState(false)
    

    useEffect(async() => {
      const whitelisted = await isWhiteListed(from.text, nft)
      setWhitelisted(whitelisted)
    },)

    useEffect(async() => {
      const loaded = await parseEachNFT(nft, index)
      setDataloaded(loaded)
      const whitelisted = await isWhiteListed(from.text, nft)
      dispatch(updateNFTs({whitelisted, nft}))
    },[])
    

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
          { !nft.dataLoaded ? <Preload /> : 
          <div onClick={() => whiteListed ? addRemoveNFT(nft, index): undefined } className={isSelected ? "nft__card--selected" : "nft__card"}>
            <div className="nft__main">
              { nft.uri && isValidHttpUrl(nft.uri, index) ? 
                video && image ? <VideoAndImage index={index} imageLoaded={() => imageLoadedHandler} videoUrl={videoUrl} imageUrl={imageUrl} />
              : image && !video ? <img onLoad={() => imageLoadedHandler} alt=""  src={setupURI(imageUrl)} /> 
              : !image && video ? <video onLoadedData={imageLoadedHandler} controls={false}  playsInline={true} autoPlay={true} loop={true}  muted={true} src={setupURI(videoUrl)} />
              : ipfsArr?.length > 0 && <VideoOrImage urls={ipfsArr} i={index} />
              : <BrockenUtlGridView />
              }
              { !isSelected ? <div className="nft-radio"></div> : <div className="nft-radio--selected"></div> }
              { !whiteListed && <NotWhiteListed /> }
            </div>
            <div className="nft__footer">
                <span className="nft-name"><span className="name">{nft.name || nft.native.name}</span><NFTdetails nftInf={nft} index={index} /></span>
                <span className="nft-number">{nft.native.tokenId}</span>
            </div>
          </div>
          }
        </div>
      );
}


{/* <div className={isSelected ? "nft-box__container--selected" : "nft-box__container"}>
<div onClick={() => whiteListed ? addRemoveNFT(nft, index): undefined} className="nft-image__container">
  <div className="image__wrapper">
    { nft.uri && isValidHttpUrl(nft.uri, index) ? 
      video && image ? <VideoAndImage index={index} imageLoaded={() => imageLoadedHandler} videoUrl={videoUrl} imageUrl={imageUrl} />
    : image && !video ? <img onLoad={() => imageLoadedHandler} alt="only image"  src={setupURI(imageUrl)} /> 
    : !image && video ? <video onLoadedData={imageLoadedHandler} controls={false}  playsInline={true} autoPlay={true} loop={true}  muted={true} src={setupURI(videoUrl)} />
    : ipfsArr?.length > 0 && <VideoOrImage urls={ipfsArr} i={index} />
    : <BrockenUtlGridView />
    }
    { !isSelected ? <div className="nft-radio"></div> : <div className="nft-radio--selected"></div> }
  </div>
  { !whiteListed && <NotWhiteListed /> }
</div>
<div className={`nft-content__container ${!imageLoaded ? "preload-content-container" : ""}`}>
  <span className="nft-name"><span className="name">{nft.name || nft.native.name}</span><NFTdetails nftInf={nft} index={index} /></span>
  <span className="nft-number">{nft.native.tokenId}</span>
</div>
</div> */}