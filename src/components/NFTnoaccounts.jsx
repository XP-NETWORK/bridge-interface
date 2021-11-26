import React from 'react';
import { Image, Modal, Button, Header, Title, Body, Container, Dropdown, Toggle, Menu, Item } from "react-bootstrap";

import Comment from './innercomponents/Comment';
import NFTlistTop from './innercomponents/NFTlistTop';
import DestinationChainReload from './innercomponents/DestinationChainReload';
import DestinationChain from './innercomponents/DestinationChain';
import NFTempty from './innercomponents/NFTempty';

function NFTNoaccounts() {
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
                            <NFTlistTop />
                            <NFTempty/>
                        </div>
                    </div>
                    <div className="sendNftCol col-lg-4">
                        <div className="sendNftBox">
                            <form action="#">
                                <div className="sendNftTit">
                                    <h3>Send NFT</h3>
                                </div>
                                <DestinationChain />
                                <Comment/>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default NFTNoaccounts;
