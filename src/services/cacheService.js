import axios from "axios";

class CacheService {
  cacheApi = "http://localhost:3030"; //"https://nft-cache.herokuapp.com";

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
    return axios.get(
      `${this.cacheApi}/nft/data?chainId=${chainId ||
        nft.native?.chainId}&tokenId=${tokenId ||
        nft.native?.tokenId}&contract=${contract || nft.native?.contract}`
    );
  }

  async add(nft, account, whitelisted) {
    return axios
      .post(`${this.cacheApi}/nft/add`, {
        nft,
        account,
        whitelisted,
      })
      .then((res) => res.data);
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
