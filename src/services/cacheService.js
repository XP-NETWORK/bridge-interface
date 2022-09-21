import axios from "axios";

class CacheService {
  cacheApi = "https://nft-cache.herokuapp.com"; //"https://nft-cache-testing.herokuapp.com"; //"http://localhost:3030"; //"https://nft-cache.herokuapp.com";
  retryInterval = 6000;
  totalTry = 6;
  retryStatues = [429];
  forceCache = ["nft.weedcommerce.info"];

  constructor() {
    this.axios = axios.create({
      baseURL: this.widgetApi,
      headers: {
        "Content-type": "application/json",
      },
      timeout: 5000,
    });
  }

  async get({ chainId, tokenId, contract }, nft) {
    try {
      return axios
        .get(
          `${this.cacheApi}/nft/data?chainId=${chainId ||
            nft.native?.chainId}&tokenId=${tokenId ||
            nft.native?.tokenId}&contract=${encodeURIComponent(contract) ||
            encodeURIComponent(nft.native?.contract)}`,
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
              this.retryInterval + (this.retryInterval * times) / 5
            )
          );
          return this.add(nft, account, whitelisted, times++);
        } else {
          return res.data;
        }
      });
  }

  async unwrap(nft) {
    if (/(wnfts\.xp\.network|nft\.xp\.network)/.test(nft.uri)) {
      try {
        const res = await axios(nft.uri);

        const { data } = res;

        let tokenId = data.wrapped?.token_id || data.wrapped?.tokenId;
        const sourceToken = data.wrapped?.source_token_id;

        if (
          data.wrapped?.origin === "2" &&
          tokenId.split("-").length < 3 &&
          sourceToken
        ) {
          tokenId = tokenId + `-${sourceToken}`;
        }
        const contract =
          data.wrapped?.contract || data.wrapped?.source_mint_ident;

        return {
          nft: {
            ...nft,
            collectionIdent: contract,
            uri: data.wrapped?.original_uri,
            native: {
              ...nft.native,
              chainId: data.wrapped?.origin,
              contract,
              tokenId,
              uri: data.wrapped?.original_uri,
            },
          },
          chainId: data.wrapped?.origin,
          tokenId,
          contract,
        };
      } catch (e) {}
    }

    return {
      nft,
      chainId: nft.native?.chainId,
      tokenId: nft.native?.tokenId,
      contract: nft.collectionIdent,
    };
  }

  isRestricted = (url) => this.forceCache.some((r) => url?.includes(r));

  preventRestricted = (nft) => ({
    ...nft,
    image: "",
    animation_url: "",
    uri: "",
  });
}

export default () => new CacheService();
