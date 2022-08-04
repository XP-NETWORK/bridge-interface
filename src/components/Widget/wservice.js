import axios from "axios";
import { ethers } from "ethers";

class WService {
  widgetApi = "https://xpnetwork-widget.herokuapp.com"; //"http://localhost:3030"; //"https://xpnetwork-widget.herokuapp.com";dsds
  msg = "Please sign in order to see your widgets";
  maxExtraFees = 2;

  constructor() {
    if (!window.ethereum) return;
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
      if (e.response.status === 401) {
        throw e;
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
    nftUri,
    senderAddress,
    targetAddress,
  }) {
    this.axios.post(`/addTransaction`, {
      widgetId: wid,
      txHash: result.hash || result.transactionHash,
      fromChain: fromNonce,
      toChain: toNonce,
      fees: String(bigNumberFees),
      extraFees: String(affiliationFees),
      nftUri,
      senderAddress,
      targetAddress,
      txType: "Transfer",
      status: "Completed",
      date: new Date().toISOString(),
    });
  }

  calcExtraFees(bigNum, from, affiliationSettings, affiliationFees) {
    if (bigNum) {
      if (affiliationSettings) {
        const feeSetting = affiliationSettings.find(
          ({ chain }) =>
            chain.toLowerCase() === from.text.toLowerCase() ||
            chain.toLowerCase() === from.key.toLowerCase() ||
            chain.toLowerCase() === from.value.toLowerCase()
        );

        if (feeSetting) {
          const feesMultiplier = Number(feeSetting.extraFees) / 100 + 1;
          console.log(feesMultiplier);
          if (feesMultiplier >= 1) {
            return bigNum.multipliedBy(
              feesMultiplier <= this.maxExtraFees
                ? feesMultiplier
                : this.maxExtraFees
            );
          }
        }
      }

      if (affiliationFees) {
        const feesMultiplier = Number(affiliationFees) / 100 + 1;
        if (feesMultiplier >= 1) {
          return bigNum.multipliedBy(
            feesMultiplier <= this.maxExtraFees
              ? feesMultiplier
              : this.maxExtraFees
          );
        }
      }
    }
    return bigNum;
  }

  getFee(from, affiliationSettings, affiliationFees) {
    from = from === "xDai" ? "Gnosis" : from;

    if (affiliationSettings && affiliationSettings.length) {
      const feeSetting = affiliationSettings.find(
        ({ chain }) => chain.toLowerCase() === from.toLowerCase()
      );

      if (feeSetting) {
        return feeSetting.extraFees ? +feeSetting.extraFees / 100 + 1 : 1;
      }
    }

    if (affiliationFees) {
      return affiliationFees ? +affiliationFees / 100 + 1 : 1;
    }

    return 1.0;
  }
}

export default () => new WService();
