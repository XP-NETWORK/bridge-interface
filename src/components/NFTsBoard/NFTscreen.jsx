import { useEffect, useRef, useState } from "react";

import NFTgridView from "../NFT/NFTgridView";
import NFTlistView from "../NFT/NFTlistView";
import NFTlistTop from "./NFTlistTop";

import { useDispatch, useSelector } from "react-redux";

const NFTscreen = () => {
    const NFTListView = useSelector((state) => state.general.NFTListView);

    const [index, setIndex] = useState(0);

    return (
        <div className="nft_selectBox">
            <NFTlistTop />
            {NFTListView ? (
                <NFTlistView />
            ) : (
                <NFTgridView scrollIndex={index} setIndex={setIndex} />
            )}
            {/* <div className="algo-claimable">
      // TODO Algorand Claimable
    </div> */}
        </div>
    );
};

export default NFTscreen;
