import { UserNftMinter__factory } from "xpnet-web3-contracts";
import { chains } from "../../components/values";

class EvmContract {
  providers = {};
  chainPrams;

  async getUri(nft, collectionIdent) {
    if (this.chainPrams && nft.native?.chainId && nft.native?.tokenId) {
      const chain = chains.find(
        (chain) => String(chain.nonce) === String(nft.native?.chainId)
      );

      if (chain?.type === "EVM") {
        try {
          const provider = this.providers[nft.native.chainId]
            ? this.providers[nft.native.chainId]
            : await (
                await this.chainPrams.inner(+nft.native.chainId)
              ).getProvider();

          this.providers[nft.native.chainId] = provider;

          const erc = UserNftMinter__factory.connect(collectionIdent, provider);

          const uri = await erc.tokenURI(nft.native?.tokenId).catch((e) => {
            console.log(e);
            return nft.uri;
          });

          return {
            ...nft,
            uri,
          };
        } catch (e) {
          console.log(e);
        }
      }
    }

    return nft;
  }

  init(chainPrams) {
    if (!this.chainPrams && chainPrams) this.chainPrams = chainPrams;
  }
}

export default () => new EvmContract();
