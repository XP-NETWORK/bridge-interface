import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromSelectedNFTList,
  setSelectedNFTList,
} from "../../store/reducers/generalSlice";
import ListedView from "./ListedView";
import { useEffect } from "react";
import NFTdetails from "./NFTdetails";
import { parseNFT } from "../../wallet/nftParser";
import PropTypes from "prop-types";

export default function NFTlistedCard({ serviceContainer, chain, nft, index }) {
  const dispatch = useDispatch();
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);

  const testnet = useSelector((state) => state.general.testNet);
  const [detailsOn, setDetailsOn] = useState(false);

  const [_width] = useState(Math.floor(Math.random() * 125 + 35));
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState();
  const options = useMemo(() => {
    return {
      root: null,
      tootMargin: "0px",
      threshold: 0.3,
    };
  }, []);

  const callBackWhenObserver = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const checkIfSelected = (nft) => {
    return selectedNFTs.filter(
      (n) =>
        n.native.tokenId === nft.native.tokenId &&
        n.native.contract === nft.native.contract &&
        n.native.chainId === nft.native.chainId
    )[0];
  };

  function addRemoveNFT(nft) {
    if (!checkIfSelected(nft)) {
      dispatch(setSelectedNFTList(nft));
    } else {
      dispatch(removeFromSelectedNFTList(nft));
    }
  }

  useEffect(() => {
    if (isVisible) {
      if (!nft.dataLoaded) {
        const _nft = chain.preParse(nft);
        parseNFT(serviceContainer, _nft, index, testnet);
      }
    }
  }, [isVisible, nft]);

  useEffect(() => {
    const observer = new IntersectionObserver(callBackWhenObserver, options);
    const currentTarget = cardRef.current;
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [cardRef, options]);

  return (
    <div ref={cardRef}>
      {nft.dataLoaded ? (
        <li
          onClick={(e) => (nft.whitelisted ? addRemoveNFT(nft, e) : undefined)}
          // onMouseEnter={() => setOnHover(true)}
          // onMouseLeave={() => setOnHover(false)}
          className="nftListed nftSelect"
        >
          <div className="nftListed__info">
            {nft.whitelisted && !detailsOn ? (
              !checkIfSelected(nft, selectedNFTs) ? (
                <div className="listed-nft-radio"></div>
              ) : (
                <div
                  onClick={(e) => addRemoveNFT(nft, e)}
                  className="listed-nft-radio--selected"
                ></div>
              )
            ) : (
              <div className="empty-radio"></div>
            )}
            <ListedView nft={nft} key={`nft-n-${index}`} />
            <span className="name">
              {nft.whitelisted
                ? nft.name || nft.native.name
                : "Not Whitelisted"}
            </span>
          </div>
          {nft.whitelisted ? (
            <NFTdetails details={setDetailsOn} nftInf={nft} />
          ) : (
            <a
              rel="noreferrer"
              href="https://t.me/XP_NETWORK_Bridge_Support_Bot?start=startwithxpbot"
              className="listed-view__not-whitelisted__button"
              target="_blank"
            >
              Tech support
            </a>
          )}
        </li>
      ) : (
        <div className="listed__skeleton">
          <div className="listed_sceleton_wrap">
            <div className="image"></div>
            <div style={{ width: _width }} className="name"></div>
          </div>
        </div>
      )}
    </div>
  );
}
NFTlistedCard.propTypes = {
  nft: PropTypes.object,
  index: PropTypes.string,
  chain: PropTypes.object,
  serviceContainer: PropTypes.object,
};
