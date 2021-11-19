import React from 'react'
import { Image, Modal, Button, Header, Title, Body, Container, Dropdown, Toggle, Menu, Item } from "react-bootstrap";

import NFTdetails from './NFTdetails';

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

import RedClose from '../assets/img/icons/RedClose.svg';


function NFTaccountList() {
    return (
        <div className="NFTaccount">
            <Container className="nftSlectContaine">
                <NFTdetails />
                <div className="row">
                    <div className="nftListCol col-lg-8">
                        {/* For List View Add This className "nftListView" */}
                        <div className="nft_selectBox nftListView">
                            <div className="nftListTop">
                                <div className="yourNft">
                                    Your NFTs on <span><img src={BSC} alt="NFT Name" /> BSC</span>
                                </div>
                                <div className="nftTopRIght">
                                    <div className="searchNft">
                                        <Dropdown className="SearchDrop">
                                            <Dropdown.Toggle id="SearchDrop" >
                                                <img src={Search} />
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
                            </div>
                            <div className="nftListBox ">
                                <ul className="nftSelected">
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_3} alt="NFT" /> 333333 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_4} alt="NFT" /> 2222 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_5} alt="NFT" /> name 111 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_3} alt="NFT" /> 333333 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_4} alt="NFT" /> 2222 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_5} alt="NFT" /> name 111 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_3} alt="NFT" /> 333333 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_4} alt="NFT" /> 2222 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_5} alt="NFT" /> name 111 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                    <li className="nftSelecItem">
                                        <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <span className="NFTInf"><img src={INF} /></span> <span className="Close"><img src={Close} /></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="sendNftCol col-lg-4">
                        <div className="sendNftBox">
                            <form action="#">
                                <div className="sendNftTit">
                                    <h3>Send NFT</h3>
                                </div>
                                <div className="destiAddress">
                                    <div className="desChain">
                                        Destination Chain <span><img src={Avalanche} alt="" /> Avalanche</span>
                                    </div>
                                    <div className="desAddress">
                                        <input type="text" placeholder="Paste destination address" />
                                        <span className="invalid"><img src={RedClose} alt="Close" /> Invalid address</span>
                                    </div>
                                </div>
                                <div className="nftSelectList">
                                    <div className="nftSeleTop">
                                        <div className="selectedNft">
                                            Selected NFT <span>/ 8</span>
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
                                <div className="approValBox">
                                    <div className="approvTop">
                                        Approval
                                        <div className="appInf">
                                            <span className="infText">
                                                We'd like to make sure you really want to send the NFT and pay the associated fees.
                                            </span>
                                            <img src={InfLith} alt="Inf" />
                                        </div>
                                    </div>
                                    <div className="approveBtn">
                                        Approve all NFTs
                                        <div className="approveBtn">
                                            <input type="checkbox" id="approveCheck" />
                                            <label htmlFor="approveCheck">
                                                <span className="checkCircle"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="nftFees">
                                    Fees <span>0 BNB</span>
                                </div>
                                <div className="nftSendBtn disenable">
                                    <a href="#" className="themBtn">Send</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default NFTaccountList;
