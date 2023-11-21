/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */

import { Chain as ChainNonce, CHAIN_INFO } from "xp.network";
import BigNumber from "bignumber.js";

import { ethers, BigNumber as BN } from "ethers";
import xpchallenge from "../services/xpchallenge";

import { extractType, setupURI } from "../utils";
import { switchNetwork } from "../services/chains/evm/evmService";
import { getChainObject } from "../components/values";

const Xpchallenge = xpchallenge();
const feeMultiplier = 1.1;

class AbstractChain {
    chain;
    showMintWith = false;
    constructor({ chainParams, nonce, chain, bridge }) {
        this.chainParams = chainParams;
        this.nonce = nonce;
        this.chain = chain;
        this.bridge = bridge;
    }

    adaptAddress(address) {
        return address;
    }

    async normalizeReceiver(address) {
        return address;
    }

    adaptHashView(hash) {
        return hash;
    }

    async listetnExecutedSocket() {}

    async connect() {
        throw new Error("connect method not implemented");
    }

    async checkSigner() {
        if (!this.signer) {
            throw new Error("No signer");
        }
    }

    getSigner() {
        return this.signer;
    }

    async setSigner(signer) {
        try {
            //if (!signer) throw new Error("no signer");
            this.signer = signer;
            return this;
        } catch (e) {
            console.log(e, "error in setSigner");
            throw e;
        }
    }

    async getNFTs(address) {
        try {
            return await this.bridge.nftList(this.chain, address);
            //console.log(nfts, "nfts");
            //return nfts;
        } catch (e) {
            console.log(e, "e");
            throw new Error("NFT-Indexer is temporarily under maintenance");
        }
    }

    filterNFTs(nfts) {
        const unique = {};
        try {
            // debugger;
            const allNFTs = nfts.filter((n) => {
                const { chainId, address } = n.native;
                const tokenId = n.native.tokenId || n.native.token_id;
                const contract = n.native.contract || n.native.contract_id;

                if (unique[`${tokenId}_${contract?.toLowerCase() || address?.toLowerCase()}_${chainId}`]) {
                    return false;
                } else {
                    unique[`${tokenId}_${contract?.toLowerCase() || address?.toLowerCase()}_${chainId}`] = true;

                    return true;
                }
            });

            return allNFTs;
        } catch (err) {
            return [];
        }
    }

    async validateAddress(address) {
        return true;
    }

    async preParse(nft) {
        let uri = nft.uri;
        const contract = nft.native?.contract || nft.collectionIdent;

        if (!uri && this.chain.getTokenURI) {
            uri = await this.chain.getTokenURI(contract, nft.native?.tokenId);
        }

        if (/0x\{id\}$/.test(uri)) uri = uri.replace("0x{id}", nft.native.tokenId);

        /*const rg = new RegExp(
            wnftPattern.slice(0, 1) + "?<=" + wnftPattern.slice(1) + `/d*`
        );

        if (rg.test(uri)) {
            console.log(uri);
            uri = uri.replace(uri.match(rg).at(0), `w/${uri.match(rg).at(0)}`);
            console.log(uri);
        }*/

        return {
            ...nft,
            uri,
            collectionIdent: contract,
            chainId: nft.native?.chainId,
            tokenId: nft.native?.tokenId,
            contract,
        };
    }

    async unwrap(nft, data) {
        let tokenId = data.wrapped?.token_id || data.wrapped?.tokenId || data.wrapped?.item_address;

        let contract = data.wrapped?.contract || data.wrapped?.source_mint_ident;

        return {
            nft: {
                ...nft,
                collectionIdent: contract,
                uri: data.wrapped?.original_uri,
                wrapped: data.wrapped,
                native: {
                    ...nft.native,
                    chainId: data.wrapped?.origin,
                    contract,
                    tokenId,
                    uri: data.wrapped?.original_uri,
                },
            },
            chainId: data.wrapped?.origin,
            tokenId,
            contract,
        };
    }

