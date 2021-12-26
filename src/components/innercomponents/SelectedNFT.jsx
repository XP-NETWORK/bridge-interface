import React, { useEffect } from 'react'
import Close from '../../assets/img/icons/close.svg';
import Back from '../../assets/img/icons/Back.svg';
import { useSelector } from 'react-redux';
import { cleanSelectedNFTList, removeFromSelectedNFTList } from "../../store/reducers/generalSlice"
import { useDispatch } from 'react-redux';
import brockenurl from "../../assets/img/brockenurl.png"


function SelectedNFT() {
    const dispatch = useDispatch()
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const nfts = useSelector(state => state.general.NFTList)
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const handleClear = () => {
        dispatch(cleanSelectedNFTList())
    }

    const handleRemove = (nft) => {
        dispatch(removeFromSelectedNFTList(nft))
    }

    useEffect(() => { }, [selectedNFTs])
    console.log(selectedNFTs, 'asdlkdalkk3l112')
    return (
        <div className="nftSelectList">
            <div className="nftSeleTop">
                <div className="selectedNft nftselectedtop">
                    <a  className="backBtn mobileOnly"><img src={Back} alt="Back" /></a>
                    <span className="mobileOnly">Selected NFTs</span>
                    <span className="desktopOnly">Selected NFTs <span>{selectedNFTs.length} / {nfts?.length}</span></span>
                    <button style={selectedNFTs.length ? {} : OFF } onClick={() => handleClear()} className="clearNft">Clear all</button>
                </div>
            </div>
            <ul className="nftSelected">
                { selectedNFTs ? selectedNFTs.map( nft => <li onClick={() => handleRemove(nft)} className="nftSelecItem"><img src={nft.image ? nft.image : brockenurl} alt="NFT" /><span className="nftSelecItem__name">{nft.name}</span><span className="Close"><img  alt="" src={Close} /></span></li> ) : ''}
            </ul>
        </div>
    )
}

export default SelectedNFT;
