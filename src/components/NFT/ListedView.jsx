
import { getUrl } from "./NFTHelper"
import { isValidHttpUrl } from "../../wallet/helpers"
import { setupURI } from "../../wallet/oldHelper"
import VideoOrImage from "./VideoOrImage"
import brockenurl from "../../assets/img/brockenurl.png"


export default function ListedView({ nft, addRemoveNFT }) {

    const { video, url, ipfsArr } = getUrl(nft)

  return (
    <div onClick={e => addRemoveNFT ? addRemoveNFT(nft, e) : ''} className="listed__view">
        { url && nft.uri && isValidHttpUrl(nft.uri) ? 
              (video && url) ? 
              <video  controls={false} playsInline={true} autoPlay={true} loop={true} src={setupURI(url)} /> 
              :
              <img  alt="NFT image" src={setupURI(url)} /> 
              :ipfsArr.length ? 
              <VideoOrImage urls={ipfsArr} />
              :
              <div className="brocken-url">
                  <img src={brockenurl} alt='This NFT image uri is broken.' />
                  <span className="brocken-url__msg">NFTs URL<br/> is broken</span>
              </div>
        }  
    </div>
  )
}