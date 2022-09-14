/*import { ChainService } from "./chain";
import { Chain } from "xp.network/dist/consts";

class SecretService extends ChainService {
  async approve(nft, signer) {
    const chain = await this._factory.inner(Chain.SECRET);

    try {
      const approve = await chain.preTransfer(signer, nft);

      return;
    } catch (e) {
      console.log(e.message, "approve for cosmos");
    }
  }
}

export default () => SecretService();*/
