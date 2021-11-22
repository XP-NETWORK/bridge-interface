import React, { useEffect, useState } from 'react'
import { Image, Modal, Button, Header, Title, Body, Container, Dropdown, Toggle, Menu, Item  } from "react-bootstrap";
import DestinationChain from './innercomponents/DestinationChain';
import DestinationChainReload from './innercomponents/DestinationChainReload';
import SelectedNFT from './innercomponents/SelectedNFT';
import Approval from './innercomponents/Approval';
import NFTgridView from './innercomponents/NFTgridView';
import SendFees from './innercomponents/SendFees';
import NFTlistTop from './innercomponents/NFTlistTop';

import NFTsuccess from './NFTsuccess';
import { ChainFactoryConfigs,    ChainFactory } from "xp.network/dist";
import { useSelector } from 'react-redux';
import {Chain, Config} from 'xp.network/dist/consts';
import { setNFTList } from "../store/reducers/generalSlice"
import { useDispatch } from 'react-redux';
import { parseNFTS } from "../wallet/helpers"

function NFTaccount() {
    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from.key)
    const account = useSelector(state => state.general.account)
    const mainnetConfig = ChainFactoryConfigs.MainNet;
    const factory = ChainFactory(Config, mainnetConfig());



    const handleChainFactory = async () => {
        let chain
        from === "Ethereum" ? chain = await factory.inner(Chain.ETHEREUM) : 
        from === "BSC" ? chain = await factory.inner(Chain.BSC) :
        from === "Tron" ? chain = await factory.inner(Chain.TRON) :
        from === "Elrond" ? chain = await factory.inner(Chain.ELROND) :
        from === "Polygon" ? chain = await factory.inner(Chain.POLYGON) :
        from === "Avalanche" ? chain = await factory.inner(Chain.AVALANCHE) :
        from === "Fantom" ? chain = await factory.inner(Chain.FANTOM) :
        from === "Algorand" ? chain = await factory.inner(Chain.ALGORAND) :
        from === "xDai" ? chain = await factory.inner(Chain.XDAI) :
        from === "Solana" ? chain = await factory.inner(Chain.SOLANA) :
        from === "Cardano" ? chain = await factory.inner(Chain.CARDANO) : chain = ""
        return chain
    }
    
    const getNFTsList = async () => {
        try {
            const chain = await handleChainFactory()
            const bsc = await factory.inner(Chain.BSC);
            const nfts = await factory.nftList(
                chain,    // The chain of interest 
                account    // The public key of the NFT owner
            );
            const parsedNFTs = await parseNFTS(nfts)
            dispatch(setNFTList(parsedNFTs))
        } catch (error) {  
            console.log(error); 
        }
    }

    useEffect( async () => {
        await getNFTsList()
    }, [])
    
    return (
        <div className="NFTaccount" >
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
                            <NFTgridView/>
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
                                <DestinationChain/>
                                <SelectedNFT />
                                <Approval />
                                <SendFees/>
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

export default NFTaccount;
