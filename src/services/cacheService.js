import axios from "axios";

class CacheService {
    cacheApi = "https://nft-cache.herokuapp.com"; //"https://nft-cache-testing.herokuapp.com"; //"http://localhost:3030"; //"https://nft-cache.herokuapp.com";
    // cacheApi = "http://localhost:3030";
    retryInterval = 6000;
    totalTry = 6;
    retryStatues = [429];
    forceCache = ["nft.weedcommerce.info", "tritonpass"];

    async get({ chainId, tokenId, contract }, nft) {
        try {
            const _tokenId = encodeURIComponent(tokenId || nft.native?.tokenId);
            const _contract = encodeURIComponent(
                contract || nft.native?.contract
            );
            return axios
                .get(
                    `${this.cacheApi}/nft/data?chainId=${chainId ||
                        nft.native
                            ?.chainId}&tokenId=${_tokenId}&contract=${_contract}`,
                    {
                        timeout: 5000,
                    }
                )
                .catch(() => ({ data: null }));
        } catch (e) {
            console.log(e);
        }
    }

    async add(nft, account, whitelisted, times = 1) {
        if (typeof nft.native?.tokenId === "undefined")
            return "key parameter missing";
        return axios
            .post(`${this.cacheApi}/nft/add`, {
                nft,
                account,
                whitelisted,
            })
            .then(async (res) => {
                if (
                    this.retryStatues.includes(res.data?.errorStatus) &&
                    times < this.totalTry
                ) {
                    await new Promise((resolve) =>
                        setTimeout(
                            () => resolve(""),
                            this.retryInterval +
                                (this.retryInterval * times) / 5
                        )
                    );
                    return this.add(nft, account, whitelisted, times++);
                } else {
                    return res.data;
                }
            });
    }

    isHex(num) {
        return Boolean(num.match(/^0x[0-9a-f]+$/i));
    }

    isRestricted = (url) => this.forceCache.some((r) => url?.includes(r));

    preventRestricted = (nft) => ({
        ...nft,
        image: "",
        animation_url: "",
        uri: "",
    });

    parseUniqueNft(nft, whitelisted) {
        if ("saleContractAddress" in nft.native) {
            return {
                ...nft,
                metaData: {
                    image: nft.native?.image,
                    name: nft.native?.name,
                },
                dataLoaded: true,
                whitelisted,
            };
        } else return false;
    }
}

export default () => new CacheService();
