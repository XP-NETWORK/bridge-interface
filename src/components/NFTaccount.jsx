import React, { useEffect, useState } from 'react'
import { Container } from "react-bootstrap";
import DestinationChain from './innercomponents/DestinationChain';
import DestinationChainReload from './innercomponents/DestinationChainReload';
import SelectedNFT from './innercomponents/SelectedNFT';
import Approval from './innercomponents/Approval';
import NFTgridView from './innercomponents/NFTgridView';
import NFTlistView from './innercomponents/NFTlistView';
import SendFees from './innercomponents/SendFees';
import BigNumber from 'bignumber.js'
import NFTlistTop from './innercomponents/NFTlistTop';
import { ethers } from "ethers";
import { useSelector } from 'react-redux';
import { setBigNumFees, setError,  setNFTsToWhitelist, setTxnHash, setTransferLoaderModal, setTransactionStep } from "../store/reducers/generalSlice"
import { useDispatch } from 'react-redux';
import { getFactory,  handleChainFactory,  setClaimablesAlgorand, setNFTS } from "../wallet/helpers"
import Comment from "../components/innercomponents/Comment"
import{  getOldFactory } from '../wallet/oldHelper'
import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
import {chainsConfig} from './values'
import { algoConnector } from "../wallet/connectors"
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { useWeb3React } from '@web3-react/core';
import { TempleWallet } from "@temple-wallet/dapp";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";



