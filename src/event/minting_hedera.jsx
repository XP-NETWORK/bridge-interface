import React from "react";
import { EventPage } from "./components";
import {
  chainDataMintingPathHedera,
  chainDataMintingPathHederaTestnet,
} from "./components/mainSection/utils";
import successImage from "./assets/mainSection/image.png";

const MintingHedera = () => {
  const chains = window.location.pathname.includes("testnet")
    ? chainDataMintingPathHederaTestnet
    : chainDataMintingPathHedera;
  return (
    <EventPage
      title={"Multi-chain Passage Masterpieces"}
      description={
        "A unique multi-chain NFT collection that celebrates the bridging campaigns with XP.NETWORK partners."
      }
      chains={chains}
      headerClass={"event-header-hedera"}
      className={"nft-image-minting-hedera"}
      useContractVariable={true}
      successImage={successImage}
    />
  );
};

export default MintingHedera;
