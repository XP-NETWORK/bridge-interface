import {ethers} from 'ethers'
import store from '../store/store'
import { createChainFactory } from "./connectors";
import { ChainFactory } from "xp.network";
import TronWeb from 'tronweb'
import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
import { chainsConfig } from '../components/values';
import { create } from 'ipfs-http-client';

export const moralisParams = {
    exchangeRateUri: "https://testing-bridge.xp.network/exchange/",
    txSocketUri: 'https://sockettx.herokuapp.com',
    moralisNetwork: "mainnet",
    moralisServer: "https://azz9akudh6cf.usemoralis.com:2053/server",
    moralisAppId: "vt2JeuihhzyV9vgYbeAYO5BVSaCOdkAKr608XJOv",
    nftListAuthToken: "eyJhbGciOiJFUzI1NiJ9.eyJhdXRob3JpdHkiOjEsImlhdCI6MTYzODk2MjMzOCwiZXhwIjoxNjQ2NzM4MzM4fQ.9eQMNMtt-P6myPlji7nBC9PAwTftd0qQvwnIZSt4ycM4E45NpzCF0URsdYj_YN_xqQKQpcHiZu1o4EXjJa_-Zw",
    tronScanUri: 'https://apilist.tronscan.org/api/',
    nftListUri: 'https://indexnft.herokuapp.com',
    heartbeatUri: 'https://xpheartbeat.herokuapp.com'
}
const axios = require('axios')




export const getFromParams = async () => {
    const from = store.getState().general.from.key
    let provider
    try{
        provider = new ethers.providers.Web3Provider(window.ethereum)
    }catch(err) {}

    
    if(from === 'Ethereum') {
        return {
            ropstenParams: {
                ...ChainData.Ethereum,
                provider
              }
        }
    } else if(from === 'Polygon') {
        return {
            
            polygonParams: {
                ...ChainData.Polygon,
                provider
              }
        }
    } else if(from === 'BSC') {
        return {
            bscParams: {
                ...ChainData.BSC,
                provider
              }
        }
    }  
    else if(from === 'xDai') {
        return {
            xDaiParams: {
                ...ChainData.xDai,
                provider
              }
        }
    }  
    else if(from === 'Fantom') {
        return {
            fantomParams: {
                ...ChainData.Fantom,
                provider
              }
        }
    } else if(from === 'Avalanche') {
        return {
            avalancheParams: {
                ...ChainData.Avalanche,
                provider
              }
        }
    } else if(from === 'Elrond') {
        return {
            elrondParams: {
                ...ChainData.Elrond,
              }
        }
    } else if(from === 'Tron') {
        // console.log(window.tronWeb, 'hellosaklda')
        return {
            tronParams: {
                ...ChainData.Tron,
                provider: window.tronWeb
            }
        }
    } else if(from === 'Algorand') {
        return {
            algorandParams: {
                ...ChainData.Algorand,
                provider: {
                    algoSigner: window.AlgoSigner,
                },
                algodApiKey:
                "e5b7d342b8a742be5e213540669b611bfd67465b754e7353eca8fd19b1efcffd",
              algodUri: "https://algorand-node.xp.network/",
              nonce: 15,
              sendNftAppId: 457256665,
              algodPort: 443,
            }
        }
    }
}

export const getRPCFactory = async (chain) => {
    const {from, to} = store.getState().general
    const f = await getFactoryParams(from)
    const t = await getFactoryParams(to)
    
    return ChainFactory(
        moralisParams,
        {
        ...f, ...t
    });
}

export const getFullFactory = async () => {
    const chains = Object.keys(ChainData)
    const params = chains.map(n => getFactoryParams(n)).filter(n => n)
    let o  = {}
    params.map(n => { 
        if(n) {
            let keys = Object.keys(n)[0]
            o = {...o, [keys]: n} 

        }
    })
    
    return ChainFactory(moralisParams, o)
}

