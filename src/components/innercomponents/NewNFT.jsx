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
        <div className={`nft-box__wrapper ${!imageLoaded ? 'preload-cont' : ''}`}>
            <div style={ !imageLoaded && nft.image ? HIDDEN : {}} className={isSelected ? "nft-box__container--selected" : "nft-box__container"}>
                <div onClick={() => addRemoveNFT(nft)} className="nft-image__container">
                    <div className="image__wrapper">
                        { nft.uri ? 
                            <img onLoad={() => setImageLoaded(true)} alt="NFT" src={setupURI(nft.image)} /> 
                            : 
                            <div className="brocken-url">
                                <img onLoad={() => setImageLoaded(true)} src={brockenurl} alt='This NFT image uri is brocken.' />
                                <span className="brocken-url__msg">NFTs URL<br/> is brocken</span>
                            </div>
                        }
                        <div className="radio__container">
                            { !isSelected ? 
                                <span className="selected-radio"></span> 
                                : 
                                <img src={CheckGreen} alt=''/>
                            }
                        </div>
                    </div>
                </div>
                <div className={`nft-content__container ${!imageLoaded ? 'preload-content-container' : ''}`}>
                    <span className="nft-name">
                        <span className="name">{nft.name}</span>
                        <NFTdetails nftInf={nft} index={index} />
                    </span>
                    <span className="nft-number">{nft.native.tokenId}</span>
                </div>
            </div>
            { !imageLoaded && 
                <div className="preload__container">
                    <div className="preload__image"></div>
                    <div className="preload__content">
                        <div className="preload__name"></div>
                        <div className="preload__number"></div>
                    </div>
                </div>
            }
        </div>
    )
}