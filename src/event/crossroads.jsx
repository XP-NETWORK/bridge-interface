import React from "react";
import { EventPage } from "./components";
import { chainData } from "./components/mainSection/utils";
import successImage from "./assets/mainSection/CUSTOM xp nft (1) 1-min.png";

const Crossroads = () => {
  return (
    <EventPage
      title={"XP Crossroads"}
      description={
        "A unique multi-chain NFT collection that celebrates the bridging campaign between XP.NETWORK and Aurora."
      }
      chains={chainData}
      useContractVariable={false}
      headerClass={"event-header"}
      className={"nft-image"}
      successImage={successImage}
    />
  );
};

export default Crossroads;
