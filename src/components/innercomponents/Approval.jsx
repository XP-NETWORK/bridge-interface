import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InfLith from '../../assets/img/icons/infoLifht.svg';
import { ChainFactoryConfigs,    ChainFactory } from "xp.network/dist";
import {Chain, Config} from 'xp.network/dist/consts';
import { ethers } from "ethers";
import { updateApprovedNFTs, setApproved, setApproveLoader, setError } from '../../store/reducers/generalSlice';
import { isEqual } from '../helpers';
import { getFactory, handleChainFactory, isALLNFTsApproved, } from '../../wallet/helpers';
import { getOldFactory } from '../../wallet/oldHelper';
import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
import { algoConnector } from "../../wallet/connectors"


const TronWeb = require('tronweb')
function Approval(props) {
    
    const dispatch = useDispatch()
    const [finishedApproving, setFinishedApproving] = useState([])
    const [approvedLoading, setApprovedLoading] = useState()
    const from = useSelector(state => state.general.from)
    const account = useSelector(state => state.general.account)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const selectedNFTList = useSelector(state => state.general.selectedNFTList)
    const approvedNFTList = useSelector(state => state.general.approvedNFTList)
    const approved = useSelector(state => state.general.approved)
    const receiver = useSelector(state => state.general.receiver)
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const WCProvider = useSelector(state => state.general.WCProvider)
    const onMaiar = useSelector(state => state.general.onMaiar)
    const maiarProvider = useSelector(state => state.general.maiarProvider)
    const bigNumberFees = useSelector(state => state.general.bigNumberFees)
    const algorandWallet = useSelector(state => state.general.AlgorandWallet)

    

    const getAlgorandWalletSigner = async () => {
        debugger
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
        else{
            const signer = {
                address: algorandAccount,
                algoSigner: window.AlgoSigner,
                ledger: "MainNet"
            }
            return signer
        }
    }

    const approveEach = async (nft, signer, chain, index) => {
        debugger
        const arr = new Array(index + 1).fill(0)
        const factory = await getFactory()
            if(from.type !== "Elrond" && from.type !== 'Algorand'){
                try {
                    const { tokenId, contract, chainId } = nft.native
                    const isInApprovedNFTs = approvedNFTList.filter(n => n.native.tokenId === tokenId && n.native.contract === contract && chainId === n.native.chainId )[0]
                    if(!isInApprovedNFTs) {
                        try {
                            
                            const ap = await chain.approveForMinter(nft, signer);
                            dispatch(updateApprovedNFTs(nft))
                            setFinishedApproving(arr)
                        } catch(err) {
                            console.log(arr, err)
                            setFinishedApproving(arr)
                            dispatch(setError(err.message))
                        }
                    }
                } catch (error) {
                    setFinishedApproving(arr)
                    dispatch(setError(error))
                    if(error.data){
                      console.log(error.data.message);
                    }
                    else console.log(error); 
                    // dispatch(setApproved(false))
                    console.log(error);
                }
            }
            else if(from.type === 'Algorand') {
                const c = await factory.inner(15)
                const signer = await getAlgorandWalletSigner()
                try {
                    const approv = await c.preTransfer(signer, nft, bigNumberFees)
                } catch (error) {
                    console.log(error);
                }
                dispatch(updateApprovedNFTs(nft))
                setFinishedApproving(arr)
            }
            else{
                try {

                    const factory = await getFactory()
                    const chain = await factory.inner(Chain.ELROND)
                    console.log(chain, 'hel1234lo')
                    const signer = maiarProvider ? maiarProvider : ExtensionProvider.getInstance()
                    const swap = await chain.preTransfer(signer, nft, bigNumberFees)
                
                    dispatch(updateApprovedNFTs(nft))
                    setFinishedApproving(arr)
                } catch (error) {
                    setFinishedApproving(arr)
                    dispatch(setError(error))
                    if(error.data){
                      console.log(error.data.message);
                    }
                    else console.log(error); 
                    console.log(error)
                }
            }
    }

    
    // Since approveForMinter returns a Promise it's a good idea to await it which requires an async function
    const approveAllNFTs = async () => {
        // debugger
        if(!approvedLoading) {
                dispatch(setApproveLoader(true))
                setApprovedLoading(true)
                setFinishedApproving([])
                console.log("provider: ", window.ethereum || WCProvider);
            if(from.type === "EVM"){
                const provider = new ethers.providers.Web3Provider(WCProvider || window.ethereum);
                const signer = provider.getSigner(account)
                const chain = await handleChainFactory(from.key)
                selectedNFTList.forEach((nft, index) => {
                    approveEach(nft, signer, chain, index)
                })
            } else if (from.type === 'Tron') {
                setFinishedApproving(selectedNFTList)
                selectedNFTList.forEach((nft, index) => {
                    dispatch(updateApprovedNFTs(nft))
                })
            }
            else {
                selectedNFTList.forEach((nft, index) => {
                    approveEach(nft, undefined, undefined, index)
                })
            }
        }

    };
    // sdsdfsddsfsdf
    useEffect(() => {
        if(finishedApproving.length === selectedNFTList.length && approvedLoading) {
            setApprovedLoading(false)
            dispatch(setApproveLoader(false))
            setFinishedApproving([])
        }
        
        if(selectedNFTList.length > 0) {
            console.log("BOOM");
            dispatch(setApproved(isALLNFTsApproved()))
            
        }
        else {
            dispatch(setApproved(false))
            dispatch(setApproveLoader(false))
        }
    },[selectedNFTList, approvedNFTList, finishedApproving])

    return (
        <div className="approValBox">
            <div className="approvTop">
                Approval
                <div className="appInf">
                    <span className="infText">
                        We'd like to make sure you really want to send the NFTs and pay the associated fees.
                    </span>
                    <img src={InfLith} alt="Inf" />
                </div>
            </div>
            <div 
                style={
                    selectedNFTList.length 
                    ? approvedLoading ? {opacity: 0.6, pointerEvents: 'none'} : {} 
                    : OFF
                } 
                className="approveBtn"
            >
                Approve all NFTs
                <div className="approveBtn">
                    <input checked={approved} type="checkbox" id="approveCheck" />
                    <label style={!receiver ? {pointerEvents: "none", opacity: "0.6"} : approved ? {pointerEvents: "none"} : {}} onClick={approveAllNFTs} htmlFor="approveCheck">
                        <span className="checkCircle"></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Approval;
