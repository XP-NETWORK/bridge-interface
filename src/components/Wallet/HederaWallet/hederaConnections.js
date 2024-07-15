/* eslint-disable no-debugger */
import { HashConnect } from "hashconnect";
import { LedgerId } from "@hashgraph/sdk";
import icon from "./../../../assets/img/icons/XPNET.svg";

export const hashConnect = new HashConnect(
  LedgerId.TESTNET,
  "bfa190dbe93fcf30377b932b31129d05",
  {
    url: location.origin,
    name: "XP.NETWORK Multi-chain NFT bridge",
    description:
      "Seamlessly move assets between chains | The first multichain NFT bridge to connect all major Blockchains into one ecosystem",
    icons: [icon],
  },
  true
);

export const connectHashPack = async (testnet) => {
  // debugger;
  let initData;
  try {
    console.log("asdfasdf", testnet);
    initData = await hashConnect.init();
    hashConnect.openPairingModal();
    return initData;
  } catch (error) {
    console.log(error, "err2or");
    return false;
  }
};
