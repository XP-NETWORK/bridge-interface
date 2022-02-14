import React, { useState } from "react";
import axios from "axios";
import { setupURI } from "../../wallet/helpers";

export default function VideoOrImage({ urls }) {

    const [tryVideo, setTryVideo] = useState(false)
    const [urlIndex, setUrlIndex] = useState(0)

    
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
      : 
      <img onError={e => imgError(e)} alt="image" src={setupURI(urls[urlIndex])} />
  );
}
