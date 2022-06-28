import {
  setSelectedNFTList,
  removeFromSelectedNFTList,
} from "../../store/reducers/generalSlice";
import NFTdetails from "../NFT/NFTdetails";
import { useDispatch, useSelector } from "react-redux";
import NFTempty from "../innercomponents/NFTempty";
import CheckGreen from "../../assets/img/icons/check_green.svg";
import ListedView from "../NFT/ListedView";
import { useState } from "react";
import { useEffect } from "react";
import { isWhiteListed } from "./NFTHelper";
import NFTlistedCard from "./NFTlistedCard";

function NFTlistView() {
  const nfts = useSelector((state) => state.general.NFTList);
  const search = useSelector((state) => state.general.NFTListSearch);

  return (
    <div className="nftListBox nftListView">
      <ul className="nftList">
        {nfts?.length ? (
          !search ? (
            nfts.map((nft, index) => (
              <NFTlistedCard
                nft={nft}
                index={index}
                key={index + "listedview"}
              />
            ))
          ) : (
            nfts
              .filter(
                (nft, index) =>
                  nft?.name?.includes(search ? search : "") ||
                  nft?.native.owner?.includes(search ? search : "")
              )
              .map((nft, index) => <NFTlistedCard nft={nft} index={index} />)
          )
        ) : (
          <NFTempty />
        )}
      </ul>
    </div>
  );
}

export default NFTlistView;
