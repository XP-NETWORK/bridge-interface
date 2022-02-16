import React, { useEffect } from "react";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { ReactComponent as Back } from "../../assets/img/icons/Back.svg";
import { useSelector } from "react-redux";
import {
  cleanSelectedNFTList,
  removeFromSelectedNFTList,
} from "../../store/reducers/generalSlice";
import { useDispatch } from "react-redux";
import brockenurl from "../../assets/img/brockenurl.png";
import { isValidHttpUrl } from "../../wallet/helpers";
import { setupURI } from "../../wallet/oldHelper";

function SelectedNFT() {
  const dispatch = useDispatch();
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
  const nfts = useSelector((state) => state.general.NFTList);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const handleClear = () => {
    dispatch(cleanSelectedNFTList());
  };

  const handleRemove = (nft) => {
    dispatch(removeFromSelectedNFTList(nft));
  };

  useEffect(() => {}, [selectedNFTs]);

  return (
    <div className="nftSelectList">
      <div className="nftSeleTop">
        <div className="selectedNft nftselectedtop">
          <a className="backBtn mobileOnly">
            <Back className="svgWidget" />
          </a>
          <span className="mobileOnly">Selected NFTs</span>
          <span className="desktopOnly">
            Selected NFTs{" "}
            <span>
              {selectedNFTs.length} / {nfts?.length}
            </span>
          </span>
          <button
            style={selectedNFTs.length ? {} : OFF}
            onClick={() => handleClear()}
            className="clearNft"
          >
            Clear all
          </button>
        </div>
      </div>
      <ul className="nftSelected">
        {selectedNFTs
          ? selectedNFTs.map((nft, index) => (
              <li
                key={`selected-nft-${index}`}
                onClick={() => handleRemove(nft)}
                className="nftSelecItem"
              >
                <ListedView nft={nft} key={`nft-n-${index}`} />
                <span className="nftSelecItem__name">
                  {nft.data?.name || nft.name}
                </span>
                <span className="Close">
                  <Close className="svgWidget" />
                </span>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}

export default SelectedNFT;
