import React, { useEffect } from 'react'

import SelectedNFT_1 from '../../assets/img/nfts/SelectedNFT_1.png';
import SelectedNFT_2 from '../../assets/img/nfts/SelectedNFT_2.png';
import SelectedNFT_3 from '../../assets/img/nfts/SelectedNFT_3.png';
import SelectedNFT_4 from '../../assets/img/nfts/SelectedNFT_4.png';
import SelectedNFT_5 from '../../assets/img/nfts/SelectedNFT_5.png';
import Close from '../../assets/img/icons/close.svg';
import Back from '../../assets/img/icons/Back.svg';
import { useSelector } from 'react-redux';
import { cleanSelectedNFTList } from "../../store/reducers/generalSlice"
import { useDispatch } from 'react-redux';

function SelectedNFT() {
    const dispatch = useDispatch()
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const handleClear = () => {
        dispatch(cleanSelectedNFTList())
    }
    useEffect(() => { }, [selectedNFTs])

    return (
        <div className="nftSelectList">
            <div className="nftSeleTop">
                <div className="selectedNft nftselectedtop">
                    <a href="#" className="backBtn mobileOnly"><img src={Back} alt="Back" /></a>
                    <span className="mobileOnly">Selected NFTs</span>
                    <span className="desktopOnly">Selected NFT <span>/ {selectedNFTs.length}</span></span>
                    <button onClick={() => handleClear()} className="clearNft">Clear all</button>
                </div>
            </div>
            <ul className="nftSelected">
                { selectedNFTs ? selectedNFTs.map( nft => <li className="nftSelecItem"><img src={nft.image} alt="NFT" />{nft.name}<span className="Close"><img src={Close} /></span></li> ) : ''}
            </ul>
        </div>
    )
}

export default SelectedNFT;
