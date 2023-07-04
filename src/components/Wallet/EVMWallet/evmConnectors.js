import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from "@web3modal/ethereum";

import { configureChains, createConfig } from "wagmi";
import * as wagamiChains from "wagmi/chains";
import { chains as bridgeChains } from "../../values";

export const chains = bridgeChains
    .filter(
        (chain) =>
            chain.type === "EVM" &&
            wagamiChains[chain.wagmi || chain.key.toLowerCase()]
    )
    .map((chain) => wagamiChains[chain.wagmi || chain.key.toLowerCase()]);

export const wcId = "d61f00671338b982a0b8a236682e2b1d";

const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId: wcId }),
]);

export const wagmiConfig = createConfig({
    connectors: w3mConnectors({ chains, projectId: wcId }),
    publicClient,
});
export const ethereumClient = new EthereumClient(wagmiConfig, chains);

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
