
import { getUrl } from "./NFTHelper"
import { isValidHttpUrl } from "../../wallet/helpers"
import { setupURI } from "../../wallet/oldHelper"
import BrokenUrlListedView from "./BrokenUrlListedView"
import VideoOrImageListed from "./VideoOrImageListed"
import VideoAndImage from "./VideoAndImage"

export default function ListedView({ nft, addRemoveNFT, index }) {

  // const { video, videoUrl, image, imageUrl, ipfsArr } = getUrl(nft)

  const OFF = {pointerEvents: "none"}

  return (
    <div style={!nft.whitelisted ? OFF : {}} className="listed__view">
        { nft.uri ? 
          nft.animation_url && nft.image ? <VideoAndImage videoUrl={nft.animation_url} imageUrl={nft.image} />
          :nft.image && !nft.animation_url ? <img alt="#" src={setupURI(nft.image)} />
          : (!nft.image && nft.animation_url) ? <video src={nft.animation_url} />
          : [nft.animation_url,nft.image]?.length && <VideoOrImageListed urls={[nft.animation_url,nft.image]} i={index} />
          : <BrokenUrlListedView />
        } 
        { !nft.whitelisted && <div className="not-whitelisted__img-cover"></div>}
    </div>
  )
}
