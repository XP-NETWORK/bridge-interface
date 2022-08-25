import { CHAIN_INFO, chainsConfig } from "../../../components/values.js";
import store from "../../../store/store.js";
import { getFactory } from "../../../wallet/helpers";
import {
    setError,
    setTransferLoaderModal,
    setTxnHash,
} from "../../../store/reducers/generalSlice";

export const transferNFTFromAlgorand = async ({
    to,
    from,
    nft,
    signer,
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
        amountToTransfer,
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
            case !mintWith && !testnet:
                store.dispatch(
                    setError(
                        "Transfer has been canceled. The NFT you are trying to send will be minted with a default NFT collection"
                    )
                );
                if (txnHashArr.length) {
                    store.dispatch(setTxnHash({ txn: "failed", nft }));
                }
                break;
            default:
                result = await transfer(
                    fromChain,
                    toChain,
                    nft,
                    signer,
                    receiver,
                    amountToTransfer,
                    fee,
                    mintWith,
                    factory
                );
                break;
        }
        console.log("Transfer result: ", result, "index: ", index);
        store.dispatch(setTxnHash({ txn: result, nft }));
    } catch (error) {
        console.log(error);
    }
    store.dispatch(setTransferLoaderModal(false));
    return result ? true : false;
};

const transfer = async (
    fromChain,
    toChain,
    nft,
    signer,
    receiver,
    amount,
    fee,
    mintWith,
    factory
) => {
    let result;
    try {
        switch (true) {
            case !amount:
            default:
                result = await factory.transferNft(
                    fromChain,
                    toChain,
                    nft,
                    signer,
                    receiver,
                    fee,
                    mintWith
                );
                return result;
        }
    } catch (error) {
        console.log(error);
    }
};
