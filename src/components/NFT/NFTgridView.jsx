import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import NFTempty from '../innercomponents/NFTempty';
import Missing from '../innercomponents/Missing';
import BigLoader from "../../components/innercomponents/BigLoader"
import NFTcard from './NFTcard';
import {  } from "../../wallet/helpers.js" 


function NFTgridView() {
    const nfts = useSelector(state => state.general.NFTList)
    const preloadNFTs = useSelector(state => state.general.preloadNFTs)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const search = useSelector(state => state.general.NFTListSearch)
    const nftsPlace = window.innerWidth <= 600 ? 2 : 9
    const placeholders = new Array(nfts ? nftsPlace - nfts.length >= 0 ? nftsPlace - nfts.length : 0 : 0).fill(0)
    const loader = useSelector(state => state.general.bigLoader)
 

    console.log(nfts, 'nfts');

    function isFiltred (nft) {
       if (!nft?.description || !nft?.native?.owner) return false;
        if (nft?.description?.toString().toLowerCase().includes(search?.toLowerCase()) || nft.native.owner?.includes(search)) {
            return false
        }
        return true
    }

    /*useEffect(() => { 
        console.log(search);
        if (!search) return setFiltred(nfts);

        const copy = [...nfts]
        setFiltred(copy.filter(nft => nft?.description?.toString().toLowerCase().includes(search?.toLowerCase()) || nft.native.owner?.includes(search)))
    }, [search, nfts])*/

    return (
        <div className="nftListBox">
                { loader ? <BigLoader />
                :
                    <div className="nft-list__wrapper">
                        { nfts?.length ? 
                        //search ? nfts.filter(nft => nft?.description?.toString().toLowerCase().includes(search?.toLowerCase()) || nft.native.owner?.includes(search)).map((nft, index) => <NFTcard nft={nft} index={index} key={`nft-${index}`} />)
                        nfts.map((nft, index) => <NFTcard nft={nft} index={index} hide={isFiltred(nft)} key={`nft-${index}`} />)
                        : 
                        <NFTempty /> }
                        { nfts && nfts?.length < nftsPlace ? placeholders.map((n, index) => <Missing key={`missing-${index}-component`}/>) : ''}
                    </div>
                }
        </div>
    )
}

export default NFTgridView;