    async mintNFT(uri) {
        await this.chain.mintNft(this.signer, {
            contract: "0x34933A5958378e7141AA2305Cdb5cDf514896035",
            uri,
        });
    }

    async balance(account) {
        try {
            if (!account) return 0;
            const res = await this.chain.balance(account);

            const decimals = CHAIN_INFO.get(this.nonce)?.decimals;
            return res.dividedBy(decimals).toNumber();
        } catch (e) {
            console.log(e, "error in balance");
        }
    }

    async estimate(toChain, nft, receiver = "", widgetParams) {
        //tron case
        /* if (toChain.getNonce() === 9) {
          return calcFees(getTronFees(this.chainParams.key), this.nonce);
        }*/

        try {
            const res = await this.bridge.estimateFees(this.chain, toChain, nft, receiver);

            let sftFees = new BigNumber(0);

            if (Number(nft.amountToTransfer) > 0) {
                sftFees = await this.bridge.estimateSFTfees(this.chain, BigInt(nft.amountToTransfer), 0.05);
            }

            let fees = res.multipliedBy(feeMultiplier).integerValue();

            if (widgetParams) {
                fees = widgetParams.wservice
                    .calcExtraFees(
                        new BigNumber(fees),
                        widgetParams.from,
                        widgetParams.affiliationSettings,
                        widgetParams.affiliationFees
                    )
                    ?.integerValue();
            }

            return {
                fees: fees.toString(10),
                formatedFees: fees
                    .dividedBy(this.chainParams.decimals)
                    .plus(sftFees.dividedBy(this.chainParams.decimals))
                    .toNumber(),
            };
        } catch (e) {
            console.log(e.message || e, "in estimate");
            return {
                fees: "",
                formatedFees: 0,
            };
        }
    }

    async estimateDeploy(toChain, nft) {
        try {
            const res = (
                await this.bridge.estimateWithContractDep(this.chain, toChain, nft)
            ).calcContractDep.integerValue();

            return {
                fees: res.toString(10),
                formatedFees: res.dividedBy(this.chainParams.decimals).toNumber(),
            };
        } catch (e) {
            return {
                fees: "",
                formatedFees: 0,
            };
        }
    }

    async transferAll(nfts, cb) {
        for (const nft of nfts) {
            cb(nft);
        }
    }

    async getMappedContract(nft, nonce) {
        const x = await this.bridge.getVerifiedContract(
            nft.native.contract || nft.collectionIdent,
            Number(nonce),
            this.chain
        );

        return x;
    }

    async transfer(args) {
        try {
            if (!this.signer) throw new Error("No signer for ", this.chainParams.text);

            const {
                nft,
                toChain,
                receiver,
                gasLimit,
                extraFee,
                discountLeftUsd,
                // account
            } = args;

            let { tokenId, fee } = args;

            if (discountLeftUsd && discountLeftUsd > 0) {
                const bnFee = new BigNumber(fee);
                fee = bnFee.minus(bnFee.multipliedBy(0.25));
            }

            fee = fee.toString(10);

            if (!tokenId) {
                tokenId = nft.native.tokenId;
            }

            /*const wrapped = await this.bridge.isWrappedNft(
                nft,
                Number(this.nonce)
            );*/

            let mintWith = undefined;
            let mwToUI = undefined;

            if (
                !nft.wrapped //&&
                //(this.chain.forceGetMintWith || toChain.showMintWith)
            ) {
                mintWith = await this.getMappedContract(nft, toChain.nonce);
                mwToUI = mintWith?.split(",")?.at(0);
            }

            if (nft.wrapped && String(toChain.nonce) === nft.wrapped?.origin) {
                mwToUI = nft.wrapped.contract;
            }

            const amount = nft.amountToTransfer;

            const beforeAmountArgs = [this.chain, toChain.chain, nft, this.signer, receiver?.trim()];

            const afterAmountArgs = [fee, mintWith, gasLimit, extraFee];

            if (!amount || toChain.rejectSft) {
                const args = [...beforeAmountArgs, ...afterAmountArgs];
                console.log(args);
                const result = await this.bridge.transferNft(...args);
                console.log(result, "res");
                return { result, mintWith: mwToUI };
            } else {
                const args = [...beforeAmountArgs, BigInt(amount), ...afterAmountArgs];
                console.log(args, "args");
                const result = await this.bridge.transferSft(...args);
                console.log(result, "res");

                return { result, mintWith: mwToUI };
            }
        } catch (e) {
            console.log(e, "in transfer");
            throw e;
        }
    }

