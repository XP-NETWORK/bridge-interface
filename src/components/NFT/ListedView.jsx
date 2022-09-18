import { getUrl } from "./NFTHelper";
import { checkMintWith, isValidHttpUrl } from "../../wallet/helpers";
import { setupURI } from "../../wallet/helpers";
import BrokenUrlListedView from "./BrokenUrlListedView";
import VideoOrImageListed from "./VideoOrImageListed";
import VideoAndImage from "./VideoAndImage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ListedView({ nft, addRemoveNFT, index }) {
  // const { video, videoUrl, image, imageUrl, ipfsArr } = getUrl(nft)

  const OFF = { pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const [brocken, setBrocken] = useState(false);
  const [verifiedContract, setVerifiedContract] = useState();
  const whitelisted = nft.whitelisted;

  useEffect(() => {
    /* const mw = async () => {
            const mintWith = await checkMintWith(
                from,
                to,
                nft.native.contract,
                nft.native.tokenId
            );
            if (mintWith) setVerifiedContract(true);
        };
        if (whitelisted && (from.type === "EVM" || from.type === "Elrond")) {
            mw();
        } else setVerifiedContract(true);*/
  }, [nft]);

  return (
    <div
      style={!nft.whitelisted /*|| !verifiedContract */ ? OFF : {}}
      className="listed__view"
    >
      {(nft.uri && !brocken) || (nft.image && !brocken) ? (
        nft.animation_url && nft.image ? (
          <VideoAndImage videoUrl={nft.animation_url} imageUrl={nft.image} />
        ) : nft.image && !nft.animation_url ? (
          <img
            onError={() => setBrocken(true)}
            alt="#"
            src={setupURI(nft.image)}
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
      {(!nft.whitelisted || !verifiedContract) && (
        <div className="not-whitelisted__img-cover"></div>
      )}
    </div>
  );
}
