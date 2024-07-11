import { ethers } from "ethers";

// import store from "../store/store";
import ABI from "../event/assets/abi/mintAbi.json";
import ABI1155 from "../event/assets/abi/erc1155Abi.json";
import axios from "axios";

/**
 * FORMAT DATA
 */
const formatData = (
  contractAddress,
  tokenURI,
  account,
  tokenId,
  contractType,
  chainId,
  native
) => {
  return {
    collectionIdent: contractAddress,
    uri: tokenURI,
    native: {
      owner: account,
      tokenId,
      uri: tokenURI,
      contract: contractAddress,
      name: "NFTs",
      chainId,
      contractType,
      ...native,
    },
  };
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
      return contract && tokenId;
    default:
      return true;
  }
};

/**
 * CHECK NFT EXIST
 */
export const checkNFTExist = (NFTList, contractAddress, tokenId, from) => {
  const id = tokenId.toString();
  const fomatedID = id.length < 2 ? "0" + id : id;
  switch (from.type) {
    case "Elrond":
      return NFTList.find(
        (n) =>
          n.native.contract === contractAddress && n.native.tokenId == fomatedID
      );
    default:
      return NFTList.find(
        (n) => n.native.contract === contractAddress && n.native.tokenId == id
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
      throw new Error("You don't own this NFT!");
    }
  }
};

/**
 * IMPORT NFT URI FROM ELROND CHAIN
 */
export const importNFTURI_Elrond = async (contract, tokenId, account, from) => {
  try {
    const id = tokenId.toString();
    const fomatedID = id.length < 2 ? "0" + id : id;
    const tokenIdentifier = `${contract}-${fomatedID}`;
    const { data } = await axios.get(
      // TODO: put the correct URL
      `https://devnet-api.multiversx.com/nfts/${tokenIdentifier}`
    );

    if (data.owner !== account) {
      return Promise.reject(new Error("You don't own this NFT!"));
    }

    return formatData(
      contract,
      data.url,
      account,
      fomatedID,
      "",
      from.nonce,
      data
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
 *  IMPORT NFT FROM HEDERA CHAIN
 */
export const importNFTURI_Hedera = async (
  tokenId,
  serialNumber,
  account,
  from
) => {
  try {
    const { data } = await axios.get(
      `https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/nfts/${serialNumber}`
    );

    if (data.account_id !== account) {
      return Promise.reject(new Error("You don't own this NFT!"));
    }

    const decodeMetadata = await Buffer.from(
      data.metadata,
      "base64"
    ).toLocaleString();
    console.log({
      decodeMetadata,
    });

    const { data: metadata } = await axios.get(
      `https://ipfs.io/ipfs/${decodeMetadata.split("ipfs://")[1]}`
    );

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
