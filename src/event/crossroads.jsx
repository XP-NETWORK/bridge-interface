import React from "react";
import { EventPage } from "./components";
import { chainData } from "./components/mainSection/utils";

const Crossroads = () => {
  return (
    <EventPage
      title={"XP Crossroads"}
      description={
        "A unique multi-chain NFT collection that celebrates the bridging campaign between XP.NETWORK and Aurora."
      }
      chains={chainData}
    />
  );
};

export default Crossroads;
