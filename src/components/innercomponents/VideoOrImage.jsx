import React, { useState } from "react";
import axios from "axios";
import { setupURI } from "../../wallet/helpers";

export default function VideoOrImage({ urls }) {
    console.log("VideoOrImage: ",urls);
    const [tryVideo, setTryVideo] = useState(false)
    const [urlIndex, setUrlIndex] = useState(0)
    console.log(`urlIndex: ${urlIndex}`)
    
    const imgError = e => {
        debugger
        console.log("imgError: ", urlIndex)
        setTryVideo(true)
    }

    const videoError = e => {
        debugger
        console.log("videoError: ", urlIndex)
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
