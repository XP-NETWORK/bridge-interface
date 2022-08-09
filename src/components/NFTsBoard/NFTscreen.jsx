import { useEffect, useRef, useState } from "react";

import NFTgridView from "../NFT/NFTgridView";
import NFTlistView from "../NFT/NFTlistView";
import NFTlistTop from "./NFTlistTop";

import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";

const NFTscreen = () => {
    const NFTListView = useSelector((state) => state.general.NFTListView);
    const nfts = useSelector((state) => state.general.NFTList);

    const [index, setIndex] = useState(0);

    return (
        <div className="nft_selectBox">
            <NFTlistTop />
            {NFTListView ? (
                <NFTlistView />
            ) : (
                <NFTgridView scrollIndex={index} setIndex={setIndex} />
            )}
            {nfts && <Pagination />}
        </div>
    );
};

export default NFTscreen;
