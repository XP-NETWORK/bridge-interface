
import { checkVideoFormat, checkImageFormat } from "../../wallet/oldHelper"
import { isValidHttpUrl } from '../../wallet/helpers'


export const getCorrectURL = nft => {
    // debugger
    const { image, uri, animation_url, image_url, data } = nft

    if(animation_url && checkVideoFormat(animation_url)) return {video: true, url: animation_url}
    else if(animation_url && !checkVideoFormat(animation_url) && !checkImageFormat(animation_url)) return {video: false, url: data?.image || image || image_url || uri}
    else if(animation_url && !checkVideoFormat(animation_url)) return {video: false, url: animation_url}
    else return {video: false, url: data?.image || image || image_url || uri }
}


export const getUrl = nft => {

    let video
    let url
    const values = Object.values(nft)
    let valuesForCheck = []
    const supportedVideoFormats = [".mp4", ".ogg", ".webm"]
    const supportedImageFormats = [".apng", ".avif", ".gif", ".jpeg", ".png", ".svg", ".webp"]
    let format
    values.forEach(item => {
        if(typeof item === "object"){
            const objValues = Object.values(item)
            valuesForCheck.push(...objValues)
        }
        else valuesForCheck.push(item)
    });
    console.log("nft: ", nft)
    valuesForCheck.forEach((item, index) => {
        console.log("forEach: ", item, "index: ", index)

        if(item && typeof item === 'string'){
            format = item.slice(item.lastIndexOf(".")).length < 6 && item.slice(item.lastIndexOf(".")).length > 3 ? item.slice(item.lastIndexOf(".")) : undefined
        }
        if(typeof item === 'string' && item.includes('ipfs') && !item.includes('.json')){
            video = false
            url = item
            // return { video: false, url: item }
        }
        else if(format && supportedVideoFormats.some(n => n === format)){
            video = true
            url = item
            // return { video: true, url: item }
        }
        else if(format && supportedImageFormats.some(n => n === format && format.includes('http'))){
            video = false
            url = item
            // return { video: false, url: item}
        }
    });
    return { video, url }
}