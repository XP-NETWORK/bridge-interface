import { chainsConfig, CHAIN_INFO } from "../../../components/values";
import { errorToLog, getFactory } from "../../../wallet/helpers";
import store from "../../../store/store.js";
import { setError } from "../../../store/reducers/generalSlice";

export const transferNFTFromTran = async ({
    to,
    from,
    nft,
    receiver,
    fee,
    chainConfig,
}) => {
    const factory = await getFactory();
    const toChain = await factory.inner(chainsConfig[to.text].Chain);
    const fromChain = await factory.inner(chainsConfig[from.text].Chain);

    await factory
        .setProvider(chainsConfig[from.text].Chain, window.tronWeb)
        .catch((e) => console.log(e, "e"));

    const fromNonce = CHAIN_INFO[from.text].nonce;
    const toNonce = CHAIN_INFO[to.text].nonce;
    const wrapped = await factory.isWrappedNft(nft, fromNonce);
    const {
        native: { contract, tokenId },
    } = nft;
    const {
        general: { tronWallet },
    } = store.getState();
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
                mintWith = `${chainConfig?.secretParams?.bridge?.contractAddress},${chainConfig?.secretParams?.bridge?.codeHash}`;
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
        store.dispatch(setError(error));
        const date = new Date();
        const errBogy = {
            type: "Transfer",
            walletAddress: tronWallet,
            time: date.toString(),
            fromChain: from.text,
            toChain: to.text,
            message: error,
            nfts: nft.native,
        };
        errorToLog(errBogy);
    }
    return result || false;
};
