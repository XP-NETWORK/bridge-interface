import requestPool from "./requestPool";
import { isWhiteListed } from "./../components/NFT/NFTHelper";
import axios from "axios";
import { nftGeneralParser } from "nft-parser/dist/src/index";
import store from "../store/store";
import { setEachNFT } from "../store/reducers/generalSlice";
import { parseEachNFT } from "./helpers";

//const pool = requestPool(5000);

const cacheUrl = `https://nft-cache.herokuapp.com`;
//const cacheUrl = `http://localhost:3030`;

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
                `${cacheUrl}/nft/data?chainId=${nft.native?.chainId}&tokenId=${nft.native?.tokenId}&contract=${nft.native?.contract}`,
                {
                    headers: { "Content-type": "application/json" },
                    timeout: 5000,
                }
            );
        } catch (error) {
            console.error("nft-cache check db: ", error);
        }
        if (
            nftCashResponse &&
            nftCashResponse.data === "no NFT with that data was found"
        ) {
            if (!testnet) {
                try {
                    nftCashResponse = await axios.get(
                        `${cacheUrl}/nft/data?chainId=${nft.native?.chainId}&tokenId=${nft.native?.tokenId}&contract=${nft.native?.contract}`,
                        {
                            headers: { "Content-type": "application/json" },
                            timeout: 5000,
                        }
                    );
                } catch (error) {
                    console.error("nft-cache check db: ", error);
                }
            }
            const parsed = await nftGeneralParser(nft, account, whitelisted);
            //console.log(parsed, "parsed By Lib", whitelisted);

            if (parsed?.metaData?.image || parsed?.metaData?.animation_url) {
                console.log(
                    `caching Nft ${parsed?.metaData?.name ||
                        parsed?.native?.name}`
                );
                try {
                    !testnet &&
                        axios.post(
                            `${cacheUrl}/nft/add`,
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
            nftObj = {
                ...nft,
                ...(parsed?.metaData || parsed),
                dataLoaded,
                whitelisted,
            };
        } else {
            const dataLoaded = true;
            whitelisted = nftCashResponse?.data?.whitelisted;

            index === 14 && console.log(await isWhiteListed(from.text, nft));

            try {
                whitelisted = !whitelisted
                    ? await isWhiteListed(from.text, nft)
                    : whitelisted;
            } catch (error) {
                console.error(error);
            }
            nftObj = {
                ...nft,
                ...nftCashResponse?.data,
                dataLoaded,
                whitelisted,
            };
        }

        if (
            !NFTList[index]?.dataLoaded ||
            !NFTList[index]?.image ||
            !NFTList[index]?.animation_url
        ) {
            store.dispatch(setEachNFT({ nftObj, index }));
        }
    } else {
        await parseEachNFT(nft, index, testnet, claimable);
    }
};
