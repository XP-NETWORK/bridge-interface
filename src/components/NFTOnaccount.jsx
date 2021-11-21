import React from 'react'
import { Image, Modal, Button, Header, Title, Body, Container, Dropdown, Toggle, Menu, Item } from "react-bootstrap";

import NFTdetails from './NFTdetails';
import DestinationChainReload from './innercomponents/DestinationChainReload';
import NFTlistTopValid from './innercomponents/NFTlistTopValid';
import NFTOnValid from './innercomponents/NFTOnValid';
import SelectedNFT from './innercomponents/SelectedNFT';
import Approval from './innercomponents/Approval';
import SendFees from './innercomponents/SendFees';

import Algorand from '../assets/img/chain/Algarand.svg';
import BSC from '../assets/img/chain/Binance.svg';
import Search from '../assets/img/icons/Search.svg';
import ListView from '../assets/img/icons/ListView.svg';
import CheckGreen from '../assets/img/icons/check_green.svg';
// NFT's
import NFT_1 from '../assets/img/nfts/nft_1.png';
import NFT_2 from '../assets/img/nfts/nft_2.png';
import NFT_3 from '../assets/img/nfts/nft_3.png';
import NFT_4 from '../assets/img/nfts/nft_4.png';
import NFT_5 from '../assets/img/nfts/nft_5.png';
import NFT_6 from '../assets/img/nfts/nft_6.png';
import NFT_7 from '../assets/img/nfts/nft_7.png';
import NFT_8 from '../assets/img/nfts/nft_8.png';
import NFT_9 from '../assets/img/nfts/nft_9.png';
import SelectedNFT_1 from '../assets/img/nfts/SelectedNFT_1.png';
import SelectedNFT_2 from '../assets/img/nfts/SelectedNFT_2.png';
import SelectedNFT_3 from '../assets/img/nfts/SelectedNFT_3.png';
import SelectedNFT_4 from '../assets/img/nfts/SelectedNFT_4.png';
import SelectedNFT_5 from '../assets/img/nfts/SelectedNFT_5.png';
// Chain
import Avalanche from '../assets/img/chain/Avalanche.svg';
import Close from '../assets/img/icons/close.svg';
import InfLith from '../assets/img/icons/infoLifht.svg';
import INF from '../assets/img/icons/Inf.svg';
import RelBlue from '../assets/img/icons/RelBlue.svg';
import RelWhit from '../assets/img/icons/RelWhit.svg';

import RedClose from '../assets/img/icons/RedClose.svg';
import NFTsuccess from './NFTsuccess';




function NFTOnaccount() {
    
    return (
        <div className="NFTaccount">
            <Container className="nftSlectContaine">
                
                <div className="row">
                    <div className="nftListCol col-lg-8">
                        <div className="mobileOnly">
                            <div className="sendNftTit">
                                <h3>Send NFT</h3>
                            </div>
                            <DestinationChainReload />
                        </div>
                        <div className="nft_selectBox">
                            <NFTlistTopValid/>
                            <NFTOnValid/>
                        </div>
                        <div className="mobileOnly">
                            <Approval />
                            <SendFees />
                            <div className="nftSendBtn">
                            <NFTsuccess/>
                            </div>
                        </div>
                    </div>
                    <div className="sendNftCol col-lg-4 mtm50">
                        <div className="sendNftBox">
                            <form action="#">
                                <div className="sendNftTit">
                                    <h3>Send NFT</h3>
                                </div>
                                <DestinationChainReload/>
                                <SelectedNFT />
                                <Approval />
                                <SendFees />
                                <div className="nftSendBtn ">
                                    <NFTsuccess/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default NFTOnaccount;
