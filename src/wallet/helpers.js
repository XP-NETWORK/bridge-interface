import store from '../store/store'


const axios = require('axios')

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
    const { from, to } = store.getState().general

    const result = await Promise.all(nfts.map(async n => {
        console.log(n)
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
                    console.log(n)
                    try {
                        const res = await axios.post('https://wnfts.xp.network/get-uri', 
                        { blockchain: from.type, uri: n.uri, contract: n.native.contract ? n.native.contract: 'alsa' }
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


