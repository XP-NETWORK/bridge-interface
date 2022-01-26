import { ChainFactory, ChainFactoryConfigs } from "xp.network";
import { Chain, Config } from "xp.network/dist/consts";
import { chainsConfig } from "../components/values";
import { setAlgorandClaimables, setBigLoader, setFactory, setNFTList } from "../store/reducers/generalSlice";
import store from "../store/store";
import { ChainData, getOldFactory, moralisParams } from "./oldHelper";

const axios = require("axios");

export const setupURI = (uri) => {

  // debugger
  if (uri && uri.includes("ipfs://")) {
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

export const preloadItem = (item, type, setLoaded) => {
  if (type === "video") {
    const vid = document.createElement("video");
    vid.src = item;
    vid.style.opacity = "0";
    vid.style.position = "absolute";
    vid.style.height = "0px";
    vid.style.width = "0px";
    document.body.appendChild(vid);
    vid.play();
    vid.onloadeddata = function() {
      setLoaded(true);
      vid?.remove();
    };
  } else {
    var img = new Image();
    img.src = item;
    img.onload = function() {
      setLoaded(true);
    };
  }
};

export const parseNFTS = async (nfts) => {
// console.log("helpers");
// debugger
const { from, to } = store.getState().general;
if(from.key === "Tezos"){
  console.log(nfts)
 return nfts.filter(n => n.native).map(n => {
   return {
     ...n,
     ...n?.native?.meta?.token?.metadata
   }
 })
}
  const result = await Promise.all(
    nfts.map(async (n) => {
      return await new Promise(async (resolve) => {
        try {
          
          if (!n.uri) resolve({ ...n });
      
          const res = await axios.get(setupURI(n.uri));
          if (res && res.data) {
            if (res.data.animation_url)
              preloadItem(res.data.animation_url, "video", () => {});
            else preloadItem(res.data.image, "image", () => {});
            resolve({ ...res.data, ...n });
          } else resolve(undefined);
        } catch (err) {
          if (err) {
            try {
              const res = await axios.get(('https://sheltered-crag-76748.herokuapp.com/')+(setupURI(n.uri?.uri ? n.uri?.uri : n.uri)));
              // console.log("res: ", res);
              if (res.data) {
                try {
                  const { uri } = res.data;
                  const result = await axios.get(('https://sheltered-crag-76748.herokuapp.com/')+(setupURI(n.uri?.uri ? n.uri?.uri : n.uri)));

                  resolve({ ...result.data, ...n, cantSend: true });
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
  const f = store.getState().general.factory
  
  if(f) return f
  
  const mainnetConfig = ChainFactoryConfigs.MainNet();
  const factory = ChainFactory(moralisParams, mainnetConfig);
  store.dispatch(setFactory(factory))
  return factory;
};
export const handleChainFactory = async (someChain) => {
  // debugger
  const factory = await getFactory();
  let chain;
  // console.log(someChain, 'somechain')
  try {
    someChain === "Ethereum"
    ? (chain = await factory.inner(Chain.ETHEREUM))
    : someChain === "BSC"
    ? (chain = await factory.inner(Chain.BSC))
    : someChain === "Tron"
    ? (chain = await factory.inner(Chain.TRON))
    : someChain === "Elrond"
    ? (chain = await factory.inner(Chain.ELROND))
    : someChain === "Polygon"
    ? (chain = await factory.inner(Chain.POLYGON))
    : someChain === "Avalanche"
    ? (chain = await factory.inner(Chain.AVALANCHE))
    : someChain === "Fantom"
    ? (chain = await factory.inner(Chain.FANTOM))
    : someChain === "Algorand"
    ? (chain = await factory.inner(Chain.ALGORAND))
    : someChain === "xDai"
    ? (chain = await factory.inner(Chain.XDAI))
    : someChain === "Solana"
    ? (chain = await factory.inner(Chain.SOLANA))
    : someChain === "Cardano"
    ? (chain = await factory.inner(Chain.CARDANO))
    : someChain === "Fuse"
    ? (chain = await factory.inner(Chain.FUSE))
    : someChain === "Velas"
    ? (chain = await factory.inner(Chain.VELAS))
    : someChain === "Tezos"
    ? (chain = await factory.inner(Chain.TEZOS))
    : (chain = "");
  return chain;
  } catch (error) {
    console.error(error)
  }
};

export const getNFTS = async (wallet, from) => {
  // debugger
  // console.log("wallet: ", wallet);
  const hardcoded = new URLSearchParams(window.location.search).get('checkWallet')
  const { algorandAccount, tronWallet } = store.getState().general
  const factory = await getFactory();
  const chain = await factory.inner(chainsConfig[from].Chain)
  // console.log('helloasdajk')
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
        .filter((n) => n.native)
        .filter((n) => {
          const { tokenId, contract, chainId } = n?.native;
          if (unique[`${tokenId}_${contract.toLowerCase()}_${chainId}`])
            return false;
          else {
            unique[`${tokenId}_${contract.toLowerCase()}_${chainId}`] = true;
  
            return true;
          }
        });
  
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

export const setNFTS = async (w, from) => {
  // debugger
  // console.log("setNFTS: ", w);
  store.dispatch(setBigLoader(true))
  const res = await getNFTS(w, from)
  const parsedNFTs = await parseNFTS(res)
    store.dispatch(setBigLoader(false))
    if(parsedNFTs.length){
      store.dispatch(setNFTList(parsedNFTs))
      // console.log(parsedNFTs)
  }
}

export function isValidHttpUrl(string) {
  // console.log("isValidHttpUrl: ", string);
  let url;
  if((string.includes("data:image/") || string.includes("data:application/"))) return true
  if(string.includes('ipfs://')) return true
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
      // console.log(nft)
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