    async preTransfer(nft, _, fees) {
        if (!this.signer) throw new Error("No signer for ", this.chainParams.text);
        try {
            return await this.chain.preTransfer(this.signer, nft, fees);
        } catch (e) {
            console.log(e, "in preTransfer");
            throw e;
        }
    }

    handlerResult(res) {
        switch (true) {
            case typeof res === "string":
                return { hash: res };
            case Array.isArray(res):
                return {
                    ...res[0],
                    hash: res[0].hash || res[0].transactionHash,
                };

            case typeof res === "object":
                return {
                    ...res,
                    hash: res.hash || res.transactionHash,
                };
            default:
                return res;
        }
    }

    handlerError(e) {
        return e;
    }

    async isContract() {
        return false;
    }
}

class EVM extends AbstractChain {
    constructor(params) {
        super(params);
    }

    async checkSigner() {
        try {
            //this.signer = undefined;
            await super.checkSigner();
        } catch (e) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            this.setSigner(signer);
        }
    }

    async preTransfer(...args) {
        const [nft, _, fees, __, toApprove = ""] = args;
        if (!this.signer) throw new Error("No signer for ", this.chainParams.text);
        try {
            return await this.chain.approveForMinter(nft, this.signer, fees, undefined, toApprove);
        } catch (e) {
            if (typeof e.message === "string") {
                if (e.message.includes("transaction underpriced")) {
                    return await this.chain.approveForMinter(
                        nft,
                        this.signer,
                        fees,
                        {
                            gasPrice: new BigNumber((await this.chain.getProvider().getGasPrice())._hex)
                                .multipliedBy(1.1)
                                .integerValue()
                                .toString(),
                        },
                        toApprove
                    );
                }

                if (e.message.match(/underlying network changed/gi)) {
                    const switched = await switchNetwork(getChainObject(Number(nft.native.chainId)));

                    if (switched) {
                        return await this.preTransfer(...args);
                    }
                }
            }
            console.log(e, "e");
            throw e;
        }
    }

    async transfer(args) {
        try {
            if (await this.isContract(args.receiver, args.toChain)) {
                throw new Error("Destination address is Contract");
            }
            return await super.transfer(args);
        } catch (e) {
            if (e.message?.includes("cannot estimate gas;")) {
                return await super.transfer({
                    ...args,
                    gasLimit: BN.from(140000),
                });
            }
            throw e;
        }
    }

    setSigner(signer) {
        super.setSigner(signer);
        signer && Xpchallenge.connectWallet(signer._address, this.chainParams.name);
    }

    async isContract(address, toChain) {
        if (typeof toChain.chain?.getProvider !== "function" || !toChain.chain?.getProvider()?.getCode) return false;
        try {
            const code = await toChain.chain
                .getProvider()
                .getCode(address)
                .catch(() => "0x");

            return code !== "0x";
        } catch (e) {
            return false;
        }
    }
}

class VeChain extends AbstractChain {
    constructor(params) {
        super(params);
    }

    async transferAll(nfts, cb) {
        for (const nft of nfts) {
            await cb(nft);
        }
    }
}

class NoWhiteListEVM extends EVM {
    disableWhiteList = true;

