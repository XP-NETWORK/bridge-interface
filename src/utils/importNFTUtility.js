import axios from "axios";
import { ethers } from "ethers";

import store from "../store/store";
import ABI from "../event/assets/abi/mintAbi.json";
import ABI1155 from "../event/assets/abi/erc1155Abi.json";
import { setupURI } from "../utils";

// ----------------------------

// ----------------------------

/**
 * FORMAT DATA
 */
const formatData = (
  contractAddress,
  uri,
  owner,
  tokenId,
  contractType,
  chainId,
  native
) => {
  const obj = {
    collectionIdent: contractAddress,
    uri,
    native: {
      owner,
      tokenId,
      uri,
      contract: contractAddress,
      chainId,
      contractType,
      ...native,
    },
  };

  if (native?.image) {
    obj.image = native.image;
  }

  return obj;
};

/**
 * CHECK VALID FORM
 */
export const validForm = (from, contract, tokenId) => {
  switch (from.type) {
    case "EVM":
      return contract?.length === 42 && tokenId;
    case "Elrond":
      return tokenId;
    case "Hedera":
    case "Tezos":
      return contract && tokenId;
    case "TON":
      return contract && contract.length > 10;
    default:
      return true;
  }
};

/**
 * IMPORT INPUTS
 */
export const importInputs = (from) => {
  switch (from.type) {
    case "EVM":
      return {
        contract: {
          label: "1. Paste contract address",
          placeholder: "0x...",
        },
        tokenId: {
          label: "2. Paste Token ID",
          placeholder: "Enter Token ID",
        },
      };
    case "Elrond":
      return {
        contract: {
          label: "1. Paste Collection address",
          placeholder: "0x...",
        },
        tokenId: {
          label: "2. Paste Token ID",
          placeholder: "Enter Token ID",
        },
      };
    case "Hedera":
      return {
        contract: {
          label: "1. Paste contract address",
          placeholder: "EBSD-...",
        },
        tokenId: {
          label: "2. Paste Token ID",
          placeholder: "01",
        },
      };
    case "Tezos":
      return {
        contract: {
          label: "1. Paste contract address",
          placeholder: "0x...",
        },
        tokenId: {
          label: "2. Paste Token ID",
          placeholder: "Enter Token ID",
        },
      };
    case "TON":
      return {
        contract: {
          label: "1. Paste item address",
          placeholder: "EQD...",
        },
        tokenId: {
          label: "",
          placeholder: "",
        },
      };
    case "Solana":
      return {
        contract: {
          label: "1. Paste Token address",
          placeholder: "D0...",
        },
        tokenId: {
          label: "",
          placeholder: "",
        },
      };

    default:
      return {
        contract: {
          label: "1. Paste contract address",
          placeholder: "0x...",
        },
        tokenId: {
          label: "2. Paste Token ID",
          placeholder: "Enter Token ID",
        },
      };
  }
};

/**
 * CHECK NFT EXIST
 */
export const checkNFTExist = (NFTList, contractAddress, tokenId, from) => {
  switch (from.type) {
    case "Elrond":
      return NFTList.find((n) =>
        n.native.contract === contractAddress &&
        n.native.tokenId == tokenId.toString().length < 2
          ? "0" + tokenId.toString()
          : tokenId.toString()
      );
    case "TON":
    case "Solana":
      return NFTList.find((n) => n.native.contract === contractAddress);
    default:
      return NFTList.find(
        (n) =>
          n.native.contract === contractAddress &&
          n.native.tokenId == tokenId?.toString()
      );
  }
};

/**
 * IMPORT NFT URI
 */
export const importNFTURI = async (
  contract,
  tokenId,
  account,
  signer,
  from
) => {
  switch (from.type) {
    case "EVM":
      return await importNFTURI_EVM(contract, tokenId, account, signer, from);
    case "Elrond":
      return await importNFTURI_Elrond(contract, tokenId, account, from);
    case "Hedera":
      return await importNFTURI_Hedera(contract, tokenId, account, from);
    case "Tezos":
      return await importNFTURI_Tezos(contract, tokenId, account, from);
    case "TON":
      return await importNFTURI_TON(contract, account, from);
    case "Solana":
      return await importNFTURI_Solana(contract, account, from);
    default:
      throw new Error("Invalid chain");
  }
};

/**
 * IMPORT NFT URI FROM EVM CHAIN
 */
export const importNFTURI_EVM = async (
  contract,
  tokenId,
  account,
  signer,
  from
) => {
  const Contract721 = new ethers.Contract(contract, ABI, signer);
  const Contract1155 = new ethers.Contract(contract, ABI1155, signer);

  try {
    // EVM CHAIN for ERC721
    const owner721 = await Contract721.ownerOf(tokenId);
    if (owner721 !== account) throw new Error("You don't own this NFT!");

    const tokenURI = await Contract721.tokenURI(tokenId);
    return formatData(
      contract,
      tokenURI,
      account,
      tokenId,
      "ERC721",
      from.chainId
    );
  } catch (error) {
    console.log("Error 721", error);
    try {
      // CHECK IF THE USER HAS THE NFT ON ERC1155 CHAIN
      const balance1155 = await Contract1155.balanceOf(account, tokenId);
      if (balance1155 <= 0) throw new Error("You don't own this NFT!");

      const tokenURI = await Contract1155.uri(tokenId);
      return formatData(
        contract,
        tokenURI,
        account,
        tokenId,
        "ERC1155",
        from.chainId
      );
    } catch (error) {
      console.log({ error });
      throw new Error("You don't own this NFT!");
    }
  }
};

