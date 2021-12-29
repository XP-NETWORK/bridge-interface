import React from 'react'
import { Image, Modal, Button, Header, Title, Body, Container, Dropdown, Toggle, Menu, Item } from "react-bootstrap";

import CheckGreen from '../../assets/img/icons/check_green.svg';
// NFT's
import NFT_1 from '../../assets/img/nfts/nft_1.png';

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
                            {/* <span className="nftName">TheMonaLana <NFTdetails/></span> */}
                            <span className="nftName">TheMonaLana </span>
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
