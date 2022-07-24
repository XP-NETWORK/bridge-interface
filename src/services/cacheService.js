import axios from "axios";

class CacheService {
  cacheApi = "https://nft-cache.herokuapp.com";

  constructor() {
    this.axios = axios.create({
      baseURL: this.widgetApi,
      withCredentials: true,
    });
  }

  async get(params) {}

  async add(params) {}
}
