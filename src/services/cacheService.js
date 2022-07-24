import axios from "axios";

class CacheService {
  cacheApi = "https://nft-cache.herokuapp.com";

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
    return await axios
      .get(
        `${this.cacheApi}/nft/data?chainId=${chainId ||
          nft.native?.chainId}&tokenId=${tokenId ||
          nft.native?.tokenId}&contract=${contract || nft.native?.contract}`
      )
      .catch((e) => "error");
  }

  async add(data, whitelisted) {
    axios.post(`${this.cacheApi}/nft/add`, {
      ...data,
      metaData: {
        ...data.metaData,
        whitelisted,
      },
    });
  }
}

export default () => new CacheService();
