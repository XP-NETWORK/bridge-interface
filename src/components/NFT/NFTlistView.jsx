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
import { withSecretAuth } from "../Modals/ImportNFTModal/SecretAuth";

function NFTlistView({ secretRender }) {
    const nfts = useSelector((state) => state.general.NFTList);
    const currentsNFTs = useSelector((state) => state.general.currentsNFTs);

    const search = useSelector((state) => state.general.NFTListSearch);

    return (
        <div className="nftListBox nftListView">
            {secretRender && secretRender()}
            <ul className="nftList">
                {currentsNFTs?.length ? (
                    currentsNFTs.map((nft, index) => (
                        <NFTlistedCard
                            nft={nft}
                            index={index}
                            key={index + "listedview"}
                        />
                    ))
                ) : (
                    <NFTempty />
                )}
            </ul>
        </div>
    );
}

export default withSecretAuth(NFTlistView);
