import { AppConfigs, ChainFactory, ChainFactoryConfigs } from "xp.network";
import { Chain, Config } from "xp.network/dist/consts";
import { chainsConfig, CHAIN_INFO } from "../components/values";
import { setAlgorandClaimables, setBigLoader, setEachClaimables, setEachNFT, setFactory, setNFTList, setPreloadNFTs } from "../store/reducers/generalSlice";
import store from "../store/store";
import io from "socket.io-client";
import { isWhiteListed } from "./../components/NFT/NFTHelper"

const socketUrl = "wss://dev-explorer-api.herokuapp.com";
export const socket = io(socketUrl, {
  path: "/socket.io",
});
const { Harmony } = require('@harmony-js/core')
const axios = require("axios");

export const setupURI = (uri) => {
  // debugger
if(uri){ if(uri.includes("https://ipfs.io")){
    return uri
  }
  else if (uri && (uri.includes("ipfs://"))) {
    return "https://ipfs.io/" + uri.replace(":/", "");
  }
  else if(uri && (uri.includes("https://ipfs.io"))){
    return uri
  }
  else if(uri && (uri.includes("data:image/") || uri.includes("data:application/"))){
    return uri
  }
  else 
    {
      if (uri) return uri.replace("http://", "https://");
    }}
  return uri;
};


const checkIfImage = async (url) => {
  let response
  const imageFormats = [".png", ".gif", ".jpg", ".jpeg", ".png", ".svg", ".webp"]
  if(url){
    const imageFormat = imageFormats.some(format => url?.includes(format))
    if(imageFormat){
      return true
    }
    else{
      try {
        response = await axios.get(url)
      } catch (error) {
        console.log(error)
        response = await axios.get(setupURI(url))
      }
    }
  }
}

const checkIfVideo = async (url) => {
  // debugger
  let response
  const videoFormats = [".mp4", ".ogg", ".webm", ".avi"]
  if(url){
    const videoFormat = videoFormats.some(format => url?.includes(format))
    if(videoFormat){
      return true
    }
    else{
      // try {
      //   response = await axios.get(url)
      //   if(typeof response.data === "object"){
      //     console.log(response)
      //   }
      // } catch (error) {
      //   console.log(error)
      //   response = await axios.get(setupURI(url))
      //   if(typeof response.data === "object"){
      //     console.log(response)
      //   }
      // }
    }
  }
}


export const parseEachNFT = async (nft, index, testnet, claimables) => {
  const uri = nft.uri
  const { from, NFTList } = store.getState().general;
  let whitelisted
  let nftObj = {
    uri: nft.uri,
    collectionIdent: nft.collectionIdent || undefined,
    native: {...nft.native},
    dataLoaded: true,
    whitelisted: testnet ? true : whitelisted,
    nftId: nft.nftId || undefined,
    appId: nft.appId || undefined
  }
  if(uri.indexOf("http://") === -1 || uri.indexOf("https://") -1){
    nftObj.dataLoaded = true
    nftObj.image = undefined
    nftObj.animation_url = undefined
  }
  let response

  try {
    response = await axios.get(`https://sheltered-crag-76748.herokuapp.com/${uri}`).catch( error => {
      console.log(error)
    })
    nftObj = {...nftObj, ...response.data}
    if(nftObj.data?.image_url){
      const image  = nftObj.data?.image
      nftObj.image = image
      nftObj.dataLoaded = true
    }
  } catch (error) {
    response = await axios.get(setupURI(uri))
    nftObj = {...nftObj, ...response.data}
    if(nftObj.data?.image_url){
      const image  = nftObj.data?.image
      nftObj.image = image
      nftObj.dataLoaded = true
    }
  }

  if(from.text === "Tezos"){
    // debugger
    nftObj.image = nft.image || nft.native?.uri
    nftObj.collectionIdent = nft.collectionIdent
    nftObj.native.token_id = nft.native?.token_id
    nftObj.native.contract = nft.native?.contract
    nftObj.native = {...nftObj.native, ...nftObj.native?.meta}
  }

  if(!testnet && nft.native.contract === '0xED1eFC6EFCEAAB9F6d609feC89c9E675Bf1efB0a'){
    whitelisted = false
  }
  else if(!testnet){
    try {
      whitelisted = await isWhiteListed(from.text, nft)
      nftObj.whitelisted = whitelisted
    } catch (error) {
      console.log(error);
    }
  }
  if(nftObj?.image?.includes("ipfs://") && !nftObj?.image?.includes("https://ipfs.io")){
    nftObj.image = "https://ipfs.io/" + nftObj.image.replace(":/", "")
  }
  if(nftObj.image){
    if(await checkIfVideo(nftObj.image)){
      nftObj.animation_url = nftObj.image
      nftObj.image = undefined
    }
  }
  // if(nftObj.animation_url){
  //   const animation = await checkIfVideo(nftObj.animation_url)
  // }
  if(claimables){
    store.dispatch(setEachClaimables({nftObj, index}))
  }
  if(!NFTList[index].dataLoaded){
    store.dispatch(setEachNFT({nftObj, index}))
  }
}


