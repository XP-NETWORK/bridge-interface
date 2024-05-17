import React from "react";

export const LeftSide = ({ choosenChain, chains, className }) => {
  return (
    <>
      <div className="left-side">
        <img
          className={className ?? "nft-image"}
          src={chains[choosenChain].nft}
          alt={chains[choosenChain].name}
        />
      </div>
    </>
  );
};
