import React, { useState } from "react";
import BrokenUrlListedView from "./BrokenUrlListedView";
import PropTypes from "prop-types";

export default function VideoOrImage({ urls }) {
    const [tryVideo, setTryVideo] = useState(false);
    const [urlIndex, setUrlIndex] = useState(0);

    const imgError = () => {
        setTryVideo(true);
    };

    const videoError = () => {
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
            src={urls[urlIndex]}
        />
    ) : urls[urlIndex] === undefined ? (
        <BrokenUrlListedView />
    ) : (
        <img onError={(e) => imgError(e)} alt="nft" src={urls[urlIndex]} />
    );
}
VideoOrImage.propTypes = {
    urls: PropTypes.array,
};
