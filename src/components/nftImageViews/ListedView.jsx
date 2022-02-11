
import { useEffect } from "react"
import { useState } from "react"
import {  getUrl, NFTHelper } from "../../components/innercomponents/NFTHelper"

export default function ListedView({ nft }) {

    const { video, url } = getUrl(nft)
    console.log(`ListedView video: ${video} url: ${url}`)

  return (
    <div>
        nft
    </div>
  )
}
