import {ethers} from 'ethers'
import { chainsConfig, EVM } from '../pages/TransferNFT/components/values'
import store from '../store/store'
import { createChainFactory } from "./connectors";
import { ChainFactory } from "xp.network";
import { ChainData } from './config'
import TronWeb from 'tronweb'
import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
export const moralisParams = {
    exchangeRateUri: "https://testing-bridge.xp.network/exchange/",

    moralisServer: "https://azz9akudh6cf.usemoralis.com:2053/server",
    moralisAppId: "vt2JeuihhzyV9vgYbeAYO5BVSaCOdkAKr608XJOv",
    tronScanUri: 'https://apilist.tronscan.org/api/',
    heartbeatUri: 'https://xpheartbeat.herokuapp.com'
}
const axios = require('axios')
export const getFromParams = async () => {
    const {from, WC} = store.getState().general
    let provider
    try{
        provider = new ethers.providers.Web3Provider(WC ? WC : window.ethereum)
    }catch(err) {}

    console.log(from ,'123983298312892')
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
        return {
            tronParams: {
                ...ChainData.Tron,
                provider: window.tronWeb
            }
        }
    }
}

export const getRPCFactory = async (chain) => {
    const {from, to} = store.getState().general
    const f = await getFactoryParams(from)
    const t = await getFactoryParams(to)
    console.log(f, t, 'aslsad')
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
    console.log(o)
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
    return chainsConfig[from] ? chainsConfig[from].type === EVM : "";
}

export const toEVM = () => {
    const {to} = store.getState().general
    return chainsConfig[to] ? chainsConfig[to].type === EVM : "";
}


export const isTronLink = () => {
    const {from} = store.getState().general
    return from === 'Tron'
}

export const getChainId = () => {
    const {from} = store.getState().general
    return chainsConfig[from] ? chainsConfig[from].chainId : ''
}

export const setupURI = (uri) => {
    if(uri && uri.includes('ipfs://')) return 'https://ipfs.io/' + uri.replace(':/', '')
    else if(uri) return uri.replace('http://', 'https://')
    return uri
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
            vid.remove()
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
    const { elrondWallet } = store.getState().general
    const { from, to } = store.getState().general
    const factory = await getRPCFactory()
    const fromChain = chainsConfig[from]
    const inner = await factory.inner(fromChain.Chain);
    const result = await Promise.all(nfts.map(async n => {
        console.log(n)
    return await new Promise(async resolve => {
        try {
            // const p = await factory.nftUri(inner, n)
            console.log(n.uri, 'helloasa')
            if(!n.uri) resolve({ ...n })
            const res = await axios.get(setupURI(n.uri))
            if(res && res.data) {
                if(res.data.animation_url) preloadItem(res.data.animation_url, 'video', () => {})
                else preloadItem(res.data.image, 'image', () => {})
                    resolve({...res.data, ...n})
                } else resolve(undefined)
            } catch(err) {
                if(err) {
                    console.log(n)
                    try {
                        const res = await axios.post('https://wnfts.xp.network/get-uri', 
                        { blockchain: from, uri: n.uri, contract: n.native.contract ? n.native.contract: 'alsa' }
                        )
                        if(res.data) {
                            try {
                                const {uri} = res.data
                                const result = await axios.get(setupURI(uri?.uri))
                                console.log(result)
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