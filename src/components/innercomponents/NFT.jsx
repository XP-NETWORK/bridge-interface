import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedNFTList, removeFromSelectedNFTList }  from "../../store/reducers/generalSlice"
import CheckGreen from '../../assets/img/icons/check_green.svg';
import NFTdetails from '../NFTdetails';
import { useSelector } from 'react-redux';

export default function NFT({nft, index}) {

    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    // const NFT = nft.nft
    const dispatch = useDispatch()

    const checkIfSelected = () => {
       return selectedNFTs.some( nft => nft.native.tokenId === nft.native.tokenId)
    }
    const addRemoveNFT = nft => {
        console.log("checkIfSelected", checkIfSelected());
        console.log("index", index);
        checkIfSelected() ? dispatch(removeFromSelectedNFTList(index)) : dispatch(setSelectedNFTList(nft))
    }

    useEffect(() => { }, [selectedNFTs])

    return ( 
        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
            <div onClick={ () => addRemoveNFT(nft)} className={checkIfSelected() ? "singleNft nftSelect" : "singleNft"}>
                <div className="nftImageBox nftSelect">
                    <span className="selectNft">{checkIfSelected() ? <img src={CheckGreen} /> : ''}</span>
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
