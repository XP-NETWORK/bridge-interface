import { TESTNET_CHAIN_INFO, CHAIN_INFO } from "../../components/values";
import ChainService from "./chain";
import store from "../../store/store";
import { getFactory } from "../../wallet/helpers";
import { allchains, getAddEthereumChain } from "../../wallet/chains";

export async function switchNetwork(chain) {
    debugger;
    const {
        general: { testNet, bitKeep, from },
    } = store.getState();

    const info = testNet
        ? TESTNET_CHAIN_INFO[chain?.key]
        : CHAIN_INFO[chain?.key];
    const chainId = `0x${info.chainId.toString(16)}`;
    switch (true) {
        case bitKeep:
            try {
                await window.bitkeep.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: chainId }],
                });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        default:
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId }],
                });
                return true;
            } catch (error) {
                const c = testNet ? chain?.tnChainId : chain?.chainId;
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{ chainId: c }],
                });
                console.log(error);
                return false;
            }
    }

}
