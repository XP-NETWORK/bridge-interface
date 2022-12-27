import axios from "axios";

const instance = axios.create();

class XpchallengeApi {
  base = "https://xp-challenges.herokuapp.com";

  constructor(url) {
    if (url) this.base = url;
  }

  connectWallet(address, name) {
    const params = new URLSearchParams(location.search.replace("?", ""));
    const xpchallenge = params.get("xpchallenge");

    if (xpchallenge) {
      const project = params.get("projectNumber");
      instance.patch(
        `${
          this.base
        }/connectWallet?projectNumber=${project}&chain=${name.toUpperCase()}&address=${address}`
      );
    }
  }
}
export default (url) => new XpchallengeApi(url);
