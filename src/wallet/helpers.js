import { AppConfigs, ChainFactory, ChainFactoryConfigs } from "xp.network";
import { Chain, Config } from "xp.network/dist/consts";
import { chainsConfig, CHAIN_INFO } from "../components/values";
import { setAlgorandClaimables, setBigLoader, setFactory, setNFTList } from "../store/reducers/generalSlice";
import store from "../store/store";
// import { from } from "@iotexproject/iotex-address-ts";
const { Harmony } = require('@harmony-js/core')
const axios = require("axios");

export const setupURI = (uri) => {
  // debugger
  if (uri && (uri.includes("ipfs://"))) {
    return "https://ipfs.io/" + uri.replace(":/", "");
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

const getURL = async (url) => {
  let res
  return await new Promise(async (resolve) => {
    const res = await axios.get(url)
    resolve(res)
  }).then(e => res = e)
}

export const parseNFTS = async (nfts) => {
const { from } = store.getState().general;
if(from.key === "Tezos"){
  const result = await Promise.all(
    nfts.map(async (n, index) => {
      return await new Promise(async (resolve) => {
        console.log(n)
        const native = n?.native
        const data = n?.native?.meta?.token?.metadata
        try {
          let object = { ...n, native: {...n, ...native, image: data.displayUri, meta: {...native.meta, wrapped: native.wrapped}}, ...data, image: data.displayUri, uri: data.displayUri }
          resolve(object)
        } catch (error) {
          
        }
      })
    })
  )
  return result
}
  const result = await Promise.all(
    nfts.map(async (n, index) => {
      return await new Promise(async (resolve) => {
        try {
          if (!n.uri) resolve({ ...n })

          const jsonURI = checkIfJSON(n.uri) || undefined
          const uri = jsonURI?.image
          if (jsonURI) resolve({...n, ...jsonURI, uri })
          const res = await axios.get(setupURI(n.uri));
          
          if (res && res.data) {
            const isImageIPFS = setupURI(res.data.image)?.includes('ipfs.io')
            
            let result = typeof res.data != "string" ? { ...res.data, ...n } : {...n}
            if(isImageIPFS) {              
              const ipfsNFT = await axios.get(setupURI(res.data.image))
              if(ipfsNFT.data && ipfsNFT.data.displayUri) result.image = ipfsNFT.data.displayUri
            }
            resolve(result);
          } 
          else resolve(undefined);
        } catch (err) {
          if (err) {
            try {
              const res = await axios.get(('https://sheltered-crag-76748.herokuapp.com/')+(setupURI(n.uri?.uri ? n.uri?.uri : n.uri)));
              if (res.data) {
                try {
                  const { uri } = res.data;
                  const result = await axios.get(('https://sheltered-crag-76748.herokuapp.com/')+(setupURI(n.uri?.uri ? n.uri?.uri : n.uri)));
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


export const getFactory = async () => {
  // debugger
  const f = store.getState().general.factory;
  const testnet  = store.getState().general.testNet

  if (f) return f;
  const testnetConfig = ChainFactoryConfigs.TestNet();
  const mainnetConfig = ChainFactoryConfigs.MainNet();
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    mainnetConfig.tronParams.provider = window.tronWeb;
  }
  const factory = ChainFactory(
    testnet ? AppConfigs.TestNet() : AppConfigs.MainNet(),
    testnet ? testnetConfig : mainnetConfig
  );
  store.dispatch(setFactory(factory));
  return factory;
};



export const handleChainFactory = async (someChain) => {
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
      default: return ''
    }
  } catch (error) {
    console.error(error)
  }
};

export const getNFTS = async (wallet, from) => {
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
        .filter((n) => n.native).filter(n => n.uri || n.native.meta.token.metadata.url || n.native.meta.token.metadata.image)
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
    console.log(err, 'nft list')
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


export const setNFTS = async (w, from, testnet) => {
  store.dispatch(setBigLoader(true))
  const factory = await getFactory()
  const inner = await factory.inner(CHAIN_INFO[from].nonce)
  const res = await getNFTS(w, from, testnet)
  const parsedNFTs = await parseNFTS(res)
  console.log(parsedNFTs)
  store.dispatch(setBigLoader(false))
  if(parsedNFTs.length){
      store.dispatch(setNFTList(parsedNFTs))
  }
  else {
    store.dispatch(setNFTList([]))
  }
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
    console.log(convertOne1(address))
    return convertOne1(address)
  }
  // else if(checkIfIo1(address)) return convertIo1(address)
}