export const getFactoryParams = (chain) => {
    if(chain === 'Ethereum') {
        return {
            ropstenParams: {
                ...ChainData.Ethereum,
                provider: new ethers.providers.JsonRpcProvider(chainsConfig.Ethereum.rpc)
              }
        }
    } else if(chain === 'Polygon') {
        return {
            polygonParams: {
                ...ChainData.Polygon,
                provider: new ethers.providers.JsonRpcProvider(chainsConfig.Polygon.rpc)
              }
        }
    } else if(chain === 'Fantom') {
        return {
            fantomParams: {
                ...ChainData.Fantom,
                provider: new ethers.providers.JsonRpcProvider(chainsConfig.Fantom.rpc)
              }
        }
    } else if(chain === 'Avalanche') {
        return {
            avalancheParams: {
                ...ChainData.Avalanche,
                provider: new ethers.providers.JsonRpcProvider(chainsConfig.Avalanche.rpc)
              }
        }
    }
    else if(chain === 'BSC') {
        return {
            bscParams: {
                ...ChainData.BSC,
                provider: new ethers.providers.JsonRpcProvider(chainsConfig.BSC.rpc)
              }
        }
    } 
    else if(chain === 'xDai') {
        return {
            xDaiParams: {
                ...ChainData.xDai,
                provider: new ethers.providers.JsonRpcProvider(chainsConfig.xDai.rpc)
              }
        }
    }
    else if(chain === 'Elrond') {
        return {
            elrondParams: {
                ...ChainData.Elrond,
            }
        }
    } else if(chain === 'Tron') {
        return {
            tronParams: {
                ...ChainData.Tron,
                    provider: new TronWeb({
                        fullHost: 'https://api.trongrid.io',
                        headers: { "TRON-PRO-API-KEY": '86feb70b-776c-40f5-8c19-2c1155549703' },
                })
                
            }
        }
    }
}

export const isEVM = () => {
    const {from} = store.getState().general
    return chainsConfig[from] ? chainsConfig[from].type === 'EVM' : "";
}

export const toEVM = () => {
    const {to} = store.getState().general
    return chainsConfig[to] ? chainsConfig[to].type === 'EVM' : "";
}


export const isTronLink = () => {
    const {from} = store.getState().general
    return from === 'Tron'
}

export const getChainId = () => {
    const {from} = store.getState().general
    return chainsConfig[from] ? chainsConfig[from].chainId : ''
}

export const setupURI = uri => {
    // debugger
    if(uri && uri.includes('ipfs://')){ 
        return 'https://ipfs.io/' + uri.replace(':/', '')
    }
    else if(uri) {
        return uri.replace('http://', 'https://')
    }
    return uri
}


export const checkVideoFormat = uri => {
    // debugger
    const supportedFormats = [".mp4", ".ogg", ".webm"]
    const format = uri?.slice(uri.lastIndexOf(".")).length < 6 && uri?.slice(uri.lastIndexOf(".")).length > 3 ? uri?.slice(uri.lastIndexOf(".")) : undefined 
    return format && supportedFormats.some(n => n === format)

    // const str = uri?.split(".").pop()
    //  return str?.length < 5 ? (str.includes("mpg") || str.includes("mpeg") || str.includes("avi") || str.includes("wmv") || str.includes("mp4") || str.includes("ogg") || str.includes("webm") || false) : false
     
}


export const preloadItem = (item, type, setLoaded) => {
    if(type === 'video') {
        const vid = document.createElement('video')
        vid.src = item
        vid.style.opacity = '0'
        vid.style.position = 'absolute'
        vid.style.height = '0px'
        vid.style.width = '0px'
        document.body.appendChild(vid)
        vid.play()
        vid.onloadeddata = function () {
            setLoaded(true)
            vid?.remove()
        }
    } else {
        var img=new Image();
        img.src=item;
        img.onload= function() {
            setLoaded(true)
        }
      
    }
}

