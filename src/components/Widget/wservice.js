import axios from "axios";
import { ethers } from "ethers";

class WService {
  widgetApi = "https://xpnetwork-widget.herokuapp.com"; //"http://localhost:3030"; //"https://xpnetwork-widget.herokuapp.com";
  msg = "Please sign in order to see your widgets";

  constructor() {
    this.axios = axios.create({
      baseURL: this.widgetApi,
      withCredentials: true,
    });
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  async get(id) {
    return (
      await this.axios.get(`/getWidget?widgetId=${id}`).catch((e) => ({}))
    )?.data;
  }

  async add(address, signature, initialWidget, widgetName) {
    return (
      await this.axios
        .post(`/addWidget`, {
          address,
          signature,
          widget: initialWidget,
          widgetName,
        })
        .catch((e) => {
          alert("Fail on addWidget:" + e.message);
          return {};
        })
    ).data;
  }

  async sign(msg, init) {
    if (window.ethereum) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }], // chainId must be in hexadecimal numbers
      });

      init &&
        (await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        }));

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

  async update(wid, settings) {
    try {
      const { signature } = await this.sign();

      return await this.axios.patch(`/updateWidget`, {
        widgetId: wid,
        settings,
        signature,
      });
    } catch (e) {
      if (e.response.status === 403 && e.response.data === "no cookies") {
        const { signature, address } = await this.sign();

        return await this.axios.patch(`/updateWidget`, {
          widgetId: wid,
          settings,
          signature,
          address,
        });
      }
    }
  }

  async saveTrx({
    wid,
    result,
    fromNonce,
    toNonce,
    bigNumberFees,
    affiliationFees,
  }) {
    this.axios.post(`/addTransaction`, {
      widgetId: wid,
      txHash: result.hash,
      fromChain: fromNonce,
      toChain: toNonce,
      fees: bigNumberFees,
      extraFees: affiliationFees,
    });
  }
}

export default () => new WService();
