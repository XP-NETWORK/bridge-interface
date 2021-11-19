import React from 'react'
import { Image, Modal, Button, Header, Title, Body, Container, Dropdown, Toggle, Menu, Item  } from "react-bootstrap";

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

function NFTaccount() {
    return (
        <div className="NFTaccount">
            <Container className="nftSlectContaine">
                <div className="row">
                    <div className="nftListCol col-lg-8">
                        <div className="nft_selectBox">
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
                                            {/* <Dropdown.Menu>
                                            
                                        </Dropdown.Menu> */}
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
                            <div className="nftListBox">
                                <div className="row">
                                   <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                       <div className="singleNft nftSelect">
                                           <div className="nftImageBox">
                                                <span className="selectNft"><img src={CheckGreen}/></span>
                                                <span className="nftImage"><img src={NFT_1} /></span>
                                           </div>
                                           <div className="nftCont">
                                                <span className="nftName">TheMonaLana</span>
                                                <span className="nftNumber">784</span>
                                           </div>
                                       </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="singleNft">
                                            <div className="nftImageBox">
                                                <span className="selectNft"><img src={CheckGreen} /></span>
                                                <span className="nftImage"><img src={NFT_2} /></span>
                                            </div>
                                            <div className="nftCont">
                                                <span className="nftName">TheMonaLana</span>
                                                <span className="nftNumber">784</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="singleNft">
                                            <div className="nftImageBox">
                                                <span className="selectNft"><img src={CheckGreen} /></span>
                                                <span className="nftImage"><img src={NFT_3} /></span>
                                            </div>
                                            <div className="nftCont">
                                                <span className="nftName">TheMonaLana</span>
                                                <span className="nftNumber">784</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="singleNft nftSelect">
                                            <div className="nftImageBox">
                                                <span className="selectNft"><img src={CheckGreen} /></span>
                                                <span className="nftImage"><img src={NFT_4} /></span>
                                            </div>
                                            <div className="nftCont">
                                                <span className="nftName">TheMonaLana</span>
                                                <span className="nftNumber">784</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="singleNft">
                                            <div className="nftImageBox">
                                                <span className="selectNft"><img src={CheckGreen} /></span>
                                                <span className="nftImage"><img src={NFT_5} /></span>
                                            </div>
                                            <div className="nftCont">
                                                <span className="nftName">TheMonaLana</span>
                                                <span className="nftNumber">784</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="singleNft">
                                            <div className="nftImageBox">
                                                <span className="selectNft"><img src={CheckGreen} /></span>
                                                <span className="nftImage"><img src={NFT_6} /></span>
                                            </div>
                                            <div className="nftCont">
                                                <span className="nftName">TheMonaLana</span>
                                                <span className="nftNumber">784</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="singleNft">
                                            <div className="nftImageBox">
                                                <span className="selectNft"><img src={CheckGreen} /></span>
                                                <span className="nftImage"><img src={NFT_7} /></span>
                                            </div>
                                            <div className="nftCont">
                                                <span className="nftName">TheMonaLana</span>
                                                <span className="nftNumber">784</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="singleNft">
                                            <div className="nftImageBox">
                                                <span className="selectNft"><img src={CheckGreen} /></span>
                                                <span className="nftImage"><img src={NFT_8} /></span>
                                            </div>
                                            <div className="nftCont">
                                                <span className="nftName">TheMonaLana</span>
                                                <span className="nftNumber">784</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="singleNft">
                                            <div className="nftImageBox">
                                                <span className="selectNft"><img src={CheckGreen} /></span>
                                                <span className="nftImage"><img src={NFT_9} /></span>
                                            </div>
                                            <div className="nftCont">
                                                <span className="nftName">TheMonaLana</span>
                                                <span className="nftNumber">784</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sendNftCol col-lg-4">
                        <div className="sendNftBox">

                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default NFTaccount
