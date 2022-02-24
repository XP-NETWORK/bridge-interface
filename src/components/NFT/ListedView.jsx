
import { getUrl } from "./NFTHelper"
import { isValidHttpUrl } from "../../wallet/helpers"
import { setupURI } from "../../wallet/oldHelper"
import BrokenUrlListedView from "./BrokenUrlListedView"
import VideoOrImageListed from "./VideoOrImageListed"
import VideoAndImage from "./VideoAndImage"

export default function ListedView({ nft, addRemoveNFT, index }) {

  const { video, videoUrl, image, imageUrl, ipfsArr } = getUrl(nft)

  return (
    <div onClick={e => addRemoveNFT ? addRemoveNFT(nft, e) : ''} className="listed__view">
        { nft.uri && isValidHttpUrl(nft.uri) ? 
          video && image ? <VideoAndImage videoUrl={videoUrl} imageUrl={imageUrl} />
          :image && !video ? <img alt="#" src={setupURI(imageUrl)} />
          : (!image && video) ? <div>Only video</div>
          : ipfsArr?.length && <VideoOrImageListed urls={ipfsArr} i={index} />
          : <BrokenUrlListedView />
        }  
    </div>
  )
}
