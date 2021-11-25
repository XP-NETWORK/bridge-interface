import React from 'react'
import { Container } from "react-bootstrap";

import NFTlistView from './innercomponents/NFTlistView';
import DestinationChain from './innercomponents/DestinationChain';
import DestinationChainReload from './innercomponents/DestinationChainReload';
import SelectedNFT from './innercomponents/SelectedNFT';
import Approval from './innercomponents/Approval';
import SendFees from './innercomponents/SendFees';
import NFTlistTop from './innercomponents/NFTlistTop';
import NFTsuccess from './NFTsuccess';
import NFTworng from './NFTworng';

function NFTaccountList() {
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
                            <NFTlistTop/>
                            <NFTlistView/>
                        </div>
                        <div className="mobileOnly">
                            <Approval />
                            <SendFees />
                            <div className="nftSendBtn disenable">
                            <NFTsuccess/>
                            </div>
                        </div>
                    </div>
                    <div className="sendNftCol col-lg-4 desktopOnly">
                        <div className="sendNftBox">
                            <form action="#">
                                <div className="sendNftTit">
                                    <h3>Send NFT</h3>
                                </div>
                                <DestinationChain />
                                <SelectedNFT />
                                <Approval />
                                <SendFees />
                                <div className="nftSendBtn disenable">
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

export default NFTaccountList;
