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
  } else if (uri) return uri.replace("http://", "https://");
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
  const { from, to } = store.getState().general;
  const result = await Promise.all(
    nfts.map(async (n) => {
      return await new Promise(async (resolve) => {
        try {
          console.log(n, 'parsenfts')
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
              const res = await axios.post("https://wnfts.xp.network/get-uri", {
                blockchain: from.type,
                uri: n.uri,
                contract: n.native.contract ? n.native.contract : "alsa",
              });
              if (res.data) {
                try {
                  const { uri } = res.data;
                  const result = await axios.get(setupURI(uri?.uri));

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
  const f = store.getState().general.factory
  console.log(f, 'hellosa')
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
    : (chain = "");
  return chain;
};

export const getNFTS = async (wallet, from) => {
  const {algorandAccount} = store.getState().general
  const factory = await getFactory();
  const chain = await factory.inner(chainsConfig[from].Chain)
  try {
    console.log('hel342432234342324lo')
    const res = 
    algorandAccount 
    ? (await axios.get(`https://nftindexing.herokuapp.com/15/${wallet}`)).data.result
    : 
    await factory.nftList(
        chain, // The chain of interest
        wallet // The public key of the NFT owner
      )
    const unique = {};
    try {
      const allNFTs = res
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
  try {
    if(algorandAccount && algorandAccount.length > 50) {
      const factory = await getFactory()
      const claimables = await factory.claimableAlgorandNfts(algorandAccount)
      
      console.log(algorandAccount,'123132132', claimables)
      if(claimables && claimables.length > 0) {
        if(returnList) return claimables
        else store.dispatch(setAlgorandClaimables(claimables))
      }
  
    }
    return []
  } catch(err) {
    return []
  }

}

export const setNFTS = async (w, from) => {
  store.dispatch(setBigLoader(true))
  const res = await getNFTS(w, from)
  const parsedNFTs = await parseNFTS(res)
    store.dispatch(setBigLoader(false))
    if(parsedNFTs.length){
      store.dispatch(setNFTList(parsedNFTs))
  }
}