    constructor(params) {
        super(params);
    }

    async deployUserStore(nft, fees) {
        const res = await this.chain.getUserStore(this.signer, nft, fees);

        return res?.address;
    }

    async checkUserStore(nft, toNonce) {
        return await Promise.all([this.getMappedContract(nft, toNonce), this.chain.checkUserStore(nft)]);
    }
    async estimateDeployUserStore() {
        try {
            const res = await this.chain.estimateUserStoreDeploy(this.signer);

            return {
                fees: res.toString(10),
                formatedFees: Math.max(res.dividedBy(this.chainParams.decimals).toNumber(), 0.00001),
            };
        } catch (e) {
            console.log("in estimateDeployUserStore");
        }
    }

    async preTransfer(nft, toNonce, fees) {
        try {
            let toApprove = "";
            if (!nft.wrapped) {
                const [mapping, userStore] = await this.checkUserStore(nft, toNonce);
                //support old nfts
                toApprove = !userStore && mapping ? toApprove : userStore;
            }

            return await super.preTransfer(nft, toNonce, fees, undefined, toApprove);
        } catch (e) {
            console.log(e, "noWitelistEVM :in preTransfer");
            throw e;
        }
    }
}

class V3_EVM extends EVM {
    v3Bridge = true;
    async preTransfer(...args) {
        args[4] = this.chain.getParams()?.v3_bridge;

        return await super.preTransfer(...args);
    }

    async transfer(args) {
        const { nft, toChain, receiver } = args;

        const result = await this.bridge.lockNFT(this.chain, toChain.chain, nft, this.signer, receiver);

        return { result };
    }

    async claim(from, hash, fee) {
        const result = await this.bridge.claimNFT(from.chain, this.chain, hash, this.signer, fee);
        return { result };
    }
}

class Elrond extends AbstractChain {
    rejectSft = true;

    constructor(params) {
        super(params);
    }

    handlerResult(res) {
        if (Array.isArray(res)) {
            res = res[0];
        }
        return {
            hash: ethers.utils.hexlify(res.hash?.hash)?.replace(/^0x/, ""),
        };
    }

    async transfer(args) {
        const {
            nft: { native },
        } = args;

        const idFromNative = native?.tokenId || native?.token_id || native?.item_address;
        let tokenId = native.nonce;

        if (typeof tokenId === "undefined" && idFromNative.split("-")?.length === 3) {
            const hex = idFromNative.split("-").at(2);
            tokenId = parseInt(hex, 16);
        }

        return await super.transfer({
            ...args,
            tokenId: tokenId && String(tokenId),
        });
    }

    setSigner(signer) {
        super.setSigner(signer);

        signer && Xpchallenge.connectWallet(signer.address || signer.account?.address, this.chainParams.name);
    }

    async getNFTs(address) {
        try {
            return await super.getNFTs(address);
        } catch (e) {
            return [];
        }
    }

    async unwrap(nft, data) {
        let nonce = data.wrapped?.token_id || data.wrapped?.tokenId || data.wrapped?.item_address;

        let contract = data.wrapped?.contract || data.wrapped?.source_mint_ident;

        if (!contract && nonce?.split("-")?.length === 3) {
            contract = nonce
                .split("-")
                ?.slice(0, 2)
                .join("-");
        }

        if (!nonce || nonce.split("-")?.length > 1) {
            nonce = data.wrapped.source_token_id || Number(data.wrapped.nonce);
        }

        const tokenId =
            contract +
            "-" +
            (nonce > 9 ? nonce.toString(16).padStart(4, "0") : "0" + Number(nonce).toString(16)).slice(-4);

        return {
            contract,
            tokenId,
            chainId: String(this.nonce),
            nft: {
                ...nft,
                collectionIdent: contract,
                uri: data.wrapped.original_uri,
                native: {
                    ...nft.native,
                    chainId: String(this.nonce),
                    contract,
                    tokenId,
                    nonce,
                    attributes: data.attributes,
                    name: data.name,
                    description: data.description,
                },
            },
        };
    }

