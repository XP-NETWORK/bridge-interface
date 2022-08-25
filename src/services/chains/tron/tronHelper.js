import { chainsConfig, CHAIN_INFO } from "../../../components/values";
import { getFactory } from "../../../wallet/helpers";
import store from "../../../store/store.js";
import {
    setTransferLoaderModal,
    setTxnHash,
} from "../../../store/reducers/generalSlice";

export const transferNFTFromTran = async ({
    to,
    from,
    nft,
    receiver,
    fee,
    index,
    txnHashArr,
    chainConfig,
    testnet,
}) => {
    debugger;
    const factory = await getFactory();
    const toChain = await factory.inner(chainsConfig[to.text].Chain);
    const fromChain = await factory.inner(chainsConfig[from.text].Chain);
    const fromNonce = CHAIN_INFO[from.text].nonce;
    const toNonce = CHAIN_INFO[to.text].nonce;
    const wrapped = await factory.isWrappedNft(nft, fromNonce);
    const {
        native: { contract, tokenId },
    } = nft;
    let mintWith;
    if (!wrapped) {
        mintWith = await factory.getVerifiedContract(
            contract,
            toNonce,
            fromNonce,
            tokenId && !isNaN(Number(tokenId)) ? tokenId.toString() : undefined
        );
    }
    let result;
    try {
        switch (true) {
            case to.type === "Cosmos":
                const contractAddress =
                    chainConfig?.secretParams?.bridge?.contractAddress;
                const codeHash = chainConfig?.secretParams?.bridge?.codeHash;
                mintWith = `${contractAddress},${codeHash}`;
                result = await factory.transferNft(
                    fromChain,
                    toChain,
                    nft,
                    receiver,
                    fee,
                    mintWith
                );
                break;
            default:
                result = await factory.transferNft(
                    fromChain,
                    toChain,
                    nft,
                    undefined,
                    receiver,
                    fee,
                    mintWith
                );
                break;
        }
    } catch (error) {
        console.log(error);
    }
    return result || false;
};
