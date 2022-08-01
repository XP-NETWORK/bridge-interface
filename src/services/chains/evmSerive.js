import { TESTNET_CHAIN_INFO, CHAIN_INFO } from "../../components/values";
import ChainService from "./chain";
import store from "../../store/store";

export async function switchNetwork(chain) {
    const {
        general: { testNet },
    } = store.getState();

    const info = testNet
        ? TESTNET_CHAIN_INFO[chain?.key]
        : CHAIN_INFO[chain?.key];
    const chainId = `0x${info.chainId.toString(16)}`;
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