    async getWegldBalance(account) {
        try {
            const bal = await this.chain.wegldBalance(account);
            return bal;
        } catch (e) {
            return 0;
        }
    }

    async unwrapWegld(wrappedEGold) {
        try {
            return await this.chain.unwrapWegld(this.signer, wrappedEGold);
        } catch (e) {
            console.log(e, "in unwrapWegld");
            return undefined;
        }
    }
}

class V3_Multiversex extends Elrond {
    v3Bridge = true;
    async preTransfer() {
        return true;
    }

    async transfer(args) {
        const { nft, toChain, receiver } = args;
        const result = await this.bridge.lockNFT(this.chain, toChain.chain, nft, this.signer, receiver);

        return { result };
    }

    async claim(from, hash, fee) {
        const result = await this.bridge.claimNFT(from.chain, this.chain, hash, this.signer, fee);
        return { result };
    }
}

class Tron extends AbstractChain {
    constructor(params) {
        super(params);
    }
    async preTransfer() {
        return true;
    }
}

class Algorand extends AbstractChain {
    constructor(params) {
        super(params);
    }

    async unwrap(nft, data) {
        let tokenId = data.wrapped?.assetID || data.wrapped?.source_token_id;
        let contract = tokenId;
        return {
            nft: {
                ...nft,
                collectionIdent: contract,
                uri: data.wrapped?.original_uri,
                wrapped: data.wrapped,
                native: {
                    ...nft.native,
                    chainId: data.wrapped?.origin,
                    contract,
                    tokenId,
                    uri: data.wrapped?.original_uri,
                },
            },
            chainId: data.wrapped?.origin,
            tokenId,
            contract,
        };
    }

    async getClaimables(account) {
        try {
            return await this.bridge.claimableAlgorandNfts(account);
        } catch (e) {
            console.log(e, "in getClaimables");
        }
    }
}

class Tezos extends AbstractChain {
    constructor(params) {
        super(params);
    }
}

class Cosmos extends AbstractChain {
    showMintWith = true;
    XpNft = this.chain.XpNft.split(",")[0];
    constructor(params) {
        super(params);
    }

    async getNFTs(account, secretCred) {
        let secretNFTs = await this.chain.nftList(account, secretCred.viewKey, secretCred.contract);

        secretNFTs = secretNFTs.map((nft) => ({
            ...nft,
            native: {
                ...nft.native,
                name: nft?.native?.metadata?.name,
                description: nft?.native?.metadata?.description,
            },
            metaData: !nft?.uri
                ? {
                      ...nft?.native?.metadata,
                      image: nft?.native?.metadata?.media[0]?.url,
                      imageFormat: nft?.native?.metadata?.media[0]?.extension,
                  }
                : null,
        }));

        return secretNFTs;
    }
}

class TON extends AbstractChain {
    constructor(params) {
        super(params);
    }

    filterNFTs(nfts) {
        return nfts;
    }

    async validateAddress(address) {
        return this.chain.validateAddress(address).catch(() => false);
    }

    async preParse(nft) {
        const _contract = nft.collectionIdent || "SingleNFt";
        const withMetadata = Object.keys(nft.native?.metadata).length > 0;
        let uri = "";
        let native_metadata = {};
        if (withMetadata) {
            const data = JSON.stringify(nft.native.metadata);

            uri = `data:application/json;base64,${btoa(unescape(encodeURIComponent(data)))}`;

            if (nft.native.previews?.length) {
                const image = nft.native.previews.at(-1).url;
                native_metadata = { image, imageFormat: extractType(image) };
            }
        }

        return {
            collectionIdent: _contract,
            uri,
            metaData: withMetadata
                ? {
                      ...nft.native.metadata,
                      ...native_metadata,
                  }
                : undefined,

            native: {
                ...nft.native,
                tokenId: nft.native.nftItemAddr,
                contract: _contract,
            },
        };
    }

