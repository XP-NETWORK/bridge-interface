/* eslint-disable react/prop-types */
import { React, useState } from "react";

import NFTgridView from "../NFT/NFTgridView";
import NFTlistView from "../NFT/NFTlistView";
import NFTlistTop from "./NFTlistTop";

import { useSelector } from "react-redux";
import Pagination from "./Pagination";

import withChains from "./hocs";

const NFTscreen = ({ chainSpecificRender }) => {
  const NFTListView = useSelector((state) => state.general.NFTListView);

  const [index, setIndex] = useState(0);

  return (
    <div className="nft_selectBox">
      <NFTlistTop chainSpecificRender={chainSpecificRender} />
      {NFTListView ? (
        <NFTlistView />
      ) : (
        <NFTgridView
          scrollIndex={index}
          setIndex={setIndex}
          chainSpecificRender={chainSpecificRender}
        />
      )}
      <Pagination />
    </div>
  );
};

export default withChains(NFTscreen);
