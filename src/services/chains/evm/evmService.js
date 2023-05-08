import Web3 from "web3";
import store from "../../../store/store.js";
import { getAddEthereumChain } from "../../../wallet/chains.js";
import { chains } from "../../../components/values.js";
import { setFrom } from "../../../store/reducers/generalSlice.js";
import { setWalletAddress } from "../../../store/reducers/signersSlice.js";
export async function switchNetwork(chain) {
    // eslint-disable-next-line no-debugger

  const {
    general: { testNet, bitKeep, from },
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

  switch (true) {
    case bitKeep:
      try {
        await window.bitkeep.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: +chainId }],
        });
        let provider = window.bitkeep?.ethereum
        const web3 = new Web3(provider)
        const currentBitkeepChainId = await web3.eth.getChainId()
        const fromChain = chains.filter(
          (n) => n.text === from?.text
        )[0];
        if (fromChain) {
          store.dispatch(setFrom(fromChain));
          const accounts = await web3.eth.getAccounts();
          store.dispatch(setWalletAddress(await accounts[0]));
        }
        return currentBitkeepChainId == chainId;
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
        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });

                return currentChainId == chainId;
            } catch (error) {
                console.log(error);

                //error code 4001 means the use rejeected (cancelled) the request
                if (error.code !== 4001) {
                    const value = await window.ethereum.request({
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
}
