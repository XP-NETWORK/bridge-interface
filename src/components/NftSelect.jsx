import React, { useCallback } from 'react';
import Video from '../assets/img/icons/Video_icon.svg';
import INF from '../assets/img/icons/Inf.svg';

import SelectDestination from './SelectDestination';
import ConnectWallet from './ConnectWallet';
import { useDispatch } from 'react-redux';
import { setShowAbout, setShowVideo } from '../store/reducers/generalSlice';


function NftSelect() {
    const dispatch = useDispatch()
    
    function handleAboutClick() {
        dispatch(setShowAbout(true))
    }

    function handleVideoClick() {
        dispatch(setShowVideo(true))
    }

    return (
        <div className="NftSelect">
            <div id="tttt" className="nftTitle">
                <h2>Transfer NFTs <br /> between blockchains</h2>
            </div>
            <div className="nftSlectArea">
                
                <SelectDestination/>
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
