
import { getUrl } from "./NFTHelper"
import { isValidHttpUrl } from "../../wallet/helpers"
import { setupURI } from "../../wallet/oldHelper"
import VideoOrImage from "./VideoOrImage"
import brokenUrl from "../../assets/img/brockenurl.png"
import BrokenUrlListedView from "./BrokenUrlListedView"
import VideoOrImageListed from "./VideoOrImageListed"
import { useState } from "react"
import VideoAndImage from "./VideoAndImage"

export default function ListedView({ nft, addRemoveNFT, index }) {

  const { video, videoUrl, image, imageUrl, ipfsArr } = getUrl(nft)
  const [brokenURL, setBrokenURL] = useState()
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageLoadedHandler = () => {
    setImageLoaded(true)
  }

  return (
    <div onClick={e => addRemoveNFT ? addRemoveNFT(nft, e) : ''} className="listed__view">
        { nft.uri && isValidHttpUrl(nft.uri) && !brokenURL  ? 
          video && image ? <VideoAndImage imageLoaded={() => imageLoadedHandler} videoUrl={videoUrl} imageUrl={imageUrl} />
          :image && !video ? <img onLoad={() => imageLoadedHandler } alt="#" src={setupURI(imageUrl)} />
          : (!image && video) ? <div>Only video</div>
          : ipfsArr?.length && <VideoOrImageListed urls={ipfsArr} i={index} />
          : <BrokenUrlListedView />
        }  
    </div>
  )
}
