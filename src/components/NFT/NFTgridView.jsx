import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import NFTempty from '../innercomponents/NFTempty';
import Missing from '../innercomponents/Missing';
import BigLoader from "../../components/innercomponents/BigLoader"
import NFTcard from './NFTcard';
import {  } from "../../wallet/helpers.js" 


function NFTgridView({setIndex, scrollIndex}) {
    const nfts = useSelector(state => state.general.NFTList)
    const algorandClaimables = useSelector(state => state.general.algorandClaimables)
    const nftsPlace = window.innerWidth <= 600 ? 2 : 6
    const placeholders = new Array(nfts ? nftsPlace - nfts.length >= 0 ? nftsPlace - nfts.length : 0 : 0).fill(0)
    const ref = useRef(0)
    const [goingUp, setGoingUp] = useState(false);
    // const [index, setIndex] = useState(0)
    const loader = useSelector(state => state.general.bigLoader)


    const handleScroll = e => {
        const currentScrollY = e.target.scrollTop;
        var element = e.target;
        if (ref.current < currentScrollY && goingUp) {
          setGoingUp(false);
        }
        if (element.scrollHeight - element.scrollTop < element.clientHeight + 10 ) {
          setGoingUp(true);
          setIndex(scrollIndex + 270)
        }
        ref.current = currentScrollY;
    }

    return (
        <div onScroll={e => handleScroll(e)} className="nftListBox">
                { loader ? <BigLoader />
                :
                    <div className="nft-list__wrapper">
                        { algorandClaimables && 
                        algorandClaimables.map((nft, index) => <NFTcard nft={nft} index={index} key={`nft-${index}`} claimables={true} />)
                        }
                        { nfts?.length ? 
                        nfts.map((nft, index) => <NFTcard nft={nft} index={index} key={`nft-${index}`} />)
                        :
                        !algorandClaimables &&
                        <NFTempty />
                        }
                        { nfts.length > 0 && nfts?.length < nftsPlace ? placeholders.map((n, index) => <Missing key={`missing-${index}-component`}/>) : ''}
                    </div>
                }
        </div>
    )
}

export default NFTgridView;
