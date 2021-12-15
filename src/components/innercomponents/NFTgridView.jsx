import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import NFTempty from './NFTempty';
import NFT from './NFT';
import Missing from './Missing';
import { useDispatch } from 'react-redux';
import BigLoader from "../innercomponents/BigLoader"
import NewNFT from './NewNFT';

/////`
function NFTgridView() {
    const dispatch = useDispatch()
    const nfts = useSelector(state => state.general.NFTList)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const search = useSelector(state => state.general.NFTListSearch)
    const nftsPlace = window.innerWidth <= 600 ? 2 : 9
    const placeholders = new Array(nfts ? nftsPlace - nfts.length >= 0 ? nftsPlace - nfts.length : 0 : 0).fill(0)
    const loader = useSelector(state => state.general.bigLoader)
    
    useEffect(() => { }, [selectedNFTs])
    return (
        <div style={ nfts ? {} : {overflow: "hidden"}} className="nftListBox">
                { loader ? 
                    <BigLoader />
                :
                    // <div className="row">
                    <div className="nft-list__wrapper">
                        { nfts ? nfts
                        .filter(nft => nft?.name?.toLowerCase().includes(search ? search?.toLowerCase() : '') || nft.native.owner?.includes(search ? search : ''))
                        .map((nft, index) => <NewNFT nft={nft} index={index} />)
                        : 
                        <NFTempty /> }
                        { nfts && nfts?.length < nftsPlace ? placeholders.map(n => <Missing />) : ''}
                    </div>
                }
        </div>
    )
}

export default NFTgridView;
