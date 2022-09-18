import React, { useState } from "react";
import { setupURI } from "../../wallet/helpers";

export default function Image({ nft, index, onError }) {
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
          src={setupURI(nft.image)}
        />
      )}
    </div>
  );
}
