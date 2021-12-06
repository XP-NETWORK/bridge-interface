import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedNFTList, removeFromSelectedNFTList }  from "../../store/reducers/generalSlice"
import CheckGreen from '../../assets/img/icons/check_green.svg';
import NFTdetails from '../NFTdetails';
import { useSelector } from 'react-redux';
import { setupURI } from '../../wallet/oldHelper';
import  "../styles/NFT.css"


export default function NFT({nft, index}) {
    let [imageLoading, setImageLoading] = useState(true);
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
        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
        {/* // <div className="nft__container"> */}
            <div  style={ !imageLoaded ? HIDDEN : {}} className={`singleNft ${isSelected ? 'singleNft-selected' : ''}`}>
                <div onClick={() => addRemoveNFT(nft)} className={`nftImageBox ${isSelected ? 'nftSelect': ''}`}>
                    <span className="selectNft">{<img src={CheckGreen} />}</span>
                    <span className="nftImage"><img onLoad={() => setImageLoaded(true)} alt="NFT" src={setupURI(nft.image)} /></span>
                </div>
                <div className="nftCont">
                    <span className="nftName"><span className="name">{nft.name}</span><NFTdetails nftInf={nft} index={index} /></span>
                    <span className="nftNumber">{nft.native.tokenId}</span>
                </div>
            </div>
            {/* <div style={ imageLoaded ? HIDDEN : {} } className="nft-sceleton singleNft">
                <div className="nft-sceleton-img"></div>
                <div className="nft-sceleton nftCont">
                    <span className="nft-sceleton nftName"></span>
                    <span className="nft-sceleton nftNumber"></span>
                </div>
            </div> */}
        </div>
    )

    // useEffect(() => { }, [selectedNFTs])
    // return ( 
    //     <div className="nft__box">
    //     {/* // <div className="nft__container"> */}
    //         {/* <div style={ !imageLoaded ? HIDDEN : {}} className={`singleNft ${isSelected ? 'singleNft-selected' : ''}`}> */}
    //         <div style={ !imageLoaded ? HIDDEN : {}} className="">
    //             {/* <div onClick={() => addRemoveNFT(nft)} className={`nftImageBox ${isSelected ? 'nftSelect': ''}`}> */}
    //             <div onClick={() => addRemoveNFT(nft)} className="">
    //                 <span className="">{<img src={CheckGreen} />}</span>
    //                 <span className=""><img onLoad={() => setImageLoaded(true)} alt="NFT" src={setupURI(nft.image)} /></span>
    //             </div>
    //             <div className="">
    //                 <span className=""><span className="">{nft.name}</span><NFTdetails nftInf={nft} index={index} /></span>
    //                 <span className="">{nft.native.tokenId}</span>
    //             </div>
    //         </div>
    //         {/* <div style={ imageLoaded ? HIDDEN : {} } className="nft-sceleton singleNft">
    //             <div className="nft-sceleton-img"></div>
    //             <div className="nft-sceleton nftCont">
    //                 <span className="nft-sceleton nftName"></span>
    //                 <span className="nft-sceleton nftNumber"></span>
    //             </div>
    //         </div> */}
    //     </div>
    // )
}
