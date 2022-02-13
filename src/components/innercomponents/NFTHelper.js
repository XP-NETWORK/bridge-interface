
import { checkVideoFormat, checkImageFormat } from "../../wallet/oldHelper"
// import { isValidHttpUrl } from '../../wallet/helpers'
// import {fileTypeFromStream} from 'file-type';
// import { fileTypeFromFile } from 'file-type';
import got from 'got';

export const getCorrectURL = nft => {
    // debugger
    const { image, uri, animation_url, image_url, data } = nft

    if(animation_url && checkVideoFormat(animation_url)) return {video: true, url: animation_url}
    else if(animation_url && !checkVideoFormat(animation_url) && !checkImageFormat(animation_url)) return {video: false, url: data?.image || image || image_url || uri}
    else if(animation_url && !checkVideoFormat(animation_url)) return {video: false, url: animation_url}
    else return {video: false, url: data?.image || image || image_url || uri }
}


const checkStream = async stream => {
    debugger
    // console.log("checkStream: ", await fileTypeFromStream(stream))
}


export const getUrl = nft => {

    let video
    let url
    const values = Object.values(nft)
    let valuesForCheck = []
    const supportedVideoFormats = [".mp4", ".ogg", ".webm"]
    const supportedImageFormats = [".apng", ".avi", ".gif", ".jpeg", ".png", ".svg", ".webp"]
    let format
    let stream
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

        if(typeof item === 'string'){
            stream = got.stream(item);
            // checkStream(stream)
        }


        if(item && typeof item === 'string'){
            format = item.slice(item.lastIndexOf(".")).length < 6 && item.slice(item.lastIndexOf(".")).length > 3 ? item.slice(item.lastIndexOf(".")) : undefined
            console.log(`format: ${format}`)
        }
        if(typeof item === 'string' && item.includes('ipfs') && !item.includes('.json')){
            console.log(index === 5 ? "five" : "")
            video = false
            url = item
        }
        else if(format && supportedVideoFormats.some(item => item === format)){
            console.log(`${item} - supportedVideoFormats ${format}`)

            video = true
            url = item
        }
        else if(format && supportedImageFormats.some(item => item === format)){
            console.log(`${item} - supportedImageFormats ${format}`)

            video = false
            url = item
        }
    });
    return { video, url }
}