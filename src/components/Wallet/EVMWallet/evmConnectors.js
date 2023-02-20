import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";
import {
    avalanche,
    bsc,
    mainnet,
    aurora,
    fantom,
    gnosis,
    iotex,
    moonbeam,
    okc,
    polygon,
} from "wagmi/chains";
import { configureChains, createClient } from "wagmi";
// import { Chain } from 'wagmi'

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

export const wcId = process.env.REACT_APP_WALLETCONNECT_APP_ID;
export const wcSupportedChains = [
    avalanche,
    bsc,
    mainnet,
    aurora,
    fantom,
    gnosis,
    moonbeam,
    iotex,
    okc,
    polygon,
];

const { provider } = configureChains(wcSupportedChains, [
    walletConnectProvider({ projectId: wcId }),
]);

export const wagmiClient = createClient({
    autoConnect: false,
    connectors: modalConnectors({
        projectId: process.env.REACT_APP_WALLETCONNECT_APP_ID,
        version: "1",
        appName: "XP.NETWORK Multi-chain NFT bridge",
        wcSupportedChains,
    }),
    provider,
});

export const ethereumClient = new EthereumClient(
    wagmiClient,
    wcSupportedChains
);
