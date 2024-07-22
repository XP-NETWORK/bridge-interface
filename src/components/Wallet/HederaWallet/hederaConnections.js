/* eslint-disable no-debugger */
import { HashConnect } from "hashconnect";
import { LedgerId } from "@hashgraph/sdk";
import icon from "./../../../assets/img/icons/XPNET.svg";

let network = location.pathname.includes("testnet");
export const hashConnect = new HashConnect(
  network ? LedgerId.TESTNET : LedgerId.MAINNET,
  network
    ? "bfa190dbe93fcf30377b932b31129d05"
    : "03182f28980fc53e57d43b0af01fc044",
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
  let initData;
  try {
    console.log("network", testnet);
    initData = await hashConnect.init();
    if (hashConnect.connectedAccountIds.length > 0) {
      console.log(hashConnect.connectedAccountIds);
    } else {
      hashConnect.openPairingModal();
    }
    return initData;
  } catch (error) {
    console.log(error, "err2or");
    return false;
  }
};

export const disconnect = async () => {
  try {
    await hashConnect.disconnect();
    console.log("disconnect");
  } catch (ex) {
    console.log(ex, "disconnect err2or");
    return true;
  }
};
