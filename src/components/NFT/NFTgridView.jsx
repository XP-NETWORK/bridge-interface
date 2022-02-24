import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import NFTempty from '../innercomponents/NFTempty';
import Missing from '../innercomponents/Missing';
import BigLoader from "../../components/innercomponents/BigLoader"
import NFT from "./NFT"
import NFTcard from './NFTcard';

/////`
function NFTgridView() {
    const nfts = useSelector(state => state.general.NFTList)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const search = useSelector(state => state.general.NFTListSearch)
    const nftsPlace = window.innerWidth <= 600 ? 2 : 9
    const placeholders = new Array(nfts ? nftsPlace - nfts.length >= 0 ? nftsPlace - nfts.length : 0 : 0).fill(0)
    const loader = useSelector(state => state.general.bigLoader)
    
    useEffect(() => { }, [selectedNFTs])
    return (
        <div style={ nfts?.length ? {} : {overflow: "hidden"}} className="nftListBox">
                { loader ? 
                    <BigLoader />
                :
                    <div className="nft-list__wrapper">
                        { nfts?.length ? nfts
                        .filter(nft => nft?.description?.toString().toLowerCase().includes(search ? search?.toLowerCase() : '') || nft.native.owner?.includes(search ? search : ''))
                        .map((nft, index) => <NFTcard nft={nft} index={index} key={`nft-${index}`} />)
                        : 
                        <NFTempty /> }
                        { nfts && nfts?.length < nftsPlace ? placeholders.map((n, index) => <Missing key={`missing-${index}-component`}/>) : ''}
                    </div>
                }
        </div>
    )
}

export default NFTgridView;