    async transferAll(nfts, cb) {
        for (const nft of nfts) {
            await cb(nft);
        }
    }
}

class Near extends AbstractChain {
    constructor(params) {
        super(params);
    }

    async preTransfer(nft, _, fees, params) {
        try {
            //window.safeLocalStorage?.setItem('_xp_near_transfered_nft', JSON.stringify(nft));
            return await this.chain.preTransfer(this.signer, nft, fees, params);
        } catch (e) {
            console.log(e, "in NEAR preTransfer");
            await new Promise((r) => setTimeout(r, 2_000));
            throw e;
        }
    }

    async transfer(args) {
        try {
            window.safeLocalStorage?.setItem("_xp_near_transfered_nft", JSON.stringify(args.nft));
            return await super.transfer(args);
        } catch (e) {
            await new Promise((r) => setTimeout(r, 2_000));
            throw e;
        }
    }
    async connect(wallet) {
        switch (wallet) {
            default:
                return await this.chain.connectWallet(wallet);
        }
    }

    async getNFTs(address) {
        const nfts = await super.getNFTs(address);
        // debugger;
        return nfts.map((nft) => {
            const media = nft.native.metadata.media;
            let image;
            if (media)
                image = /^https?/.test(media)
                    ? media
                    : `https://ipfs.io/ipfs/${media.replace(/^ipfs:\/\/(ipfs\/)?/, "")}`;

            return {
                ...nft.native.metadata,
                image,
                uri: nft.uri || nft.native.metadata?.reference,
                name: nft.native.metadata?.title,
                collectionIdent: nft.collectionIdent,
                native: {
                    ...nft.native,
                    chainId: String(ChainNonce.NEAR),
                    tokenId: nft.native.token_id,
                    contract: nft.native.contract_id,
                },
            };
        });
    }

    async unwrap(nft, data) {
        return {
            contract: data.wrapped?.contract,
            tokenId: data.wrapped.token_id || data.wrapped?.source_token_id,
            chainId: String(this.nonce),
            nft: {
                ...nft,
                collectionIdent: data.wrapped?.contract,
                native: {
                    ...nft.native,
                    chainId: String(this.nonce),
                    contract: data.wrapped?.contract,
                    tokenId: data.wrapped.token_id || data.wrapped?.source_token_id,
                },
            },
        };
    }
}

class Solana extends AbstractChain {
    disableWhiteList = true;

    constructor(params) {
        super(params);
    }

    async preTransfer() {
        return true;
    }

    async mintNFT(uri) {
        const mint = await this.chain.mintNft(this.signer, {
            uri,
        });
    }
    filterNFTs(nfts) {
        const unique = {};
        try {
            const allNFTs = nfts.filter((n) => {
                const nftMint = n.native.nftMint;
                if (unique[nftMint]) {
                    return false;
                } else {
                    unique[nftMint] = true;
                    return true;
                }
            });

            return allNFTs;
        } catch (err) {
            return [];
        }
    }

    async preParse(nft) {
        nft = await super.preParse(nft);
        const contract = nft.collectionIdent || nft.native.nftMint;
        return {
            ...nft,
            collectionIdent: contract,
            native: {
                ...nft.native,
                contract: contract,
                tokenId: encodeURIComponent(nft.native.name),
                chainId: String(this.chainParams.nonce),
            },
        };
    }
}

class APTOS extends AbstractChain {
    constructor(params) {
        super(params);
    }
    async preTransfer() {
        return true;
    }

    async preParse(nft) {
        const contract = nft.native.collection_name;
        return {
            ...nft,
            collectionIdent: contract,
            collectionName: contract,
            native: {
                ...nft.native,
                name: nft.native.token_name,
                contract,
            },
        };
    }

