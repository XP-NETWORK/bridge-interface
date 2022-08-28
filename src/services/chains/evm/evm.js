import { UserNftMinter__factory } from "xpnet-web3-contracts";
import { chains } from "../../../components/values";

import { ethers } from "ethers";

const { Driver, SimpleNet } = require("@vechain/connex-driver");
const { Framework } = require("@vechain/connex-framework");
const thor = require("web3-providers-connex");

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

                    const erc = UserNftMinter__factory.connect(
                        collectionIdent,
                        provider
                    );

                    const uri = await erc
                        .tokenURI(nft.native?.tokenId)
                        .catch((e) => {
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

            if (chain.type === "VeChain") {
                try {
                    if (!this.vechProv) {
                        const net = new SimpleNet(
                            "https://vethor-node.vechain.com"
                        );
                        const driver = await Driver.connect(net);

                        const pro = thor.ethers.modifyProvider(
                            new ethers.providers.Web3Provider(
                                new thor.ConnexProvider({
                                    connex: new Framework(driver),
                                })
                            )
                        );
                        const vechProv = thor.ethers.modifyProvider(pro);

                        if (vechProv) {
                            this.vechProv = vechProv;
                        }
                    }

                    const instance = new ethers.Contract(
                        nft.collectionIdent,
                        UserNftMinter__factory.abi,
                        this.vechProv
                    );

                    const uri = await instance.tokenURI(nft.native.tokenId);

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
