import store from "../../../store/store.js";
import { getAddEthereumChain } from "../../../wallet/chains.js";

export async function switchNetwork(chain) {
    // eslint-disable-next-line no-debugger

    const {
        general: { testNet, evmProvider },
    } = store.getState();

    const id = (testNet ? chain.tnChainId : chain.chainId).toString();
    const ethereumChainsParams = getAddEthereumChain();

    const params = ethereumChainsParams[id];

    const copyParams = {
        chainName: params.name || params.chainName,
        chainId: `0x${Number(id).toString(16)}`,
        nativeCurrency: params.nativeCurrency,
        rpcUrls: params.rpcUrls,
    };

    const chainId = `0x${Number(id).toString(16)}`;
    const provider = evmProvider || window.ethereum;

    try {
        // console.log(chainId, "chainId");

        await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
        });
        // console.log(x);
        const currentChainId = await provider.request({
            method: "eth_chainId",
        });
        //console.log(currentChainId, "currentChainId");
        return currentChainId == chainId;
    } catch (error) {
        console.log(error);

        //error code 4001 means the use rejeected (cancelled) the request
        if (error.code !== 4001) {
            const value = await provider.request({
                method: "wallet_addEthereumChain",
                params: [copyParams],
            });

            // error code 4902 means  Unrecognized chain is selected and value null means user has add the network to wallet
            if (error.code === 4902 && value === null) {
                return true;
            }
        }
        return false;
    }
}
