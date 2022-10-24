import React, { useState } from "react";
import brokenUrl from "../../assets/img/brockenurl.png";
import BrockenUtlGridView from "./BrockenUtlGridView";

export default function VideoOrImage({ urls, i }) {
    const [tryVideo, setTryVideo] = useState(false);
    const [urlIndex, setUrlIndex] = useState(0);
    const [noURL, setNoURL] = useState(false);

    const imgError = (e) => {
        setTryVideo(true);
    };

    const videoError = (e) => {
        if (urlIndex < urls.length) {
            setUrlIndex(urlIndex + 1);
            setTryVideo(false);
        }
    };

    return tryVideo ? (
        <video
            onError={(e) => videoError(e)}
            controls={false}
            playsInline={true}
            autoPlay={true}
            loop={true}
            alt="video"
            src={noURL ? brokenUrl : urls[urlIndex]}
        />
    ) : urls[urlIndex] === undefined ? (
        <BrockenUtlGridView />
    ) : (
        <img
            loading="lazy"
            onError={(e) => imgError(e)}
            alt="nft"
            src={urls[urlIndex]}
        />
    );
}
