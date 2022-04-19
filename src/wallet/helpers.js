import { AppConfigs, ChainFactory, ChainFactoryConfigs } from "xp.network";
import { Chain, Config } from "xp.network/dist/consts";
import { chainsConfig, CHAIN_INFO } from "../components/values";
import { setAlgorandClaimables, setBigLoader, setEachNFT, setFactory, setNFTList, setPreloadNFTs } from "../store/reducers/generalSlice";
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
  if (uri && (uri.includes("ipfs://"))) {
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
    }
  return uri;
};

export const checkIfJSON = jsonStr => {
  let obj
  try {
    obj = JSON.parse(jsonStr)
  } catch (error) {
    return false
  }
  return obj
}

const videoFormats = ["mp4", "ogg", "webm", "avi"]
const checkIfVid = (url) => {
  const _format = url.slice(url.lastIndexOf("."))
  return videoFormats.some(format => format === _format)
}
const imageFormats = ["apng", "gif", "jpg", "jpeg", "png", "svg", "webp"]
const checkIfImg = (url) => {
  const _format = url.slice(url.lastIndexOf("."))
  return imageFormats.some(format => format === _format)
}

export const parseEachNFT = async (nft, index, testnet) => {
  // debugger
  const { from } = store.getState().general;
  let whitelisted
  let ipfsImage
  let ipfsVideo
  
  let dataLoaded = false
  // debugger
  let nftObj = {
    uri: nft.uri,
    collectionIdent: nft.collectionIdent || undefined,
    native: {...nft.native},
    dataLoaded: true,
    whitelisted: testnet ? true : whitelisted,
  }

  if(!nft.uri){
    nftObj = {...nft, dataLoaded: true}
    store.dispatch(setEachNFT({nftObj, index}))
  }
  if(from.key === "Tezos"){
    nftObj.description = nft.native?.meta?.token?.metadata?.description || undefined
    nftObj.animation_url = nft.native?.meta?.token?.metadata?.animation_url || undefined
    nftObj.artifactUri = nft.native?.meta?.token?.metadata?.artifactUri || undefined
    nftObj.attributes = [...nft.native?.meta?.token?.metadata?.attributes] || undefined
    nftObj.image = nft.native?.meta?.token?.metadata?.image || undefined
    nftObj.displayUri = nft.native?.meta?.token?.metadata?.displayUri || undefined
    nftObj.ipfs = nft.native?.meta?.token?.metadata?.ipfs || undefined
    nftObj.name = nft.native?.meta?.token?.metadata?.name || undefined
    nftObj.wrapped = {...nft.native?.meta?.token?.metadata?.wrapped} || undefined
    nftObj.dataLoaded = true
    store.dispatch(setEachNFT({nftObj, index}))
  }
  else if(nft.uri.includes(".json"))
  
  // else if(nft.uri.includes(".json")){
  //   axios.get(nft.uri)
  //   .then( response => {
  //     const { attributes, description, image, name, animation_url, external_url } = response.data
  //     nftObj.name = name || undefined
  //     nftObj.image = image || undefined
  //     nftObj.description = description || undefined
  //     nftObj.external_url = external_url || undefined
  //     nftObj.attributes = [...attributes] || undefined
  //     nftObj.animation_url = animation_url || undefined
  //     nftObj.dataLoaded = true
  //     store.dispatch(setEachNFT({nftObj, index}))
  //   })
  //   .catch(error => {
  //     axios.get(setupURI(nft.uri)).then(response => {
  //       const { attributes, description, image, name, animation_url, external_url } = response.data
  //       nftObj.name = name || undefined
  //       nftObj.image = image || undefined
  //       nftObj.description = description || undefined
  //       nftObj.external_url = external_url || undefined
  //       nftObj.attributes = attributes?.length > 0 ? [...attributes] : attributes || undefined
  //       nftObj.animation_url = animation_url || undefined
  //       nftObj.dataLoaded = true
  //       store.dispatch(setEachNFT({nftObj, index}))
  //     })
  //   })
  // }
  // else{
  //   axios.get(setupURI(nft.uri))
  //   .then( response => {
  //     if(response.data?.image.includes('ipfs')){
  //       axios.get(setupURI(response.data?.image)).then(response => {
  //         if(response.data?.formats[0]?.mimeType.includes("image")){
  //           ipfsImage = response.data?.formats[0]?.uri
  //         }
  //         else if(response.data?.formats[0]?.mimeType.includes("video")){
  //           ipfsVideo = response.data?.formats[0]?.uri
  //         }
  //       }).catch(error => {
  //       console.log(error)
  //       })
  //     }
  //     // debugger
  //     let _img = imageFormats.some(format => format === response.data?.image.slice(response.data?.image.lastIndexOf(".")))
  //     let _vid = videoFormats.some(format => format === response.data?.animation_url.slice(response.data?.image.lastIndexOf(".")))
  //     nftObj.name = response.data?.name || undefined
  //     nftObj.image = _img || ipfsImage || nftObj.image || response.data?.image || undefined
  //     nftObj.description = response.data?.description || undefined
  //     nftObj.external_url = _vid ||response.data?.external_url || undefined
  //     nftObj.attributes = [...response.data?.attributes] || undefined
  //     nftObj.animation_url = nftObj.animation_url || response.data?.animation_url || undefined
  //     nftObj.dataLoaded = true
  //     store.dispatch(setEachNFT({nftObj, index}))
  //   })
  //   .catch( error => {
  //     console.error(error)
  //     store.dispatch(setEachNFT({nftObj, index}))
  //   })
  // }

  // if(!testnet && nft.native.contract === '0xED1eFC6EFCEAAB9F6d609feC89c9E675Bf1efB0a'){
  //   whitelisted = false
  // }
  // else if(!testnet){
  //   try {
  //     whitelisted = await isWhiteListed(from.text, nft)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // else if(testnet){
  //   whitelisted = true
  // }

  return dataLoaded
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
          const jsonURI = checkIfJSON(n.uri) || undefined
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
  debugger
  let claimables
  const factory = await getFactory()
  try {
    claimables = await factory.claimableAlgorandNfts(account)
    if(claimables && claimables.length > 0) {
      store.dispatch(setAlgorandClaimables(claimables))
    }
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