import requestPool from "./requestPool";
import { isWhiteListed } from "./../components/NFT/NFTHelper";
import axios from "axios";
import { nftGeneralParser } from "nft-parser/dist/src/index";
import store from "../store/store";
import { setEachNFT } from "../store/reducers/generalSlice";

const pool = requestPool(5000);

export const parseNFT = async (nft, index, testnet, claimable) => {
    const { uri } = nft;
    let whitelisted = !testnet
        ? nft?.native?.contract === "0xED1eFC6EFCEAAB9F6d609feC89c9E675Bf1efB0a"
            ? false
            : undefined
        : true;
    let nftObj = {
        uri,
        collectionIdent: nft.collectionIdent || undefined,
        native: { ...nft.native },
        dataLoaded: true,
        whitelisted,
        nftId: nft.nftId || undefined,
        appId: nft.appId || undefined,
    };
    const {
        general: { from, NFTList, account },
    } = store.getState();
    if (!claimable) {
        let nftCashResponse;
        try {
            nftCashResponse = await axios.get(
                `https://nft-cache.herokuapp.com/nft/data?chainId=${nft.native?.chainId}&tokenId=${nft.native?.tokenId}&contract=${nft.native?.contract}`,
                {
                    headers: { "Content-type": "application/json" },
                }
            );
        } catch (error) {
            console.error("nft-cache check db: ", error);
        }
        if (nftCashResponse.data === "no NFT with that data was found") {
            if (!testnet) {
                try {
                    whitelisted = await isWhiteListed(from.text, nft);
                } catch (error) {
                    console.error(error);
                }
            }
            const parsed = await nftGeneralParser(nft, account, whitelisted);
            debugger;
            if (parsed?.image || parsed?.animation_url) {
                try {
                    axios.post(
                        `https://nft-cache.herokuapp.com/nft/add`,
                        JSON.stringify(parsed),
                        {
                            headers: { "Content-type": "application/json" },
                        }
                    );
                } catch (error) {
                    console.error("nft-cache add: ", error);
                }
            }
            const dataLoaded = true;
            nftObj = { ...nft, ...(parsed?.metaData || parsed), dataLoaded };
        } else {
            const dataLoaded = true;
            whitelisted = nftCashResponse?.data?.whitelisted;
            try {
                whitelisted = !whitelisted
                    ? await isWhiteListed(from.text, nft)
                    : whitelisted;
            } catch (error) {
                console.error(error);
            }
            nftObj = { ...nft, ...nftCashResponse?.data, dataLoaded };
        }
        if (
            !NFTList[index]?.dataLoaded ||
            !NFTList[index]?.image ||
            !NFTList[index]?.animation_url
        ) {
            store.dispatch(setEachNFT({ nftObj, index }));
        }
    } else {
        // TODO IF NFT IS FROm CLAIMABLE
    }
};
