import React from "react";
// import { setupURI } from "../../wallet/helpers";
import BrokenUrlListedView from "./BrokenUrlListedView";
import VideoOrImageListed from "./VideoOrImageListed";
import VideoAndImage from "./VideoAndImage";
import { useState } from "react";
import PropTypes from "prop-types";

export default function ListedView({ nft, index }) {
    // const { video, videoUrl, image, imageUrl, ipfsArr } = getUrl(nft)

    const OFF = { pointerEvents: "none" };
    const [brocken, setBrocken] = useState(false);

    return (
        <div
            style={!nft.whitelisted /*|| !verifiedContract */ ? OFF : {}}
            className="listed__view"
        >
            {(nft.uri && !brocken) || (nft.image && !brocken) ? (
                nft.animation_url && nft.image ? (
                    <VideoAndImage
                        videoUrl={nft.animation_url}
                        imageUrl={nft.image}
                        nft={nft}
                    />
                ) : nft.image && !nft.animation_url ? (
                    <img
                        onError={() => setBrocken(true)}
                        alt="#"
                        src={nft.image}
                    />
                ) : !nft.image && nft.animation_url ? (
                    <video src={nft.animation_url} />
                ) : (
                    [nft.animation_url, nft.image]?.length && (
                        <VideoOrImageListed
                            urls={[nft.animation_url, nft.image]}
                            i={index}
                        />
                    )
                )
            ) : (
                <BrokenUrlListedView />
            )}
            {!nft.whitelisted && (
                <div className="not-whitelisted__img-cover"></div>
            )}
        </div>
    );
}
ListedView.propTypes = {
    nft: PropTypes.object,
    addRemoveNFT: PropTypes.any,
    index: PropTypes.string,
};
