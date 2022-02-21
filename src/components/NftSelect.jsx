import React, { useCallback } from 'react';
import Video from '../assets/img/icons/Video_icon.svg';
import INF from '../assets/img/icons/Inf.svg';
import ConnectWallet from './ConnectWallet';
// import ConnectWallet from "./Wallet/ConnectWallet"
import { useDispatch, useSelector } from 'react-redux';
import { setShowAbout, setShowVideo } from '../store/reducers/generalSlice';
import NFTSelectBox from './NFTSelectBox';
import NFTChainListBox from './Chains/NFTChainListBox';


function NftSelect() {
    const dispatch = useDispatch()
    
    function handleAboutClick() {
        dispatch(setShowAbout(true))
    }

    function handleVideoClick() {
        dispatch(setShowVideo(true))
    }
    const {widget} = useSelector(s => s.general)
    return (
        <div className="NftSelect">
            {!widget ? <div id="tttt" className="nftTitle">
                <h2>Transfer NFTs <br /> between blockchains</h2>
            </div> : ''}
            <div className="nftSlectArea">
                <NFTSelectBox />
                <NFTChainListBox />
                <ConnectWallet/>
                <div id="aboutnft" className="aboutNft">
                    <a onClick={() => handleVideoClick()} target="_blank" className="videoLink"><img src={Video} />   Learn how to use NFT bridge</a>
                    <a onClick={() => handleAboutClick()} target="_blank" className="about_Nft"><img src={INF} alt=""/> What is NFT</a>
                </div>
            </div>
        </div>
    )
}

export default NftSelect
