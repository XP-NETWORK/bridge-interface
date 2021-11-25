import React, { useEffect, useState } from 'react'
import { Image, Modal, Button, Header, Title, Body, Container, Dropdown, Toggle, Menu, Item  } from "react-bootstrap";
import DestinationChain from './innercomponents/DestinationChain';
import DestinationChainReload from './innercomponents/DestinationChainReload';
import SelectedNFT from './innercomponents/SelectedNFT';
import Approval from './innercomponents/Approval';
import NFTgridView from './innercomponents/NFTgridView';
import NFTlistView from './innercomponents/NFTlistView';
import SendFees from './innercomponents/SendFees';
import NFTlistTop from './innercomponents/NFTlistTop';
import { ethers } from "ethers";
import NFTsuccess from './NFTsuccess';
import { ChainFactoryConfigs,    ChainFactory } from "xp.network/dist";
import { useSelector } from 'react-redux';
import {Chain, Config} from 'xp.network/dist/consts';
import { setNFTList, setSelectedNFTList, setTxnHash } from "../store/reducers/generalSlice"
import { useDispatch } from 'react-redux';
import { parseNFTS } from "../wallet/helpers"
import { BigNumber } from "bignumber.js";
import NFTworng from './NFTworng';


function NFTaccount() {
    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from.key)
    const to = useSelector(state => state.general.to.key)
    const NFTListView = useSelector(state => state.general.NFTListView)
    const account = useSelector(state => state.general.account)
    const mainnetConfig = ChainFactoryConfigs.MainNet;
    const factory = ChainFactory(Config, mainnetConfig());
    const approvedNFTList = useSelector(state => state.general.approvedNFTList)
    const selectedNFTList = useSelector(state => state.general.selectedNFTList)
    const receiver = useSelector(state => state.general.receiver)
    const Web3Utils = require("web3-utils");
    const approved = useSelector(state => state.general.approved)
    const [estimateInterval, setEstimateInterval] = useState()
    const [fees, setFees] = useState(0)

    const handleChainFactory = async (someChain) => {
        let chain
        someChain === "Ethereum" ? chain = await factory.inner(Chain.ETHEREUM) : 
        someChain === "BSC" ? chain = await factory.inner(Chain.BSC) :
        someChain === "Tron" ? chain = await factory.inner(Chain.TRON) :
        someChain === "Elrond" ? chain = await factory.inner(Chain.ELROND) :
        someChain === "Polygon" ? chain = await factory.inner(Chain.POLYGON) :
        someChain === "Avalanche" ? chain = await factory.inner(Chain.AVALANCHE) :
        someChain === "Fantom" ? chain = await factory.inner(Chain.FANTOM) :
        someChain === "Algorand" ? chain = await factory.inner(Chain.ALGORAND) :
        someChain === "xDai" ? chain = await factory.inner(Chain.XDAI) :
        someChain === "Solana" ? chain = await factory.inner(Chain.SOLANA) :
        someChain === "Cardano" ? chain = await factory.inner(Chain.CARDANO) : chain = ""
        return chain
    }
    
    const getNFTsList = async () => {
        try {
            const chain = await handleChainFactory(from)
            const nfts = await factory.nftList(
                chain,    // The chain of interest 
                account    // The public key of the NFT owner
            );
            const parsedNFTs = await parseNFTS(nfts)
            if(parsedNFTs.length){
                dispatch(setNFTList(parsedNFTs))
            }
            else{
                console.log('No NFTs...');
            }
        } catch (error) {  
            console.log("...",error); 
        }
    }

    const estimate = async () => {
        try {
            const fromChain = await handleChainFactory(from)
            const toChain = await handleChainFactory(to)
            const wallet = account
            const fee = await factory.estimateFees(fromChain, toChain, selectedNFTList[0], wallet);
            const bigNum = fee.multipliedBy(1.8).decimalPlaces(0).toString();
            const fees = await Web3Utils.fromWei(bigNum, "ether")
            setFees(selectedNFTList.length * fees) 
        } catch (err) {
          console.log(err);
        }
    }

    const sendEach = async (nft) => {
        const toChain = await handleChainFactory(to)
        const fromChain = await handleChainFactory(from)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(account)
        try {
            const result = await factory.transferNft(
                fromChain, // The Source Chain.
                toChain,   // The Destination Chain.
                nft,       // Or the NFT you have chosen.
                signer,    // Or tronlink or maiar.
                receiver   // The address who you are transferring the NFT to.
            )
            console.log(result);
            dispatch(setTxnHash(result))
            
        } catch (error) {
            console.log(error);
        }
    }

    const sendAllNFTs = () => {
        approvedNFTList.forEach( nft => {
            sendEach(nft)
        })
    }

    useEffect( async () => {
        await getNFTsList()
    }, [])

    useEffect(() => {
        if(selectedNFTList.length > 0) estimate();
        else setFees("0")
        const s = setInterval(() => estimate(), 1000 * 30);
        setEstimateInterval(s)
        return () => clearInterval(s);
    }, [selectedNFTList])
    
    return (
        <div className="NFTaccount" >
            <Container className="nftSlectContaine">
                <NFTworng />
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
                            { NFTListView ? 
                            <NFTlistView /> 
                            : 
                            <NFTgridView/>}
                        </div>
                        <div className="mobileOnly">
                            <Approval getNft={getNFTsList} />
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
                                <SendFees fees={fees}/>
                                {/* <div className="nftSendBtn disabled"> */}
                                <div onClick={sendAllNFTs} className={approved && receiver ? 'nftSendBtn' : 'nftSendBtn disabled'}  >
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
