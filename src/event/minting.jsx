import React from "react";
import { EventPage } from "./components";
import {
  chainDataMintingPath,
  chainDataMintingPathTestnet,
} from "./components/mainSection/utils";

const Minting = () => {
  const chains = window.location.pathname.includes("testnet")
    ? chainDataMintingPathTestnet
    : chainDataMintingPath;
  return (
    <EventPage
      title={"Multi-chain Passage Masterpieces"}
      description={
        "A unique multi-chain NFT collection that celebrates the bridging campaigns with XP.NETWORK partners."
      }
      chains={chains}
      headerClass={"event-header-mint"}
      className={"nft-image-minting"}
    />
  );
};

export default Minting;