/**
 * IMPORT NFT URI FROM ELROND CHAIN
 */
export const importNFTURI_Elrond = async (contract, tokenId, account, from) => {
  try {
    const {
      general: { testNet },
    } = store.getState();
    const id = tokenId.toString();
    const fomatedID = id.length < 2 ? "0" + id : id;
    const tokenIdentifier = `${contract}-${fomatedID}`;
    const { data } = await axios.get(
      testNet
        ? `https://devnet-api.multiversx.com/nfts/${tokenIdentifier}`
        : `https://api.multiversx.com/nfts/${tokenIdentifier}`
    );

    if (data.owner !== account) {
      return Promise.reject(new Error("You don't own this NFT!"));
    }

    return formatData(contract, data.url, account, fomatedID, "", from.nonce, {
      ...data,
      image: data.url,
    });
  } catch (error) {
    console.log({ error });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while importing the NFT!"
    );
  }
};

/**
 *  IMPORT NFT FROM HEDERA CHAIN
 */
export const importNFTURI_Hedera = async (
  tokenId,
  serialNumber,
  account,
  from
) => {
  try {
    const {
      general: { testNet },
    } = store.getState();
    const { data } = await axios.get(
      testNet
        ? `https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/nfts/${serialNumber}`
        : `https://mainnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/nfts/${serialNumber}`
    );

    if (data.account_id !== account) {
      return Promise.reject(new Error("You don't own this NFT!"));
    }

    const decodeMetadata = await Buffer.from(
      data.metadata,
      "base64"
    ).toLocaleString();

    const { data: metadata } = await axios.get(setupURI(decodeMetadata));

    return formatData(
      tokenId,
      metadata.imageUrl,
      account,
      serialNumber,
      "",
      from.nonce,
      metadata
    );
  } catch (error) {
    console.log({ error });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while importing the NFT!"
    );
  }
};

/**
 *  IMPORT NFT FROM TEZOS CHAIN
 */
export const importNFTURI_Tezos = async (contract, tokenId, account, from) => {
  try {
    const {
      general: { testNet },
    } = store.getState();
    const { data } = await axios.get(
      testNet
        ? `https://api.ghostnet.tzkt.io/v1/tokens/balances?account=${account}&token.tokenId=${tokenId}&token.contract=${contract}&token.standard=fa2&limit=10000`
        : `https://api.tzkt.io/v1/tokens/balances?account=${account}&token.tokenId=${tokenId}&token.contract=${contract}&token.standard=fa2&limit=10000`
    );

    const { token } = data.find((t) => t.token.tokenId === tokenId);

    if (data.length <= 0 || !token) {
      return Promise.reject(new Error("You don't own this NFT!"));
    }

    return formatData(
      contract,
      setupURI(token.metadata?.artifactUri),
      account,
      tokenId,
      "FA2",
      from.nonce,
      {
        ...token.metadata,
        image: setupURI(
          token.metadata?.displayUri ?? token.metadata?.artifactUri
        ),
        animation_url: setupURI(token.metadata?.artifactUri),
      }
    );
  } catch (error) {
    console.log({ error });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while importing the NFT!"
    );
  }
};

/**
 * IMPORT NFT FROM TON CHAIN
 */
export const importNFTURI_TON = async (contract, account, from) => {
  try {
    const { data } = await axios.get(
      // TODO: put the testnet URL
      `https://api.ton.cat/v2/contracts/nft/${contract}`
    );

    if (data[data.type].owner_address !== account) {
      return Promise.reject(new Error("You don't own this NFT!"));
    }

    if (data.type !== "nft_item") {
      return Promise.reject(new Error("Please enter the item address!"));
    }

    return formatData(
      contract,
      data.nft_item.content_url,
      account,
      contract,
      "TON",
      from.nonce,
      {
        ...data.nft_item.metadata,
        image: data.nft_item.metadata.image.original,
        ...data.nft_item.metadata.image,
      }
    );
  } catch (error) {
    console.log({ error });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while importing the NFT!"
    );
  }
};

/**
 * IMPORT NFT FROM SOLANA CHAIN
 */
export const importNFTURI_Solana = async (contract, account, from) => {
  try {
    const {
      general: { testNet },
    } = store.getState();
    const { data } = await axios.post(
      testNet
        ? "https://explorer-api.devnet.solana.com/"
        : "https://explorer-api.mainnet-beta.solana.com/",
      {
        id: contract,
        jsonrpc: "2.0",
        method: "getAsset",
        params: {
          id: contract,
        },
      }
    );

    if (data.error) {
      return Promise.reject(
        new Error(
          data.error.code === -32000
            ? "Invalid contract address!"
            : "An error occurred while importing the NFT!"
        )
      );
    }

    if (data?.result?.authorities?.[0]?.address !== account) {
      return Promise.reject(new Error("You don't own this NFT!"));
    }

    const { data: metadata } = await axios.get(data.result.content.json_uri);

    console.log(formatData(
      contract,
      metadata.image,
      account,
      contract,
      "SPL",
      from.nonce,
      {
        ...metadata,
        image: metadata.image,
      }
    ));

    return formatData(
      contract,
      metadata.image,
      account,
      contract,
      "SPL",
      from.nonce,
      {
        ...metadata,
        image: metadata.image,
        nftMint: contract,
      }
    );
  } catch (error) {
    console.log({ error });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while importing the NFT!"
    );
  }
};
