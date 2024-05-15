import React from "react";

export const LeftSide = ({ choosenChain, chains }) => {
  return (
    <>
      <div className="left-side">
        <img
          className="nft-image"
          src={chains[choosenChain].nft}
          alt={chains[choosenChain].name}
        />
      </div>
    </>
  );
};