export const parseNFTS = async (nfts) => {
    // console.log("oldHelpers");
    const { elrondWallet } = store.getState().general
    const { from, to } = store.getState().general
    const factory = await getRPCFactory()
    const fromChain = chainsConfig[from]
    const inner = await factory.inner(fromChain.Chain);
    const result = await Promise.all(nfts.map(async n => {
        
    return await new Promise(async resolve => {
        try {
            if(!n.uri) resolve({ ...n })
            const res = await axios.get(setupURI(n.uri))
            if(res && res.data) {
                if(res.data.animation_url) preloadItem(res.data.animation_url, 'video', () => {})
                else preloadItem(res.data.image, 'image', () => {})
                    resolve({...res.data, ...n})
                } else resolve(undefined)
            } catch(err) {
                if(err) {
                    try {
                        const res = await axios.get(('https://sheltered-crag-76748.herokuapp.com/')+(setupURI(n.uri?.uri ? n.uri?.uri : n.uri)));
                        if(res.data) {
                            try {
                                const {uri} = res.data
                                const result = await axios.get(setupURI(uri?.uri))
                                
                                resolve({...result.data, ...n, cantSend: true})
                            } catch(err) {
                                resolve(undefined)
                            }
                 
                        } else {
                            resolve(undefined)
    
                        }
                    } catch (err) {
                        resolve(undefined)
                    }

                }
            }

        })

    }))
    return result.filter(n => n)
}
const Web3Utils = require('web3-utils')
export const isAddress = async address => {
    const { to } = store.getState().general
    if(to === 'Tron') {
        return address && address.length === 34
    } else if(to === 'Elrond') {
        return address && address.length === 62
    } else {
        return await Web3Utils.isAddress(address)
    }
}

