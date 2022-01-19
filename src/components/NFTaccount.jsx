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
import NFTsuccess from './NFTsuccess';
import { useSelector } from 'react-redux';
import { setBigNumFees, setError, setNFTList, setNFTsToWhitelist, setTxnHash, setTransferLoaderModal, setTransactionStep } from "../store/reducers/generalSlice"
import { useDispatch } from 'react-redux';
import { getFactory, getNFTS, handleChainFactory, parseNFTS, setClaimablesAlgorand, setNFTS } from "../wallet/helpers"
import Comment from "../components/innercomponents/Comment"
import{ ChainData, getOldFactory } from '../wallet/oldHelper'
import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
import {chainsConfig} from './values'
import { algoConnector } from "../wallet/connectors"
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { useWeb3React } from '@web3-react/core';




function NFTaccount() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState()
    const from = useSelector(state => state.general.from.key)
    const algorandAccount = useSelector(s => s.general.algorandAccount)
    const to = useSelector(state => state.general.to.key)
    const isToEVM = useSelector(state => state.general.to).type === 'EVM'
    const NFTListView = useSelector(state => state.general.NFTListView)
    const nfts = useSelector(state => state.general.NFTList)
    const tronWallet = useSelector(state => state.general.tronWallet)
    const account = useSelector(state => state.general.account)
    const tezosAccount = useSelector(state => state.general.tezosAccount)
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
                console.log(error.message);
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
       const hard = "0x4E3093E0681F3F0e98eFd7eC1A9a01500Efd6DCa"
        try {
            // const w = algorandAccount ? algorandAccount : tronWallet ? tronWallet : elrondAccount ? elrondAccount :  
            const w = tezosAccount || algorandAccount || tronWallet || elrondAccount || account
            await setNFTS(w, from)
            } catch (error) {  
                dispatch(setError(error.message))
            }
    }
    
    async function estimate () {
        // debugger 
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
            : account;

            // const fact = from === 'Algorand' || from === 'Elrond' ? await getFactory() : await getOldFactory()
            // if(from === 'Algorand' || from === 'Elrond') {
            //      fact = await getFactory()
            // }
            // else{
            //      fact = await getFactory()
            // }
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
            const bigNum = fee.multipliedBy(1.1).integerValue().toString(10)
            dispatch(setBigNumFees(bigNum))
            const fees = await Web3Utils.fromWei(bigNum, "ether")
            setFees(fees)
        } catch (error) {
          console.log(error);
        //   dispatch(setError(error))
        }
    }
                                
    // const getSign = async () => {
    //     // debugger
    //     let signer
    //     const provider = new ethers.providers.Web3Provider(WCProvider.walletConnectProvider || window.ethereum);
    //     try {
    //         if(from === 'Algorand') {
    //             signer = await getAlgorandWalletSigner()
    //         }
    //         else if(from === 'Elrond') {
    //             if(maiarProvider) signer = maiarProvider
    //             else signer = ExtensionProvider.getInstance()
    //         }
    //         else if(from === 'Tron') {
    //             signer = window.tronLink
    //         }
    //         else {
    //             signer = provider.getSigner(account)
    //         }
    //     } catch (error) {
    //         console.error();
    //     }
    //     return signer
    // }
    
    const sendEach = async (nft, index) => {
        // debugger
        if(index === 0) dispatch(setTransactionStep(1))
        const factory = await getFactory()
        const toChain = await factory.inner(chainsConfig[to].Chain)
        const fromChain = await factory.inner(chainsConfig[from].Chain)
        const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : ''
        // const signer =  await getSign()
        const signer = from === 'Algorand' ? await getAlgorandWalletSigner() :
        from === 'Elrond' ? maiarProvider ? maiarProvider : ExtensionProvider.getInstance() :
        from === 'Tron' ? window.tronWeb 
        : provider.getSigner(account)
        
        try {
            let result
            if(from === 'Tron') {
                const fact = await getOldFactory()
                const toChains = await fact.inner(chainsConfig[to].Chain)
                const fromChainT = await fact.inner(chainsConfig[from].Chain)
                 result = await fact.transferNft(
                    fromChainT, // The Source Chain.
                    toChains,   // The Destination Chain.
                    nft,       // Or the NFT you have chosen.
                    undefined,    // Or tronlink or maiar.
                    receiver,   // The address who you are transferring the NFT to.
                    bigNumberFees
                )
                dispatch(dispatch(setTransferLoaderModal(false)))
                setLoading(false)
                dispatch(setTxnHash({txn: result, nft}))
            } 
            else {
                try {
                    result = await factory.transferNft(
                        fromChain, // The Source Chain.
                        toChain,   // The Destination Chain.
                        nft,       // Or the NFT you have chosen.
                        signer,    // Or tronlink or maiar.
                        receiver,   // The address who you are transferring the NFT to.
                        bigNumberFees
                    )
                    dispatch(dispatch(setTransferLoaderModal(false)))
                    setLoading(false)
                    dispatch(setTxnHash({txn: result, nft}))
                } catch(error) {
                    dispatch(setTxnHash({txn: "failed", nft}))
                    dispatch(dispatch(setTransferLoaderModal(false)))
                    setLoading(false)
                    if(error.data){
                        if(error.data.message.includes("not whitelisted")){
                            dispatch(setNFTsToWhitelist({
                                url: nft.image,
                                name: nft.name
                            }))
                        }
                    }
                    else if(error.message?.includes('non-origin chain')){
                        dispatch(setError("Trying to send wrapped nft to non-origin chain!!!"))
                        setLoading(false)
                    }
                }
            }
            if(to === 'Algorand') {
                await setClaimablesAlgorand(algorandAccount)
            }
        } catch (error) {
            dispatch(setTxnHash({txn: "failed", nft}))
            setLoading(false)
            dispatch(dispatch(setTransferLoaderModal(false)))
            console.log(error);
            if(error.data){
                if(error.data.message.includes("not whitelisted")){
                    dispatch(setNFTsToWhitelist({
                        url: nft.image,
                        name: nft.name
                    }))
                }
            }
            else if(error.message?.includes('non-origin chain')){
                dispatch(setError("Trying to send wrapped nft to non-origin chain!!!"))
                setLoading(false)
            }
        }
    }
    const sendAllNFTs = () => {
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
                                { nfts ? 
                                    <>
                                        <SelectedNFT />
                                        <Approval />
                                        <SendFees fees={fees * selectedNFTList?.length}/>
                                        <div onClick={sendAllNFTs} className={approved && receiver && !loading ? 'nftSendBtn' : 'nftSendBtn disabled'}  >
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
