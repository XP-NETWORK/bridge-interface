import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedNFTList }  from "../../store/reducers/generalSlice"
import CheckGreen from '../../assets/img/icons/check_green.svg';
import NFTdetails from '../NFTdetails';
import { useSelector } from 'react-redux';

export default function NFT( nft, i ) {

    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const NFT = nft.nft
    const dispatch = useDispatch()
    const addToSelectedList = NFT => {
        dispatch(setSelectedNFTList(NFT))
    }
    const checkIfSelected = () => {
       return selectedNFTs.some( nft => nft.native.tokenId === NFT.native.tokenId)
    }

    useEffect(() => {
    }, [selectedNFTs])
    return ( 
        // checkIfSelected ?
        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
            <div onClick={ ()=> addToSelectedList(NFT)} className={checkIfSelected() ? "singleNft nftSelect" : "singleNft"}>
                <div className="nftImageBox nftSelect">
                    <span className="selectNft">{checkIfSelected() ? <img src={CheckGreen} /> : ''}</span>
                    <span className="nftImage"><img src={NFT.image} /></span>
                </div>
                <div className="nftCont">
                    <span className="nftName">{NFT.name} <NFTdetails nftInf={NFT} index={i} /></span>
                    <span className="nftNumber">{NFT.native.tokenId}</span>
                </div>
            </div>
        </div>
        // :
        // <div className="col-lg-4 col-md-4 col-sm-6 col-6">
        //     <div className="singleNft  nftSelect">
        //         <div className="nftImageBox">
        //             <span className="selectNft"><img src={CheckGreen} /></span>
        //             <span className="nftImage"><img src={NFT.image} /></span>
        //         </div>
        //         <div className="nftCont">
        //             <span className="nftName">TheMonaLana <NFTdetails nftInf={NFT} index={i} /></span>
        //             <span className="nftNumber">{NFT.native.tokenId}</span>
        //         </div>
        //     </div>
        // </div>
    )
}
