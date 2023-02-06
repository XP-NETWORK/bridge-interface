import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Image({ nft, onError }) {
  const isInlineSvg = /^data:image\/svg\+xml;utf8/.test(nft.image);

  const [loaded, setLoaded] = useState(isInlineSvg);

  let image = nft && (
    <img
      onLoad={() => setLoaded(true)}
      onError={() => onError(true)}
      alt={nft.name || nft.description || undefined}
      src={nft.image}
    />
  );

  if (isInlineSvg) {
    image = (
      <div
        style={{ width: "100%", height: "100%" }}
        dangerouslySetInnerHTML={{
          __html: nft.image.replace(/^data:image\/svg\+xml;utf8,/, "").trim(),
        }}
      ></div>
    );
  }

  return (
    <div
      className={!loaded ? "img-component__wrapper--loading" : ""}
      style={isInlineSvg ? { width: "100%", height: "100%" } : {}}
    >
      {!loaded && <div className="img-component__loader"></div>}
      {image}
    </div>
  );
}

Image.propTypes = {
  nft: PropTypes.any,
  onError: PropTypes.any,
};