    async mintNFT(uri) {
        const options = {
            name: "Name",
            collection: "XPNFT",
            description: "description",
            uri,
            royalty_payee_address: this.signer.address,
        };

        const mint = await this.chain.mintNft(this.signer, options);
    }

    filterNFTs(nfts) {
        const unique = {};
        try {
            const allNFTs = nfts.filter((n) => {
                const collection_creator = n.native.collection_creator;
                const token_name = n.native.token_name;
                if (unique[`${collection_creator}_${token_name}`]) {
                    return false;
                } else {
                    unique[`${collection_creator}_${token_name}`] = true;
                    return true;
                }
            });

            return allNFTs;
        } catch (err) {
            return [];
        }
    }

    handlerError(e) {
        return {
            message: e.name,
        };
    }
}

class HEDERA extends EVM {
    hashConnect;

    constructor(params) {
        super(params);
    }

    async normalizeReceiver(address) {
        return await this.chain.toSolidityAddress(address);
    }

    async getClaimables(tokens) {
        try {
            return await this.chain.listHederaClaimableNFT(tokens, this.signer);
        } catch (e) {
            if (e.message === "No matching tokens") {
                e.message = "Nothing to claim";
                throw e;
            }
        }
    }

    async checkAndAssociate(tokens) {
        await this.chain.checkAndAssociate(tokens, this.signer);
        return true;
    }

    async associate(tokens) {
        try {
            await this.chain.associateToken([tokens], this.signer);
            return true;
        } catch (e) {
            console.log(e, "sdfds");
        }
    }

    async claim(token) {
        const error = new Error("Failed to Claim the NFT");

        const success = await this.chain
            .claimNFT(token.contract, token.htsToken, token.tokenId, this.signer)
            .catch(() => {
                throw error;
            });
        if (!success) throw error;
    }

    async listetnExecutedSocket(executedSocket, from) {
        return new Promise((resolve) => {
            const handler = async (fromChain, toChain, action_id, hash) => {
                console.log(fromChain, toChain, action_id, hash, "tx_executed_event_hedera");

                if (toChain === this.nonce && fromChain === from && hash) {
                    executedSocket.off("tx_executed_event", handler);
                    return resolve({ workarond_dest_hash: hash });
                }
                resolve(undefined);
                executedSocket.off("tx_executed_event", handler);
            };

            executedSocket.on("tx_executed_event", handler);
        });
    }
}

class ICP extends AbstractChain {
    constructor(params) {
        super(params);
    }

    async getNFTs(address, contract) {
        const dab = contract === "default";
        const [defaults, wrappedNfts, userCanister] = await Promise.allSettled([
            dab && super.getNFTs(address),
            this.chain.nftList(address),
            contract && !dab && this.chain.nftList(address, contract),
            //this.chain.nftList(address, this.chain.getParams().umt.toText()),
        ]);

        return (defaults.status === "fulfilled" ? defaults.value || [] : [])
            .concat(wrappedNfts.status === "fulfilled" ? wrappedNfts.value || [] : [])
            .concat(userCanister.status === "fulfilled" ? userCanister.value || [] : []);
    }

    async preParse(nft) {
        const metadata = nft.native.metadata || {};

        const { url, image, thumb, mimeType } = metadata;
        const uri = url || image || thumb;
        let format = uri?.match(/(?:\.([^.]+))?$/)?.at(1) || "";

        if (Object.keys(metadata).length === 0) {
            const contentType = (await fetch(setupURI(nft.uri))).headers.get("Content-Type");
            if (contentType.includes("application/json")) {
                format = "json";
            }
        }

        return {
            ...nft,
            native: {
                ...nft.native,
                contract: nft.collectionIdent,
                chainId: String(ChainNonce.DFINITY),
            },
            chainId: String(ChainNonce.DFINITY),
            tokenId: nft.native?.tokenId,
            contract: nft.collectionIdent,
            metaData:
                Object.keys(metadata).length > 0
                    ? {
                          ...metadata,
                          ...(mimeType === "video"
                              ? {
                                    animation_url: uri,
                                    animation_url_format: format,
                                }
                              : { image: uri, imageFormat: format }),
                      }
                    : format !== "json"
                    ? { image: nft.uri }
                    : undefined,
        };
    }

