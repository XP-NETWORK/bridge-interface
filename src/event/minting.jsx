import React from "react";
import { EventPage } from "./components";
import {
  chainDataMintingPath,
  chainDataMintingPathTestnet,
} from "./components/mainSection/utils";
import successImage from "./assets/mainSection/image.png";

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
      useContractVariable={true}
      successImage={successImage}
    />
  );
};

export default Minting;
