import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import NFTempty from './NFTempty';
import NFT from './NFT';

function NFTgridView() {
    const nfts = useSelector(state => state.general.NFTList)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const search = useSelector(state => state.general.NFTListSearch)
    
    useEffect(() => { }, [selectedNFTs])

    return (
        <div className="nftListBox">
            <div className="row">
                { nfts ?  nfts.filter(nft => nft.name.includes(search ? search : '') || nft.native.owner.includes(search ? search : '')).map((nft, index) => <NFT nft={nft} index={index} />) : <NFTempty />}
            </div>
        </div>
    )
}

export default NFTgridView;
