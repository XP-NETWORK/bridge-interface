import axios from "axios";

class CacheService {
  cacheApi = "http://localhost:3030"; //"https://nft-cache.herokuapp.com";
  retryInterval = 6000;
  totalTry = 6;
  retryStatues = [429];

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
    return axios
      .get(
        `${this.cacheApi}/nft/data?chainId=${chainId ||
          nft.native?.chainId}&tokenId=${tokenId ||
          nft.native?.tokenId}&contract=${contract || nft.native?.contract}`
      )
      .catch(() => ({ data: null }));
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

        return {
          chainId: data.wrapped?.origin,
          tokenId: data.wrapped?.tokenId,
          contract: data.wrapped?.contract,
        };
      } catch (e) {}
    }

    return {
      chainId: nft.native?.chainId,
      tokenId: nft.native?.tokenId,
      contract: nft.collectionIdent,
    };
  }
}

export default () => new CacheService();