function NFTaccount() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState()
    const from = useSelector(state => state.general.from.key)
    const algorandAccount = useSelector(s => s.general.algorandAccount)
    const to = useSelector(state => state.general.to.key)
    const isToEVM = useSelector(state => state.general.to).type === 'EVM'
    const NFTListView = useSelector(state => state.general.NFTListView)
    const nfts = useSelector(state => state.general.NFTList)
    console.log("nfts: ", nfts);
    const tronWallet = useSelector(state => state.general.tronWallet)
    const account = useSelector(state => state.general.account)
    const tezosAccount = useSelector(state => state.general.tezosAccount)
    const kukaiWallet = useSelector(state => state.general.kukaiWallet)
    const maiarProvider = useSelector(state => state.general.maiarProvider)
    const factory = getFactory()
    const approvedNFTList = useSelector(state => state.general.approvedNFTList)
    const selectedNFTList = useSelector(state => state.general.selectedNFTList)
    const receiver = useSelector(state => state.general.receiver)
    const Web3Utils = require("web3-utils");
    const approved = useSelector(state => state.general.approved)
    const [estimateInterval, setEstimateInterval] = useState()
    const [fees, setFees] = useState(0)
    const onMaiar = useSelector(state => state.general.onMaiar)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const bigNumberFees = useSelector(state => state.general.bigNumberFees)
    const algorandWallet = useSelector(state => state.general.AlgorandWallet)
    const MyAlgo = useSelector(state => state.general.MyAlgo)
    const modalError = useSelector(state => state.general.error)
    const WCProvider = useSelector(state => state.general.WCProvider)
    const { library } = useWeb3React()
    
    
    const getAlgorandWalletSigner = async () => {
        const base = new MyAlgoConnect();
        if( algorandWallet ){
            try {
                const factory = await getFactory()
                const inner = await factory.inner(15)
                const signer = await inner.walletConnectSigner(algoConnector, algorandAccount)
                return signer
            } catch (error) {
                console.log(error.data ? error.data.message : error.data ? error.data.message : error.message);
            }
        }
        else if(MyAlgo){
            const factory = await getFactory()
            const inner = await factory.inner(15)
            const signer = inner.myAlgoSigner(base, algorandAccount)
            return signer
        }
        else{
            const signer = {
                address: algorandAccount,
                algoSigner: window.AlgoSigner,
                ledger: "MainNet"
            }
            return signer
        }
    }
    
    async function getNFTsList(){
        // debugger
       const hard = "0xA4daaa789148DB1B9Ba6244f45Bd226a0a0A3366"
        try {
            // const w = algorandAccount ? algorandAccount : tronWallet ? tronWallet : elrondAccount ? elrondAccount :  
            
            const w = tezosAccount || algorandAccount || tronWallet || elrondAccount || account
            await setNFTS(w, from)
            } catch (error) {  
                dispatch(setError(error.data ? error.data.message : error.message))
            }
    }
    
    async function estimate () {
        debugger
   
        let fact
        let fee
        try {
            const fromChain = await handleChainFactory(from)
            const toChain = await handleChainFactory(to)
            const wallet = 
            to ==='Tron' ? 'TCCKoPRcYoCGkxVThCaY9vRPaKiTjE4x1C' 
            : from === 'Tron' && isToEVM ? '0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6'
            : from === 'Algorand' && isToEVM ? '0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6'
            : from === 'Elrond' && isToEVM ? '0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6'
            : from === 'Tezos' && isToEVM ? '0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6' 
            : account;

            fact = await getFactory()
            if(selectedNFTList.length) {
                if(to ==='Tron'){
                   fee = from === 'BSC' ? new BigNumber('100000000000000000')
                    : from === 'Polygon' ? new BigNumber('23200000000000000000') 
                    : from === 'Ethereum' ? new BigNumber('14952490000000000') 
                    : from === 'Algorand' ? new BigNumber('32160950300000000000') 
                    : from === 'Elrond' ? new BigNumber('239344350000000000') 
                    : from === 'Avalanche' ? new BigNumber('529683610000000000') 
                    : from === 'xDai' ? new BigNumber('56645012600000000000') 
                    : from === 'Fuse' ? new BigNumber('95352570490000000000') 
                    : ''
                }
                else{
                    try {
                       fee = await fact.estimateFees(fromChain, toChain, selectedNFTList[0], wallet)
                    } catch (error) {
                        console.error(error);
                    }
                } 
            }

            const bigNum = fee ? fee.multipliedBy(1.1).integerValue().toString(10) : undefined
            dispatch(setBigNumFees(bigNum))
            const fees =  await Web3Utils.fromWei(bigNum, "ether")
            setFees(fees)
        } catch (error) {
          console.log(error.data ? error.data.message : error.message);
        //   dispatch(setError(error))
        }
    }

    // const sendEach = async (nft, index) => {
    //     debugger
    //     if(index === 0) dispatch(setTransactionStep(1))
    //     const factory = await getFactory()
    //     const toChain = await factory.inner(chainsConfig[to].Chain)
    //     const fromChain = await factory.inner(chainsConfig[from].Chain)
    //     const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : ''
    //     let tezosSigner
    //     if(from === 'Tezos') {
    //         tezosSigner = new TempleWallet("XP.NETWORK Cross-Chain NFT Bridge");
    //         await tezosSigner.connect("mainnet");
    //     }
    //     const signer = from === 'Algorand' 
    //     ? await getAlgorandWalletSigner() :
    //     (from === "Tezos" && kukaiWallet) ? new BeaconWallet({ name: "XP.NETWORK Cross-Chain NFT Bridge" }) :
    //     from === 'Elrond' ? maiarProvider ? maiarProvider : ExtensionProvider.getInstance() :
    //     from === 'Tron' ? window.tronWeb 
    //     : tezosSigner ? tezosSigner
    //     : provider.getSigner(account)
       
    //     try {
    //         let result
    //         if(from === 'Tron') {
    //             const fact = await getOldFactory()
    //             const toChains = await fact.inner(chainsConfig[to].Chain)
    //             const fromChainT = await fact.inner(chainsConfig[from].Chain)
    //              result = await fact.transferNft(
    //                 fromChainT, // The Source Chain.
    //                 toChains,   // The Destination Chain.
    //                 nft,       // Or the NFT you have chosen.
    //                 undefined,    // Or tronlink or maiar.
    //                 receiver,   // The address who you are transferring the NFT to.
    //                 bigNumberFees
    //             )
    //             dispatch(dispatch(setTransferLoaderModal(false)))
    //             setLoading(false)
    //             dispatch(setTxnHash({txn: result, nft}))
    //         }
    //         else {
    //             try {
    //                 result = await factory.transferNft(
    //                     fromChain, // The Source Chain.
    //                     toChain,   // The Destination Chain.
    //                     nft,       // Or the NFT you have chosen.
    //                     signer,    // Or tronlink or maiar.
    //                     receiver,   // The address who you are transferring the NFT to.
    //                     bigNumberFees
    //                 )
    //                 dispatch(dispatch(setTransferLoaderModal(false)))
    //                 setLoading(false)
    //                 dispatch(setTxnHash({txn: result, nft}))
    //             } catch(error) {
                    
    //                 // dispatch(setTxnHash({txn: "failed", nft}))
    //                 dispatch(dispatch(setTransferLoaderModal(false)))
    //                 setLoading(false)
    //                 if(error.data){
    //                     if(error.data.message.includes("not whitelisted")){
    //                         dispatch(setNFTsToWhitelist({
    //                             url: nft.image,
    //                             name: nft.name
    //                         }))
    //                     }
    //                 }
    //                 else if(error.data ? error.data.message : error.message?.includes('non-origin chain')){
    //                     dispatch(setError("Trying to send wrapped nft to non-origin chain!!!"))
    //                     setLoading(false)
    //                 }
    //             }
    //         }
    //         if(to === 'Algorand') {
    //             await setClaimablesAlgorand(algorandAccount)
    //         }
    //     } catch (error) {
    //         // dispatch(setTxnHash({txn: "failed", nft}))
    //         setLoading(false)
    //         dispatch(dispatch(setTransferLoaderModal(false)))
    //         console.log(error);
    //         if(error.data){
    //             if(error.data.message.includes("not whitelisted")){
    //                 dispatch(setNFTsToWhitelist({
    //                     url: nft.image,
    //                     name: nft.name
    //                 }))
    //             }
    //         }
    //         else if(error.data ? error.data.message : error.message?.includes('non-origin chain')){
    //             dispatch(setError("Trying to send wrapped nft to non-origin chain!!!"))
    //             setLoading(false)
    //         }
    //     }
    // }

    const getSigner = async () => {
        // debugger
        let signer 
        try {
            if(from === "Tezos"){
                if(kukaiWallet){
                    signer = new BeaconWallet({ name: "XP.NETWORK Cross-Chain NFT Bridge" })
                    return signer 
                }
                else{
                    signer = new TempleWallet("XP.NETWORK Cross-Chain NFT Bridge");
                    await signer.connect("mainnet");
                    return signer
                }
            }
            else if(from === "Algorand"){
                signer = await getAlgorandWalletSigner()
                return signer
            }
            else if(from === 'Elrond') return maiarProvider || ExtensionProvider.getInstance()
            else{
                const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : ''
                signer = provider.getSigner(account)
                return signer
            }
        } catch (error) {
            console.error(error)
            return
        }
    }

    const sendEach = async (nft, index) => {
        debugger
        const signer = await getSigner()
        let factory 
        let toChain 
        let fromChain
        let result
        try {  
            if(from === "tron"){
                factory = await getOldFactory()
                toChain = await factory.inner(chainsConfig[to].Chain)
                fromChain = await factory.inner(chainsConfig[from].Chain)
                result = await factory.transferNft(
                    fromChain, 
                    toChain,  
                    nft,   
                    undefined,   
                    receiver,  
                    bigNumberFees
                )
                dispatch(dispatch(setTransferLoaderModal(false)))
                setLoading(false)
                dispatch(setTxnHash({txn: result, nft}))
            }
            else{
                factory = await getFactory()
                toChain = await factory.inner(chainsConfig[to].Chain)
                fromChain = await factory.inner(chainsConfig[from].Chain)
                result = await factory.transferNft(
                    fromChain, 
                    toChain,   
                    nft,      
                    signer,   
                    receiver,  
                    bigNumberFees
                )
                dispatch(dispatch(setTransferLoaderModal(false)))
                setLoading(false)
                dispatch(setTxnHash({txn: result, nft}))
            }
            if(to === "Algorand") await setClaimablesAlgorand(algorandAccount)
        } catch (err) {
            console.error(err)
            console.log('this is error in sendeach')
            setLoading(false)
            dispatch(dispatch(setTransferLoaderModal(false)))
            const { data, message, error } = err
            if(message){
                if(
                    message.includes("NFT not whitelisted") 
                    || message.includes('contract not whitelisted')
                    || (data ? data.message.includes('contract not whitelisted') : false )
                ){
                    dispatch(setNFTsToWhitelist({
                        url: nft.image,
                        name: nft.name
                    }))
                }
                else if(
                    message.includes('User cant pay the bills')
                    || (data ? data.message.includes('User cant pay the bills') : false )
                ) dispatch(setError(`You don't have enough funds to pay the fees`))
                else dispatch(setError(err.data ? err.data.message : err.message))
                return
            }
            else dispatch(setError(err.data ? err.data.message : err.message))
            return
        }
    }


    const sendAllNFTs = () => {
        console.log('hellosasa')
        if(!loading && approved) {
            setLoading(true)
            dispatch(setTransferLoaderModal(true))
            selectedNFTList.forEach( (nft, index) => {
                sendEach(nft, index)
            })
        }
    }

    useEffect( async () => {
        await getNFTsList()
    }, [])

    useEffect( async () => {
    }, [nfts])


    useEffect(() => {
        if(selectedNFTList.length > 0) estimate();
        else setFees("0")
        const s = setInterval(() => estimate(), 1000 * 30);
        setEstimateInterval(s)
        return () => clearInterval(s);
    }, [selectedNFTList])

    useEffect(() => {
        clearInterval(estimateInterval)
        estimate()
        const s = setInterval(() => estimate(), 1000 * 30);
        setEstimateInterval(s)
        return () => clearInterval(s)
    }, [to])

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
                            { NFTListView ? 
                            <NFTlistView /> 
                            : 
                            <NFTgridView/>}
                        </div>
                        <div className="mobileOnly">
                            <Approval getNft={getNFTsList} />
                            <div className="nftSendBtn disenable">
                            {/* <NFTsuccess/> */}
                            <SendFees fees={fees * selectedNFTList?.length}/>
                            <div onClick={sendAllNFTs} className={approved && receiver && !loading ? 'nftSendBtn' : 'nftSendBtn disabled'}  >
                                            <a  className="themBtn">
                                                {loading ? 'Processing' : 'Send' }
                                            </a>
                                        </div>
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
                                { nfts?.length ? 
                                    <>
                                        <SelectedNFT />
                                        <Approval />
                                        <SendFees fees={fees * selectedNFTList?.length}/>
                                        <div 
                                        onClick={sendAllNFTs} className={approved && receiver && !loading ? 'nftSendBtn' : 'nftSendBtn disabled'}  >
                                            <a  className="themBtn">
                                                {loading ? 'Processing' : 'Send' }
                                            </a>
                                        </div>
                                    </>
                                    :
                                    <Comment />
                                }
                            </form>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default NFTaccount;
