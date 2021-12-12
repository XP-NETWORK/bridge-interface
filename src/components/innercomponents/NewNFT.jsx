import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedNFTList, removeFromSelectedNFTList }  from "../../store/reducers/generalSlice"
import brockenurl from "../../assets/img/brockenurl.png"
import CheckGreen from '../../assets/img/icons/check_green.svg';
import NFTdetails from '../NFTdetails';
import { useSelector } from 'react-redux';
import { setupURI } from '../../wallet/oldHelper';
import  "./NewNFT.css"

export default function NFT({nft, index}) {
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const dispatch = useDispatch()
    const isSelected = selectedNFTs.filter(n => n.native.tokenId === nft.native.tokenId && n.native.contract === nft.native.contract && n.native.chainId === nft.native.chainId)[0]
    const [imageLoaded, setImageLoaded]= useState(false);
    const HIDDEN = { visibility: "hidden"};

    function addRemoveNFT (chosen){
        if(!isSelected){
            dispatch(setSelectedNFTList(chosen))
        }
        else{
            dispatch(removeFromSelectedNFTList(nft))
        }
    }

    useEffect(() => { }, [selectedNFTs])
    return ( 
        <div className={isSelected ? "nft-box__container--selected" : "nft-box__container"}>
            <div onClick={() => addRemoveNFT(nft)} className="nft-image__container">
                <div className="image__wrapper">
                    {nft.image ? <img onLoad={() => setImageLoaded(true)} alt="NFT" src={setupURI(nft.image)} /> : <img src={brockenurl} alt='' /> }
                    <span className="selected-radio">{isSelected && <img src={CheckGreen} alt=''/>}</span>
                </div>
            </div>
            <div className="nft-content__container">
                <span className="nft-name">
                    <span className="name">{nft.name}</span>
                    <NFTdetails nftInf={nft} index={index} />
                </span>
                <span className="nft-number">{nft.native.tokenId}</span>
            </div>
        </div>
    )
}