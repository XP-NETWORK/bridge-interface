import React from 'react'
import { Container } from "react-bootstrap";


import DestinationChainReload from './innercomponents/DestinationChainReload';
import NFTlistTopValid from './innercomponents/NFTlistTopValid';
import NFTOnValid from './innercomponents/NFTOnValid';
import SelectedNFT from './innercomponents/SelectedNFT';
import Approval from './innercomponents/Approval';
import SendFees from './innercomponents/SendFees';
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
