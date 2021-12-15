import React from 'react'
import { Image, Modal, Button, Header, Title, Body, Container, Dropdown, Toggle, Menu, Item } from "react-bootstrap";

import Algorand from '../../assets/img/chain/Algarand.svg';
import BSC from '../../assets/img/chain/Binance.svg';
import Search from '../../assets/img/icons/Search.svg';
import ListView from '../../assets/img/icons/ListView.svg';
import CheckGreen from '../../assets/img/icons/check_green.svg';
// NFT's
import NFT_1 from '../../assets/img/nfts/nft_1.png';
import NFT_2 from '../../assets/img/nfts/nft_2.png';
import NFT_3 from '../../assets/img/nfts/nft_3.png';
import NFT_4 from '../../assets/img/nfts/nft_4.png';
import NFT_5 from '../../assets/img/nfts/nft_5.png';
import NFT_6 from '../../assets/img/nfts/nft_6.png';
import NFT_7 from '../../assets/img/nfts/nft_7.png';
import NFT_8 from '../../assets/img/nfts/nft_8.png';
import NFT_9 from '../../assets/img/nfts/nft_9.png';
import SelectedNFT_1 from '../../assets/img/nfts/SelectedNFT_1.png';
import SelectedNFT_2 from '../../assets/img/nfts/SelectedNFT_2.png';
import SelectedNFT_3 from '../../assets/img/nfts/SelectedNFT_3.png';
import SelectedNFT_4 from '../../assets/img/nfts/SelectedNFT_4.png';
import SelectedNFT_5 from '../../assets/img/nfts/SelectedNFT_5.png';
// Chain
import Avalanche from '../../assets/img/chain/Avalanche.svg';
import Close from '../../assets/img/icons/close.svg';
import InfLith from '../../assets/img/icons/infoLifht.svg';
import INF from '../../assets/img/icons/Inf.svg';
import RelBlue from '../../assets/img/icons/RelBlue.svg';
import RelWhit from '../../assets/img/icons/RelWhit.svg';

import RedClose from '../../assets/img/icons/RedClose.svg';

function NFTlistTopValid() {
    return (
        <div className="nftListTop">
            <div className="yourNft desktopOnly">
                Your NFTs on <span className="reloadNfts"><img src={BSC} alt="NFT Name" /> BSC <img src={RelBlue} /></span>
            </div>
            <div className="yourNft seleNftMob mobileOnly">
                Select NFT <span>/ 12</span>
            </div>
            <div className="nftTopRIght">
                <div className="searchNft">
                    <Dropdown className="SearchDrop desktopOnly">
                        <Dropdown.Toggle id="SearchDrop" >
                            {/* <img src={Search} /> */}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <form action="#">
                                <input type="search" placeholder="Search NFT" />
                                <button type="button"><img src={Search} /></button>
                            </form>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="nftViewBtn">
                    <span className="ListView"><img src={ListView} /></span>
                </div>
                <div className="selectAll">
                    Select All
                </div>
            </div>
            <div className="mobileOnly mobSearch">
                <form action="#">
                    <input type="search" placeholder="Search NFT" />
                    <button type="button"><img src={Search} /></button>
                </form>
            </div>
        </div>
    )
}

export default NFTlistTopValid;