export const getOldFactory = async () => {
//    debugger
    const {from, to} = store.getState().general
      try {
        const fromParams = await getFromParams()
        const toParams = await getFactoryParams(to.key)
        return ChainFactory(moralisParams,{
          ...toParams,
          ...fromParams
        })
      } catch (error) {
          console.log(error.message);
      }
  }
  const EVM_VALIDATORS = [
    '0xadFF46B0064a490c1258506d91e4325A277B22aE',
    '0xa50d8208B15F5e79A1ceABdB4a3ED1866CEB764c',
    '0xa3F99eF33eDA9E54DbA4c04a6133c0c507bA4352',
    // '0xAC415a404b5275EF9B3E1808870d8393eCa843Ec',
    // '0xca2e73418bEbe203c9E88407f68C216CdCd60b38',
    // '0x2523d5F7E74A885c720085713a71389845A8F0D2',
    // '0xEBAC44f9e63988112Eb4AfE8B8E03e179b6429A6'
  ]
  export const ChainData = {
      Algorand: {
          nonce: 15
      },
    Elrond: {
      node_uri: "https://elrondnode.xp.network/proxy/",
      minter_address: "erd1qqqqqqqqqqqqqpgq98ufyktqukxqw79f7n22sr3u6n05u7d7p7tqmzhv32",
      esdt_swap_address: "erd1qqqqqqqqqqqqqpgqgc9vfqcdqw0ucu602elf0lt4tysfmxpep7tqhrrr9x",
      esdt: "XPNET-738176",
      esdt_nft: "XPNFT-676422",
      esdt_swap: "WEGLD-071de0",
      validators: [
        'erd1lwyjz0adjd3vqpcjqs5rntw6sxzf9pvqussadygy2u76mz9ap7tquc0z5s',
        'erd1tzc9qltpntlgnpetrz58llqsg93dnxety54umln0kuq2k6dajf6qk796wh',
        'erd14aw3kvmepsffajkywp6autxxf7zy77uvnhy9e93wwz4qjkd88muquys007',
        'erd1nj85l5qx2gn2euj4hnjzq464euwzh8fe6txkf046nttne7y3cl4qmndgya',
        'erd1fl3mpjnrev7x5dz4un0hpzhvny4dlv4d2zt38yhqe37u9ulzx2aqeqr8sr',
        'erd16kufez3g0tmxhyra2ysgpkqckurqe80ulxet8dfffm0t28tnavpstr0s93',
        'erd1wua3q7zja2g08gyta4pkd4eax2r03c3edsz72dp90m3z69rk8yuqqnrg63'
      ],
      nonce: 2,
    },
    Tron: {
      provider: "TronWeb",
      middleware_uri: "https://notifierrest.herokuapp.com",
      erc1155_addr: "TSg3nSjuSuVf5vEk6f2WwM9Ph8bEaNNz9B",
      minter_addr: "TMx1nCzbK7tbBinLh29CewahpbR1k64c8E",
      erc721_addr: "TGGePFKn3P8vcGwmupJM4VgwMBdh5KCi1K",
      validators: [  
        'TYiLyTA6oPrUpyPp8yS5X8dmAnS4xYLnnF',
        'TQhChoFuCZfwAnu68tUPzD4C3QoGLPiwSx',
        'TS8Yj9NW81EvwEAAdnvu7d1naU1BdK1bQJ',
      ],
      nonce: 0x9,
    },
    Avalanche: {
      provider: "JsonRpcProvider",
      minter_addr: "0x5B916EFb0e7bc0d8DdBf2d6A9A7850FdAb1984C4",
      erc1155_addr: "0xe12B16FFBf7D79eb72016102F3e3Ae6fe03fCA56",
      middleware_uri: "https://notifierrest.herokuapp.com",
      erc721_addr: "0xe12B16FFBf7D79eb72016102F3e3Ae6fe03fCA56",
      validators: EVM_VALIDATORS,
      nonce: 6,
    },
    Polygon: {
      provider: "JsonRpcProvider",
      minter_addr: "0x2f072879411503580B8974A221bf76638C50a82a",
      erc1155_addr: "0xc69ECD37122A9b5FD7e62bC229d478BB83063C9d",
      middleware_uri: "https://notifierrest.herokuapp.com",
      erc721_addr: "0xc69ECD37122A9b5FD7e62bC229d478BB83063C9d",
      validators: EVM_VALIDATORS,
      nonce: 7,
    },
    Fantom: {
      provider: "JsonRpcProvider",
      minter_addr: "0x5B916EFb0e7bc0d8DdBf2d6A9A7850FdAb1984C4",
      erc1155_addr: " ",
      middleware_uri: "https://notifierrest.herokuapp.com",
      erc721_addr: "0xe12B16FFBf7D79eb72016102F3e3Ae6fe03fCA56",
      validators:EVM_VALIDATORS,
      nonce: 0x8,
    },
    BSC: {
      provider: "JsonRpcProvider",
      minter_addr: "0xF8679A16858cB7d21b3aF6b2AA1d6818876D3741",
      erc1155_addr: "0xa1B8947Ff4C1fD992561F629cfE67aEb90DfcBd5",
      middleware_uri: "https://notifierrest.herokuapp.com",
      erc721_addr: "0xa1B8947Ff4C1fD992561F629cfE67aEb90DfcBd5",
      validators:EVM_VALIDATORS,
      nonce: 4,
    },
    Celo: {
      provider: "JsonRpcProvider",
      minter_addr: "string",
      erc1155_addr: "string",
      erc721_addr: "string",
      validators: "string[]",
      nonce: "number",
    },
    Harmony: {
      provider: "JsonRpcProvider",
      minter_addr: "string",
      erc1155_addr: "string",
      erc721_addr: "string",
      validators: "string[]",
      nonce: "number",
    },
    Ethereum: {
      provider: "JsonRpcProvider",
      minter_addr: "0x8B2957DbDC69E158aFceB9822A2ff9F2dd5BcD65",
      erc1155_addr: "0x09F4e56187541f2bC660B0810cA509D2f8c65c96",
      middleware_uri: "https://notifierrest.herokuapp.com",
      erc721_addr: "0x09F4e56187541f2bC660B0810cA509D2f8c65c96",
      validators: EVM_VALIDATORS,
      nonce: 5,
    },
    xDai: {
      provider: "JsonRpcProvider",
      minter_addr: "0x14fb9d669d4ddf712f1c56Ba7C54FF82D9be6377",
      erc1155_addr: "0x8B2957DbDC69E158aFceB9822A2ff9F2dd5BcD65",
      middleware_uri: "https://notifierrest.herokuapp.com",
      erc721_addr: "0x8B2957DbDC69E158aFceB9822A2ff9F2dd5BcD65",
      validators: EVM_VALIDATORS,
      nonce: 14,
    },
  };