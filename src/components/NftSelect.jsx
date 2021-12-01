import React from 'react';
import Video from '../assets/img/icons/Video_icon.svg';
import INF from '../assets/img/icons/Inf.svg';

import SelectDestination from './SelectDestination';
import ConnectWallet from './ConnectWallet';


function NftSelect() {
    return (
        <div className="NftSelect">
            <div className="nftTitle">
                <h2>Transfer NFT’s <br /> between blockchains</h2>
            </div>
            <div className="nftSlectArea">
                
                <SelectDestination/>
                <ConnectWallet/>
                <div className="aboutNft">
                    <a target="_blank" className="videoLink"><img src={Video} />   Learn how to use NFT bridge</a>
                    <a target="_blank" className="about_Nft"><img src={INF} alt="" /> What is NFT</a>
                </div>
            </div>
        </div>
    )
}

export default NftSelect
