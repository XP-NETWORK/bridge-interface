import React, { useState } from "react";
import { setupURI } from "../../wallet/helpers";
import brockenurl from "../../assets/img/brockenurl.png";

export default function VideoOrImage({ urls, i, imageLoadedHandler }) {
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
        else if(urlIndex >= urls.length)
        console.log("🚀 ~ file: VideoOrImage.jsx ~ line 20 ~ VideoOrImage ~ urlIndex", urlIndex)
       
        
        imageLoadedHandler(false)
    }

  return (
    //   noURL ?
      tryVideo ? 
      <video onError={e => videoError(e)} controls={false} playsInline={true} autoPlay={true} loop={true} alt="video" src={setupURI(urls[urlIndex])} />
      : 
      <img onError={e => imgError(e)} alt="image" src={setupURI(urls[urlIndex])} />
    //   :
    //   <div className="brocken-url"><img src={brockenurl} alt="uri is broken" /><span className="brocken-url__msg">NFTs URL<br /> is broken</span></div>
  );
}
