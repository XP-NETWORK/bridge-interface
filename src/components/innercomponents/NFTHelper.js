
import { checkVideoFormat } from "../../wallet/oldHelper"
import { isValidHttpUrl } from '../../wallet/helpers'


export const getCorrectURL = nft => {
    const { image, uri, animation_url, image_url, data } = nft
    if(animation_url && checkVideoFormat(animation_url)) return {video: true, url: animation_url}
    else if(animation_url && !checkVideoFormat(animation_url)) return {video: false, url: checkVideoFormat(animation_url) ? animation_url : data?.image || image || image_url || uri }
    else return {video: false, url: data?.image || image || image_url || uri }
}