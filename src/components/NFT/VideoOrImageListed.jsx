import React, { useState } from "react";
import { setupURI } from "../../wallet/helpers";
import BrokenUrlListedView from "./BrokenUrlListedView";

export default function VideoOrImage({ urls, i}) {
    const [tryVideo, setTryVideo] = useState(false)
    const [urlIndex, setUrlIndex] = useState(0)
    const [noURL, setNoURL] = useState(false)
    
    const imgError = e => {
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
      <video onError={e => videoError(e)} controls={false} playsInline={true} autoPlay={true} loop={true} alt="video" src={setupURI(urls[urlIndex])} />
      :setupURI(urls[urlIndex]) === undefined ?
      <BrokenUrlListedView />
      :<img onError={e => imgError(e)} alt="nft" src={setupURI(urls[urlIndex])} />
  );
}
