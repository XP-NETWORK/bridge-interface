
import axios from 'axios';
// import fs from "fs'"
import { checkVideoFormat, checkImageFormat } from "../../wallet/oldHelper"
// import { isValidHttpUrl } from '../../wallet/helpers'
// import {fileTypeFromStream} from 'file-type';
// import { fileTypeFromFile } from 'file-type';
// import got from 'got';
// const bt = require('buffer-type');
// const fs = require('fs');
const supportedVideoFormats = [".mp4", ".ogg", ".webm", ".avi"]
const supportedImageFormats = [".apng", ".gif", ".jpg", ".jpeg", ".png", ".svg", ".webp"]

export const getCorrectURL = nft => {
    // debugger
    const { image, uri, animation_url, image_url, data } = nft

    if(animation_url && checkVideoFormat(animation_url)) return {video: true, url: animation_url}
    else if(animation_url && !checkVideoFormat(animation_url) && !checkImageFormat(animation_url)) return {video: false, url: data?.image || image || image_url || uri}
    else if(animation_url && !checkVideoFormat(animation_url)) return {video: false, url: animation_url}
    else return {video: false, url: data?.image || image || image_url || uri }
}

const ifVideo = item => {
    const f = item.slice(item.lastIndexOf(".")).length < 6 && item.slice(item.lastIndexOf(".")).length > 3 ? item.slice(item.lastIndexOf(".")) : undefined
    return supportedVideoFormats.some(e => e === f) ? true : false
}
const ifImage = item => {
    const f = item.slice(item.lastIndexOf(".")).length < 6 && item.slice(item.lastIndexOf(".")).length > 3 ? item.slice(item.lastIndexOf(".")) : undefined
    return supportedImageFormats.some(e => e === f) ? true : false
}

export const getUrl = nft => {

    let video
    let url
    const values = Object.values(nft)
    let valuesForCheck = []
    let strings = []
    let urls = []
    let ipfsArr = []

    // console.log(values);
    values.forEach(item => {
        if(item && typeof item === "object"){
            // debugger
            const objValues = Object.values(item)
            if(objValues.some(e => e && typeof e === "object")){
                objValues.forEach(e => {
                    if(e && typeof e === "object"){
                        const eValues = Object.values(e)
                        valuesForCheck.push(...eValues)
                    }
                    else valuesForCheck.push(e)
                })
            }
            valuesForCheck.push(...objValues)
        }
        else valuesForCheck.push(item)
    });

    // console.log("valuesForCheck: ", valuesForCheck)
    valuesForCheck.forEach(item => {
        if(typeof item === 'string' && item.length > 1){
            strings.push(item)
        }
        else if(typeof item === "object"){
            // debugger
            const vals = Object.values(item)
            vals.forEach(item => {
                if(typeof item === 'string' && item.length > 1){
                    strings.push(item)
                }
            });
        }
    });
    strings.forEach(item => {
        if((item.includes("https:") || item.includes("ipfs") || item.includes("base64")) && !item.includes('.json')){
            urls.push(item)
        }
    });

    if(urls.some(item => ifVideo(item))){
        urls.forEach(e => {
            if(ifVideo(e)){
                video = true
                url = e
            }
        });
    }
    else if(urls.some(item => ifImage(item))){
        urls.forEach(e => {
            if(ifImage(e)){
                video = false
                url = e
            }
        });
    }
    else{
        ipfsArr = [...urls]
    }
    
    return { video, url, ipfsArr }
}

