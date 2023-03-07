import React from "react";
import { useState } from "react";
// import { ReactComponent as Play } from "../../../src/assets/img/icons/_play.svg";
// import { ReactComponent as PlayHover } from "../../../src/assets/img/icons/hover_play.svg";
// import { ReactComponent as Pause } from "../../../src/assets/img/icons/_pause.svg";
// import { ReactComponent as PauseHover } from "../../../src/assets/img/icons/hover_pause.svg";
import Image from "./Image";
import PropTypes from "prop-types";

export default function VideoAndImage({ videoUrl, imageUrl, nft, onError }) {
  // const [play, setPlay] = useState(false);
  // const [playHover, setPlayHover] = useState(null);
  // const [pauseHover, setPauseHover] = useState(null);
  const play = false;
  const [mute] = useState(false);

  // const playHolder = (e, str) => {
  //   e.stopPropagation();
  //   switch (str) {
  //     case "play":
  //       setPlay(true);
  //       break;
  //     case "pause":
  //       setPlay(false);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <div className="play__container">
      {play ? (
        <div className="video__wrapper">
          <video
            src={videoUrl}
            controls={false}
            playsInline={true}
            autoPlay={false}
            loop={true}
            muted={!mute}
            poster={imageUrl}
          />
        </div>
      ) : (
        <Image nft={nft} onError={onError} />
      )}
      {/* Alex ask to hide this button for now. After we will discus about the position of the button */}

      {/* {play ? (
        pauseHover ? (
          <PauseHover
            onMouseEnter={() => setPauseHover(true)}
            onMouseLeave={() => setPauseHover(false)}
            className="video--toggle"
            onClick={(e) => playHolder(e, "pause")}
            video
          />
        ) : (
          <Pause
            onMouseEnter={() => setPauseHover(true)}
            onMouseLeave={() => setPauseHover(false)}
            className="video--toggle"
            onClick={(e) => playHolder(e, "pause")}
            video
          />
        )
      ) : playHover ? (
        <PlayHover
          onMouseEnter={() => setPlayHover(true)}
          onMouseLeave={() => setPlayHover(false)}
          className="image--toggle"
          onClick={(e) => playHolder(e, "play")}
        />
      ) : (
        <Play
          onMouseEnter={() => setPlayHover(true)}
          onMouseLeave={() => setPlayHover(false)}
          className="image--toggle"
          onClick={(e) => playHolder(e, "play")}
        />
      )} */}
    </div>
  );
}
VideoAndImage.propTypes = {
  videoUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  imageLoadedHandler: PropTypes.any,
  nft: PropTypes.object,
  onError: PropTypes.any,
};
