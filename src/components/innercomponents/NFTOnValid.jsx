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
import NFTdetails from '../NFTdetails';


function NFTOnValid() {
    return (
        <div className="nftListBox">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="singleNft nftSelect">
                        <div className="nftImageBox">
                            <span className="selectNft"><img src={CheckGreen} /></span>
                            <span className="nftImage"><img src={NFT_1} /></span>
                        </div>
                        <div className="nftCont">
                            <span className="nftName">TheMonaLana <NFTdetails/></span>
                            <span className="nftNumber">784</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="singleNft missing">

                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="singleNft missing">

                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="singleNft missing">

                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="singleNft missing">

                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="singleNft missing">

                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="singleNft missing">

                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="singleNft missing">

                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="singleNft missing">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTOnValid
