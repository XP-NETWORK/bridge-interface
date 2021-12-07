import { ChainFactory, ChainFactoryConfigs } from 'xp.network'
import { Chain, Config } from 'xp.network/dist/consts'
import store from '../store/store'
import { ChainData, getOldFactory } from './oldHelper'


const axios = require('axios')

export const setupURI = (uri) => {
    // debugger
    console.log("setupURI", uri, uri.includes('ipfs://'));
    if(uri && uri.includes('ipfs://')) {
        return 'https://ipfs.io/' + uri.replace(':/', '')
    }
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
    const { from, to } = store.getState().general
    const result = await Promise.all(nfts.map(async n => {
        
    return await new Promise(async resolve => {
        try {
            if(!n.uri) resolve({ ...n })
            console.log(setupURI(n.uri),'38931289321893218932189321892398329832389213898391329132983§2')
            const res = await axios.get(setupURI(n.uri))
            if(res && res.data) {
                if(res.data.animation_url) preloadItem(res.data.animation_url, 'video', () => {})
                else preloadItem(res.data.image, 'image', () => {})
                    resolve({...res.data, ...n})
                } else resolve(undefined)
            } catch(err) {
                if(err) {

                    try {
                        const res = await axios.post('https://wnfts.xp.network/get-uri', 
                        { blockchain: from.type, uri: n.uri, contract: n.native.contract ? n.native.contract: 'alsa' }
                        )
                        if(res.data) {
                            try {
                                const {uri} = res.data
                                // console.log("setupURI(uri?.uri)",setupURI(uri?.uri));
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


export const isALLNFTsApproved = () => {
    const { selectedNFTList, approvedNFTList } = store.getState().general
    if(selectedNFTList.length <= approvedNFTList.length) {
        const approvedNFTs = []
        approvedNFTList.forEach(n => {
            const {native} = n
            const isInSelected = selectedNFTList.filter(y => {
                const { tokenId, contract, chainId } = y.native
                return tokenId ===native.tokenId && contract === native.contract &&  chainId === native.chainId
            })[0]
            if(isInSelected) approvedNFTs.push(isInSelected)
        })
        return approvedNFTs.length === selectedNFTList.length
    }
    else return false
}
export const getFactory = async () => {
    const mainnetConfig = ChainFactoryConfigs.MainNet;
    const factory = await getOldFactory()
    return factory
}

export const handleChainFactory = async (someChain) => {
// debugger
    const factory = await getFactory()
    let chain
    someChain === "Ethereum" ? chain = await factory.inner(Chain.ETHEREUM) : 
    someChain === "BSC" ? chain = await factory.inner(Chain.BSC) :
    someChain === "Tron" ? chain = await factory.inner(Chain.TRON) :
    someChain === "Elrond" ? chain = await factory.inner(Chain.ELROND) :
    someChain === "Polygon" ? chain = await factory.inner(Chain.POLYGON) :
    someChain === "Avalanche" ? chain = await factory.inner(Chain.AVALANCHE) :
    someChain === "Fantom" ? chain = await factory.inner(Chain.FANTOM) :
    someChain === "Algorand" ? chain = await factory.inner(Chain.ALGORAND) :
    someChain === "xDai" ? chain = await factory.inner(Chain.XDAI) :
    someChain === "Solana" ? chain = await factory.inner(Chain.SOLANA) :
    someChain === "Cardano" ? chain = await factory.inner(Chain.CARDANO) : chain = ""
    return chain
}

export const getNFTS =async  (wallet, from) => {
    const chain = await handleChainFactory(from)
    const factory = await getOldFactory()
    const chainId = ChainData[from].nonce
    const res = await Promise.all([
        await axios.get(`https://nftindexing.herokuapp.com/${chainId}/${wallet}`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJFUzI1NiJ9.eyJhdXRob3JpdHkiOjI2ODQzNTQ1NSwiaWF0IjoxNjM4MTg3MTk5LCJleHAiOjE2Mzg3OTE5OTl9.aKs8K2V8K_rWqQPshae1EzuAEpPMVWBZakfmyBeeq-nJuiEKb1KBSle1F8LNemXLW_3_4KFwDjZrNOx0zA_GNw'
        }
    }),await factory.nftList(
        chain,    // The chain of interest 
        wallet   // The public key of the NFT owner
    )
    ])
    const unique = {}
    try {
        const p = res[0].data.ok ? res[0].data.result : []
        const allNFTs = [ ...p, ...res[1] ].filter(n => n.native).filter(n => {
            const {tokenId, contract, chainId} =  n?.native 
            if(unique[`${tokenId}_${contract.toLowerCase()}_${chainId}`]) return false
            else {
                unique[`${tokenId}_${contract.toLowerCase()}_${chainId}`] = true
    
                return true
            }
        })

        return allNFTs

    } catch(err) {
        return []
    }

}