    prepareAgent = async () => {};

    async preTransfer(...args) {
        const nft = args[0];
        await this.prepareAgent(nft.native.canisterId);
        return await super.preTransfer(...args);
    }

    async transfer(args) {
        const { nft } = args;
        await this.prepareAgent(nft.native.canisterId);
        return await super.transfer(args);
    }

    adaptAddress(address) {
        try {
            return this.chain.getAccountIdentifier(address);
        } catch {
            return address;
        }
    }

    adaptHashView(_, receiver) {
        return this.adaptAddress(receiver);
    }

    async listetnExecutedSocket(executedSocket, from) {
        return new Promise((resolve, reject) => {
            const handler = async (
                fromChain, //: number,
                toChain, //: number,
                action_id, //: string,
                hash //: string
            ) => {
                console.log(fromChain, toChain, action_id, hash, "tx_executed_event");

                if (toChain === this.nonce && fromChain === from) {
                    const targetCanister = await this.chain.validatedMint(hash).catch((e) => {
                        console.log(e, "e in listetnExecutedSocket");
                        reject(e);
                    });

                    executedSocket.off("tx_executed_event", handler);
                    return resolve(targetCanister ? { tagetCanister: targetCanister } : undefined);
                }
                resolve(undefined);
                executedSocket.off("tx_executed_event", handler);
            };

            executedSocket.on("tx_executed_event", handler);
        });
    }

    /*handlerResult(_, address) {
        return {
            hash: this.adaptAddress(address),
        };
    }*/
}

class Casper extends AbstractChain {
    constructor(params) {
        super(params);
    }

    async validateAddress(address) {
        return this.chain.validateAddress(address).catch(() => false);
    }

    async normalizeReceiver(adr) {
        if (await this.chain.validateAddress(adr)) {
            return this.chain.convertToAccountHash(adr);
        }
        return adr;
    }

    async getNFTs(address) {
        return await this.bridge.nftList(this.chain, this.chain.toAccountHash(address));
    }

    async mintNFT(uri) {
        await this.chain.mintNft(this.signer, {
            name: "test",
            description: "test",
            uri,
        });
    }

    async preParse(nft) {
        let metaData = undefined;

        if (nft.native.metadata) {
            metaData = {
                image: nft.native.metadata.asset,
                ...nft.native.metadata,
            };
        }

        return {
            ...nft,
            native: {
                ...nft.native,
                chainId: String(ChainNonce.CASPER),
                contract: nft.native.contract_package_hash,
            },
            metaData,
        };
    }

    async unwrap(nft, data) {
        return {
            contract: data.wrapped?.contract,
            tokenId: data.wrapped.token_id || data.wrapped?.source_token_id,
            chainId: String(this.nonce),
            nft: {
                ...nft,
                collectionIdent: data.wrapped?.contract,
                native: {
                    ...nft.native,
                    chainId: String(this.nonce),
                    contract: data.wrapped?.contract,
                    tokenId: data.wrapped.token_id || data.wrapped?.source_token_id,
                },
                metaData: data,
            },
        };
    }

    /*   async balance(address) {
        const bal = await this.chain.balance(address);
        console.log(bal, " casd");
        return bal;
    }*/
}

export default {
    EVM,
    V3_EVM,
    V3_Multiversex,
    NoWhiteListEVM,
    VeChain,
    Elrond,
    Tron,
    Algorand,
    Tezos,
    Cosmos,
    Near,
    TON,
    Solana,
    APTOS,
    HEDERA,
    ICP,
    Casper,
};
