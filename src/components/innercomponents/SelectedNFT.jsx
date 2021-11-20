import React from 'react'

import SelectedNFT_1 from '../../assets/img/nfts/SelectedNFT_1.png';
import SelectedNFT_2 from '../../assets/img/nfts/SelectedNFT_2.png';
import SelectedNFT_3 from '../../assets/img/nfts/SelectedNFT_3.png';
import SelectedNFT_4 from '../../assets/img/nfts/SelectedNFT_4.png';
import SelectedNFT_5 from '../../assets/img/nfts/SelectedNFT_5.png';
import Close from '../../assets/img/icons/close.svg';
import Back from '../../assets/img/icons/Back.svg';

function SelectedNFT() {
    return (
        <div className="nftSelectList">
            <div className="nftSeleTop">
                <div className="selectedNft nftselectedtop">
                    <a href="#" className="backBtn mobileOnly"><img src={Back} alt="Back" /></a>
                    <span className="mobileOnly">Selected NFTs</span>
                    <span className="desktopOnly">Selected NFT <span>/ 8</span></span>
                    <button className="clearNft">Clear all</button>
                </div>
            </div>
            <ul className="nftSelected">
                <li className="nftSelecItem">
                    <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_3} alt="NFT" /> 333333 NFT <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_4} alt="NFT" /> 2222 NFT <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_5} alt="NFT" /> name 111 NFT <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <span className="Close"><img src={Close} /></span>
                </li>
            </ul>
        </div>
    )
}

export default SelectedNFT;
