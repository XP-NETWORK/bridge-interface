import { TempleWallet } from "@temple-wallet/dapp";
import { getChainObject } from "../components/values";
import { connectHashPack } from "../components/Wallet/HederaWallet/hederaConnections";
import { connectTonWallet } from "../components/Wallet/TONWallet/TonConnectors";
import { switchNetwork } from "../services/chains/evm/evmService";
import { sleep } from "../utils";
import { injected } from "../wallet/connectors";
import { TChainConnect } from "./types/chainConnect.type.ts";
import { TConnectWallet } from "./types/connectWallet.type.ts";

const connectWallet: TConnectWallet = {
  HEDERA: async ({ network }) => {
    await connectHashPack(network);
    await sleep(10000);
  },

  TON: async ({ bridge, nonce }) => {
    const chainWrapper = await bridge.getChain(nonce);
    const account = await connectTonWallet();

    chainWrapper.setSigner({
      address: account.address,
      send: account.signer.send,
    });
  },

  EVM: async ({ bridge, nonce, activate }) => {
    bridge.currentType !== "EVM" && (await activate(injected));
    await switchNetwork(getChainObject(nonce));
  },

  TEZOS: async ({ bridge, nonce }) => {
    console.log({ bridge, nonce });
    const chain = await bridge.getChain(nonce);
    let account = {};
    const available = await TempleWallet.isAvailable();
    if (!available) {
      throw new Error("Temple Wallet not installed");
    }
    const wallet = new TempleWallet("XP.NETWORK Cross-Chain NFT Bridge");
    await wallet.connect({ name: "ghostnet", rpc: "https://rpc.ghostnet.teztnets.com/" });
    account = wallet;
    chain.setSigner(account);
  },
};

export const ConnectWalletByChain: TChainConnect = async (params) => {
  const { type } = params;
  console.log("inside: ", type);
  await connectWallet[type](params);
  await sleep(5000);
};
