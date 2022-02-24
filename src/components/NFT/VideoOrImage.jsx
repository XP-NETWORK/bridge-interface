import React, { useState } from "react";
import { setupURI } from "../../wallet/helpers";
import brokenUrl from "../../assets/img/brockenurl.png";
import BrockenUtlGridView from "./BrockenUtlGridView";


export default function VideoOrImage({ urls, i}) {
    console.log("🚀 ~ file: VideoOrImage.jsx ~ line 7 ~ VideoOrImage ~ i", i)
    const [tryVideo, setTryVideo] = useState(false)
    const [urlIndex, setUrlIndex] = useState(0)
    const [noURL, setNoURL] = useState(false)
    console.log("🚀 ~ file: VideoOrImage.jsx ~ line 10 ~ VideoOrImage ~ noURL", noURL)
    
    const imgError = e => {
      console.log("imgError: ", i)
        setTryVideo(true)
    }

  const videoError = e => {
      if(urlIndex < urls.length){
          setUrlIndex(urlIndex + 1)
          setTryVideo(false)
      }
  }

  return (
      tryVideo ? 
      <video onError={e => videoError(e)} controls={false} playsInline={true} autoPlay={true} loop={true} alt="video" src={noURL ? brokenUrl : setupURI(urls[urlIndex])} />
      :setupURI(urls[urlIndex]) === undefined ?
      <BrockenUtlGridView />
      :<img onError={e => imgError(e)} alt="nft" src={setupURI(urls[urlIndex])} />
  );
}
