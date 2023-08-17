import React from "react";

import { chainData } from "../utils";

export const LeftSide = ({ choosenChain }) => {
  return (
    <>
      <div className="left-side">
        <img
          className="nft-image"
          src={chainData[choosenChain].nft}
          alt={chainData[choosenChain].name}
        />
      </div>
    </>
  );
};
