import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromSelectedNFTList, setSelectedNFTList } from '../../store/reducers/generalSlice'
import CheckGreen from '../../assets/img/icons/check_green.svg';
import ListedView from './ListedView';
import { useEffect } from 'react';
import { isWhiteListed } from './NFTHelper';
import NFTdetails from "./NFTdetails"
import { parseEachNFT } from '../../wallet/helpers';

export default function NFTlistedCard({nft, index}) {

  const dispatch = useDispatch()
  const selectedNFTs = useSelector(state => state.general.selectedNFTList)
  const nfts = useSelector(state => state.general.NFTList)
  const from = useSelector(state => state.general.from)
  const [whitelisted, setWhitelisted] = useState(false)
  const OFF = {pointerEvents: "none"}
  const [onHover, setOnHover] = useState(false)
  const [_width, setWidth] = useState(Math.floor(Math.random() * 125 + 35))
  
  // const generateRandom = () => {
  //   setWidth(Math.floor(Math.random() * 25 + 5))
  // }
  // const width = nft.name ? {width: `${_width * 10}px`} : { width: "300px" }

  const checkIfSelected = ( nft ) => {
    return selectedNFTs.filter(n => n.native.tokenId === nft.native.tokenId && n.native.contract === nft.native.contract && n.native.chainId === nft.native.chainId)[0]
  }
  function addRemoveNFT (nft, e){
    if(!checkIfSelected(nft)){
        dispatch(setSelectedNFTList(nft))
    }
    else{
        dispatch(removeFromSelectedNFTList(nft))
    }
  }

  useEffect(() => {
    if(!nft.dataLoaded){
      parseEachNFT(nft, index)
    }
    // generateRandom()
  }, [nfts])
  


  return (
  nft.dataLoaded ?
  <li onMouseEnter={() => setOnHover(true)} onMouseLeave={()=> setOnHover(false)} className="nftListed nftSelect">
    <div className="nftListed__info">
        {!checkIfSelected(nft, selectedNFTs) ? <div onClick={(e) => addRemoveNFT(nft, e)} className="listed-nft-radio"></div> : <div onClick={(e) => addRemoveNFT(nft, e)} className="listed-nft-radio--selected"></div> }
        <ListedView  addRemoveNFT={addRemoveNFT} nft={nft} key={`nft-n-${index}`} />
        <span className="name" onClick={(e) => addRemoveNFT(nft, e)}>{nft?.data?.name || nft?.name || nft?.native.name}</span>
    </div>
    <NFTdetails nftInf={nft}/>
    { (!nft.whitelisted ) && <div className='listed-view__not-whitelisted'>
      <div className="listed-view__not-whitelisted__text">This NFT not Whitelisted</div>
      <div href='https://t.me/XP_NETWORK_Technical_Support' className="listed-view__not-whitelisted__button" target="_blank">Tech support</div>
    </div>}
  </li>:
  <div className='listed__skeleton'>
    <div className='image'></div>
    <div style={{width: _width}} className='name'></div>
  </div>
  )
}
