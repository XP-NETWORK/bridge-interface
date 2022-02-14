
import { useEffect } from "react"
import { useState } from "react"
import {  getUrl, NFTHelper } from "../../components/innercomponents/NFTHelper"
import { isValidHttpUrl } from "../../wallet/helpers"
import { setupURI } from "../../wallet/oldHelper"
import VideoOrImage from "../innercomponents/VideoOrImage"

export default function ListedView({ nft, addRemoveNFT }) {

    const { video, url, ipfsArr } = getUrl(nft)
    console.log(`ListedView video: ${video} url: ${url}`)

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
                  <img alt='This NFT image uri is broken.' />
                  <span className="brocken-url__msg">NFTs URL<br/> is broken</span>
              </div>
        }  
    </div>
  )
}
