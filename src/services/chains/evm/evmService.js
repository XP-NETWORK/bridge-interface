import store from "../../../store/store.js";
import { getAddEthereumChain } from "../../../wallet/chains.js";

export async function switchNetwork(chain) {
  // eslint-disable-next-line no-debugger

  const {
    general: { evmProvider },
  } = store.getState();

  const id = chain.chainId.toString();
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
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });

    const currentChainId = await provider.request({
      method: "eth_chainId",
    });

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
