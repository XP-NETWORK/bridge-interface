import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { CHAIN_INFO } from '../values'
import { chainsConfig } from '../values'
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { algoConnector } from "../../wallet/connectors"
import { getFactory,  setClaimablesAlgorand, checkIfOne1,  convertOne1, convert } from "../../wallet/helpers"
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TempleWallet } from "@temple-wallet/dapp";
import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
import { ethers } from "ethers";
import { setError, setNFTsToWhitelist, setTransferLoaderModal, setTxnHash } from '../../store/reducers/generalSlice'

export default function ButtonToTransfer() {
    const kukaiWallet = useSelector(state => state.general.kukaiWallet)
    const receiver = useSelector(state => state.general.receiver)
    const receiverAddress = convert(receiver)
    console.log("🚀 ~ file: ButtonToTransfer.jsx ~ line 19 ~ ButtonToTransfer ~ receiverAddress", receiverAddress)
    const approved = useSelector(state => state.general.approved)
    const to = useSelector(state => state.general.to.key)
    const from = useSelector(state => state.general.from.key)
    const bigNumberFees = useSelector(state => state.general.bigNumberFees)
    const [loading, setLoading] = useState()
    const dispatch = useDispatch()
    const algorandWallet = useSelector(state => state.general.AlgorandWallet)
    const MyAlgo = useSelector(state => state.general.MyAlgo)
    const algorandAccount = useSelector(s => s.general.algorandAccount)
    const maiarProvider = useSelector(state => state.general.maiarProvider)
    const account = useSelector(state => state.general.account)
    const selectedNFTList = useSelector(state => state.general.selectedNFTList)

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
        // debugger
        const signer = await getSigner()
        const toNonce = CHAIN_INFO[to].nonce
        const fromNonce = CHAIN_INFO[from].nonce
        const nftSmartContract = nft.native.contract
        let factory 
        let toChain 
        let fromChain
        let result
        try {  
            if(from === "Tron"){
                factory = await getFactory()
                const contract = nftSmartContract.toLowerCase()
                const mintWidth = await factory.getVerifiedContracts(contract, toNonce, fromNonce)
                toChain = await factory.inner(chainsConfig[to].Chain)
                fromChain = await factory.inner(chainsConfig[from].Chain)
                result = await factory.transferNft(
                    fromChain, 
                    toChain,  
                    nft,   
                    undefined,   
                    receiverAddress,  
                    bigNumberFees,
                    mintWidth?.length ? mintWidth[0] : undefined
                )
                dispatch(dispatch(setTransferLoaderModal(false)))
                setLoading(false)
                dispatch(setTxnHash({txn: result, nft}))
            }
            else{
                factory = await getFactory()
                const contract = nftSmartContract.toLowerCase()
                const mintWidth = await factory.getVerifiedContracts(contract, toNonce, fromNonce)
                toChain = await factory.inner(chainsConfig[to].Chain)
                fromChain = await factory.inner(chainsConfig[from].Chain)
                result = await factory.transferNft(
                    fromChain, 
                    toChain,   
                    nft,      
                    signer,   
                    receiverAddress,  
                    bigNumberFees,
                    mintWidth?.length ? mintWidth[0] : undefined
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
        if(!loading && approved) {
            setLoading(true)
            dispatch(setTransferLoaderModal(true))
            selectedNFTList.forEach( (nft, index) => {
                sendEach(nft, index)
            })
        }
    }


  return (
    <div onClick={sendAllNFTs} className={approved && receiver && !loading ? 'nftSendBtn' : 'nftSendBtn disabled'}  >
        <a  className="themBtn">
            {loading ? 'Processing' : 'Send' }
        </a>
    </div>
  )
}
