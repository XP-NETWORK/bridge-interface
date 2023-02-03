import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Image({ nft, onError }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={
        !loaded ? "img-component__wrapper--loading" : "img-component__wrapper"
      }
    >
      {!loaded && <div className="img-component__loader"></div>}
      {nft && (
        <img
          onLoad={() => setLoaded(true)}
          onError={() => onError(true)}
          alt={nft.name || nft.description || undefined}
          src={nft.image}
        />
      )}
    </div>
  );
}

Image.propTypes = {
  nft: PropTypes.any,
  onError: PropTypes.any,
};
