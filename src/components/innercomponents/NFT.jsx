import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedNFTList, removeFromSelectedNFTList }  from "../../store/reducers/generalSlice"
import CheckGreen from '../../assets/img/icons/check_green.svg';
import NFTdetails from '../NFTdetails';
import { useSelector } from 'react-redux';
import { findInArray } from '../helpers';

export default function NFT({nft, index}) {

    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const dispatch = useDispatch()
    // const addRemoveNFT = nft => searchInSelected(nft, selectedNFTs) ? dispatch(removeFromSelectedNFTList(index)) : dispatch(setSelectedNFTList(nft))
    const isSelected = selectedNFTs.filter(n => n.native.tokenId === nft.native.tokenId && n.native.contract === nft.native.contract && n.native.chainId === nft.native.chainId)[0]

    function addRemoveNFT (chosen){
        if(!isSelected){
            dispatch(setSelectedNFTList(chosen))
        }
        else{
            console.log(nft);
            dispatch(removeFromSelectedNFTList(nft))
        }
    }

    useEffect(() => { }, [selectedNFTs])

    return ( 
        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
            {/* <div onClick={() => addRemoveNFT(nft)} className={searchInSelected(nft, selectedNFTs) ? "singleNft nftSelect" : "singleNft"}> */}
            <div onClick={() => addRemoveNFT(nft)} className="singleNft">
                <div className={`nftImageBox ${isSelected ? 'nftSelect': ''}`}>
                    <span className="selectNft">{<img src={CheckGreen} />}</span>
                    <span className="nftImage"><img src={nft.image} /></span>
                </div>
                <div className="nftCont">
                    <span className="nftName">{nft.name} <NFTdetails nftInf={nft} index={index} /></span>
                    <span className="nftNumber">{nft.native.tokenId}</span>
                </div>
            </div>
        </div>
    )
}