export const parseNFTS = async (nfts) => {
const { from, to } = store.getState().general;
if(from.key === "Tezos"){
 return nfts.filter(n => n.native).map(n => {
   return {
     ...n,
     ...n?.native?.meta?.token?.metadata
   }
 })
}
  const result = await Promise.all(
    nfts.map(async (n, index) => {
      return await new Promise(async (resolve) => {
        try {
          if (!n.uri) resolve({ ...n })
          const jsonURI =  undefined
          const uri = jsonURI?.image
          if (jsonURI) resolve({...n, ...jsonURI, uri })
          const res =  await axios({url: setupURI(n.uri), timeout: 5000});
          
          if (res && res.data) {
            const isImageIPFS = setupURI(res.data.image)?.includes('ipfs.io')
            
            let result = typeof res.data != "string" ? { ...res.data, ...n } : {...n}
            if(isImageIPFS) {              
              const ipfsNFT = await axios({url: setupURI(res.data.image), timeout: 5000});
              if(ipfsNFT.data && ipfsNFT.data.displayUri) result.image = ipfsNFT.data.displayUri
            }
            resolve(result);
          } 
          else resolve(undefined);
        } catch (err) {
          if (err) {
            try {
              const res = await axios({url: `https://sheltered-crag-76748.herokuapp.com/${setupURI(n.uri?.uri ? n.uri?.uri : n.uri)}`, timeout: 5000});
              if (res.data) {
                try {
                  const { uri } = res.data;
                  const result = await axios({url: `https://sheltered-crag-76748.herokuapp.com/${setupURI(n.uri?.uri ? n.uri?.uri : n.uri)}`, timeout: 5000});
                  resolve({ data: result.data, ...n, cantSend: true });
                } catch (err) {
                  resolve({...n});
                }
              } else {
                resolve(undefined);
              }
            } catch (err) {
              
              resolve(undefined);
            }
          }
        }
      });
    })
  );
  return result.filter((n) => n);
};

export const isALLNFTsApproved = () => {
  const { selectedNFTList, approvedNFTList } = store.getState().general;
  if (selectedNFTList.length <= approvedNFTList.length) {
    const approvedNFTs = [];
    approvedNFTList.forEach((n) => {
      const { native } = n;
      const isInSelected = selectedNFTList.filter((y) => {
        const { tokenId, contract, chainId } = y.native;
        return (
          tokenId === native.tokenId &&
          contract === native.contract &&
          chainId === native.chainId
        );
      })[0];
      if (isInSelected) approvedNFTs.push(isInSelected);
    });
    return approvedNFTs.length === selectedNFTList.length;
  } else return false;
};

export const transformToDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleDateString("en-US", {
    month: "short", //month: window.innerWidth > 480 ? "long" : "short",
    day: "numeric",
  });
  const year = dateObj.getFullYear();
  const day = month.replace(/^\D+/g, "");
  let ending = "th";
  if (day === "1") {
    ending = "st";
  }
  if (day === "2") {
    ending = "nd";
  }
  if (day === "3") {
    ending = "rd";
  }
  const tm = month + ", " + year;
  return tm
}


export const getFactory = async () => {
  // debugger
  const f = store.getState().general.factory;
  const testnet  = store.getState().general.testNet

  if (f) return f;
  const testnetConfig = await ChainFactoryConfigs.TestNet();
  const mainnetConfig = await ChainFactoryConfigs.MainNet();
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    mainnetConfig.tronParams.provider = window.tronWeb;
  }
  const factory = ChainFactory(
    testnet ?  AppConfigs.TestNet() :  AppConfigs.MainNet(),
    testnet ? testnetConfig : mainnetConfig
  );
  store.dispatch(setFactory(factory));
  return factory;
};

export const getFac = async () => {
  const mainnetConfig = ChainFactoryConfigs.MainNet()
  const factory = ChainFactory(AppConfigs.MainNet(), mainnetConfig)
  return factory
}



export const handleChainFactory = async (someChain) => {
  // debugger
  const factory = await getFactory();
  try {
    switch (someChain) {
      case "Ethereum":
        return await factory.inner(Chain.ETHEREUM)
      case "BSC":
        return await factory.inner(Chain.BSC)
      case "Tron":
        return await factory.inner(Chain.TRON)
      case "Elrond":
        return await factory.inner(Chain.ELROND)
      case "Polygon":
        return await factory.inner(Chain.POLYGON)
      case  "Avalanche":
        return await factory.inner(Chain.AVALANCHE)
      case "Fantom": 
        return await factory.inner(Chain.FANTOM)
      case "Algorand":
        return await factory.inner(Chain.ALGORAND)
      case "xDai":
        return await factory.inner(Chain.XDAI)
      case "Solana":
        return await factory.inner(Chain.SOLANA)
      case "Cardano":
        return await factory.inner(Chain.CARDANO)
      case "Fuse":
        return await factory.inner(Chain.FUSE)
      case "Velas":
        return await factory.inner(Chain.VELAS)
      case "Tezos":
        return await factory.inner(Chain.TEZOS)
      case "Iotex":
        return await factory.inner(Chain.IOTEX)
      case "Harmony":
        return await factory.inner(Chain.HARMONY)
      case "Aurora":
        return await factory.inner(Chain.AURORA)
      case "GateChain":
        return await factory.inner(Chain.GATECHAIN)
      default: return ''
    }
  } catch (error) {
    console.error(error)
  }
};

