import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import * as allChains from "wagmi/chains";
import { configureChains, createClient } from "wagmi";
import { chains } from "../../values";
// export const skale = {
//     id: 43_114,
//     name: 'Avalanche',
//     network: 'avalanche',
//     nativeCurrency: {
//       decimals: 18,
//       name: 'Avalanche',
//       symbol: 'AVAX',
//     },
//     rpcUrls: {
//       public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
//       default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
//     },
//     blockExplorers: {
//       etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//       default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//     },
//     contracts: {
//       multicall3: {
//         address: '0xca11bde05977b3631167028862be2a173976ca11',
//         blockCreated: 11_907_934,
//       },
//     },
//   } as const satisfies Chain

export const wcId = "d61f00671338b982a0b8a236682e2b1d";
export const allWc2Chains = Object.keys(allChains).map((key) => allChains[key]);

export const wcSupportedChains = allWc2Chains.filter((wcChain) => {
  const find = chains.filter((chain) => {
    if (
      chain.type === "EVM" &&
      (chain.text.toLowerCase().includes(wcChain.name.toLowerCase()) ||
        chain.text.toLowerCase().includes(wcChain.network.toLowerCase()))
    ) {
      return chain;
    }
  });
  if (find.length > 0) {
    return wcChain;
  }
});

const { provider } = configureChains(wcSupportedChains, [
  walletConnectProvider({ projectId: wcId }),
]);

export const wagmiClient = createClient({
  autoConnect: true,

  connectors: modalConnectors({
    projectId: wcId,
    version: "1",

    appName: "XP.NETWORK Multi-chain NFT bridge",
    chains: wcSupportedChains,
  }),
  provider,
});

export const ethereumClient = new EthereumClient(
  wagmiClient,
  wcSupportedChains
);

export const createSafeStorage = () => {
  window.safeLocalStorage = {
    getItem(key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.log("error in safeLocalStorage", e);
        return undefined;
      }
    },
    setItem(key, val) {
      try {
        return localStorage.setItem(key, val);
      } catch (e) {
        console.log("error in safeLocalStorage", e);
        return undefined;
      }
    },
    removeItem(key) {
      try {
        return localStorage.removeItem(key);
      } catch (e) {
        console.log("error in safeLocalStorage", e);
        return undefined;
      }
    },
    clear() {
      try {
        return localStorage.clear();
      } catch (e) {
        console.log("error in safeLocalStorage", e);
        return undefined;
      }
    },
  };
};
