import React, { useState } from "react";
import brokenUrl from "../../assets/img/brockenurl.png";
import BrockenUtlGridView from "./BrockenUtlGridView";
import PropTypes from "prop-types";

export default function VideoOrImage({ urls }) {
  const [tryVideo, setTryVideo] = useState(false);
  const [urlIndex, setUrlIndex] = useState(0);
  const [noURL] = useState(false);

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

VideoOrImage.propTypes = {
  urls: PropTypes.array,
};