export const getNFTS = async (wallet, from) => {
  // debugger
  console.log("getNFTS")
  const hardcoded = new URLSearchParams(window.location.search).get('checkWallet')
  const { algorandAccount, tronWallet } = store.getState().general
  const factory = await getFactory();
  const chain = await factory.inner(chainsConfig[from].Chain)
  try {
    // debugger
    let response 
    if(tronWallet){
      response = await getTronNFTs(tronWallet)
    }
    else{
      response = await factory.nftList(chain, hardcoded ? hardcoded : wallet)
    }
    const unique = {};
    try {
      const allNFTs = response
        .filter((n) => n.native).filter(n => n.uri)
        .filter((n) => {
          const { tokenId, contract, chainId } = n?.native;
          if (unique[`${tokenId}_${contract.toLowerCase()}_${chainId}`])
            return false;
          else {
            unique[`${tokenId}_${contract.toLowerCase()}_${chainId}`] = true;
  
            return true;
          }
        })
      return allNFTs
    } catch (err) {
      return [];
    }
  } catch(err) {
    console.log(err, 'NFT Indexer error')
    return []
  }

};

export const setClaimablesAlgorand = async (algorandAccount, returnList) => {
  let claimables
  try {
    if(algorandAccount && algorandAccount.length > 50) {
      const factory = await getFactory()
      claimables = await factory.claimableAlgorandNfts(algorandAccount)
      if(claimables && claimables.length > 0) {
        if(returnList) return claimables
        else store.dispatch(setAlgorandClaimables(claimables))
      }
    }
    return []
  } catch(err) {
    console.error(err);
    return []
  }
}

export const getAlgorandClaimables = async (account) => {
  // debugger
  let claimables
  const factory = await getFactory()
  try {
    claimables = await factory.claimableAlgorandNfts(account)
    store.dispatch(setAlgorandClaimables(claimables))
  } catch (error) {
    console.error(error);
  }
}


export const setNFTS = async (w, from, testnet) => {
  store.dispatch(setBigLoader(true))
  const res = await getNFTS(w, from, testnet)
  store.dispatch(setPreloadNFTs(res.length))
  store.dispatch(setNFTList(res))
  store.dispatch(setBigLoader(false))
}

export function isValidHttpUrl(string, index) {
  // debugger

  let url;
  if((string.includes("data:image/") || string.includes("data:application/"))) return true
  if(string.includes('ipfs://')) return true
  if(string.includes("ipfs")) return true
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export const getTronNFTs = async wallet => {
  const res = await axios.get(`https://apilist.tronscan.org/api/account/tokens?address=${wallet}&start=0&limit=500&hidden=0&show=3&sortType=0&sortBy=0`)
  const { total, data } = res.data

  if(total > 0) {
    const tokens = []
    for await(let nft of data) {
      const { tokenId, balance,tokenName,tokenAbbr } = nft
      const contract = await window.tronWeb.contract().at(tokenId)
      const array = new Array(parseInt(balance)).fill(0).map((n,i) => i)
      for await(let index of array) {
        try {
          const token = await contract.tokenOfOwnerByIndex(wallet,index).call()
          const uri = await contract.tokenURI(parseInt(token._hex)).call()
          const t = {
            uri,
            native: {
              chainId: '9',
              contract: tokenId,
              contractType: 'ERC721',
              name: tokenName,
              symbol: tokenAbbr,
              tokenId: parseInt(token._hex),
              uri
            }
          }
          tokens.push(t)
        } catch(err) {
          console.log(err)
        }

      }
    }
    return tokens
  }
  return []
}


export const checkIfOne1 = (address) => {
  return address?.slice(0,4) === "one1" ? true : false
}

export const checkIfIo1 = (address) => {
  return address?.slice(0, 3) === "io1" ? true : false
}

export const convertOne1 = (address) => {
  const hmySDK = new Harmony()
  const ethAddr = hmySDK.crypto.fromBech32(address)
  return ethAddr
}

// export const convertIo1 = (address) => {
//   const addr = from(address)
//   return addr.stringEth()
// }

export const convert = (address) => {
  // debugger
  if(checkIfOne1(address)){
    return convertOne1(address)
  }
  // else if(checkIfIo1(address)) return convertIo1(address)
}