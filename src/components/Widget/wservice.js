import axios from "axios";
import { ethers } from "ethers";

class WService {
  widgetApi = "http://localhost:3030"; //"https://xpnetwork-widget.herokuapp.com";
  msg = "Please sign in order to see your widgets";

  constructor() {
    this.axios = axios;
    this.axios.defaults.withCredentials = true;
    this.axios.defaults.baseURL = this.widgetApi;
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  async get(id) {
    return (await axios.get(`/getWidget?widgetId=${id}`).catch((e) => ({})))
      ?.data;
  }

  async add(address, signature, initialWidget) {
    return (
      await axios
        .post(`/addWidget`, {
          address,
          signature,
          widget: initialWidget,
        })
        .catch((e) => ({}))
    ).data;
  }

  async sign(msg) {
    if (window.ethereum) {
      const signer = this.provider.getSigner();

      const [signature, address] = await Promise.all([
        signer.signMessage(msg || this.msg),
        signer.getAddress(),
      ]);

      return { signature, address };
    } else {
      alert("install metamask");
    }
  }
}

export default () => new WService();
