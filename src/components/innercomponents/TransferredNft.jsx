import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { injected, algoConnector } from "../../wallet/connectors"
import Failed from "../../assets/img/icons/Failed.svg"
import { useSelector } from 'react-redux';
import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
import algosdk from "algosdk";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { useDispatch } from 'react-redux';
import { claimAlgorandPopup } from '../../store/reducers/generalSlice';
import { chainsConfig } from '../values';
import { setClaimablesAlgorand, getFactory,  setNFTS } from "../../wallet/helpers"





export default function TransferredNft({ nft }) {
    const { image, txn, name, native } = nft
    const { library } = useWeb3React();
    const [txnStatus, setTxnStatus] = useState()
    console.log("txnStatus: ", txnStatus);
    const [checkStatusInterval, setCheckStatusInterval] = useState()
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const myAlgo = useSelector(state => state.general.MyAlgo)
    const algoSigner = useSelector(state => state.general.algoSigner)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const algorandWallet = useSelector(state => state.general.algorandWallet)
    const MyAlgo = useSelector(state => state.general.MyAlgo)
    const dispatch = useDispatch()
    const OFF = { opacity: 0.6, pointerEvents: 'none' }

    const checkIfAlgoOptIn = async () => {
        try {
            const factory = await getFactory()
            const algorand = await factory.inner(15)
            const isOpted = await algorand.isOptIn(algorandAccount, native.nftId)
            return isOpted ? true : false
        } catch (error) {
            console.error(error);
        }
    }

    const checkEVMStatus = async (str) => {
        // debugger
        setCheckStatusInterval('')
        return true
        // TODO transaction status
        // const { hash } = str
        // try {
        //     const status = await library.eth.getTransactionReceipt(hash)
        //     .then(status =>{
        //         if(status){
        //             setCheckStatusInterval('')
        //             return true
        //         }})
            
        // } catch (error) {
        //     console.error(error)
        // }
    }
    const claim = () => {
        dispatch(claimAlgorandPopup(nft))
    }

    const checkTronStatus = async (str) => {
        try {
            const status = await window.tronWeb.trx.getConfirmedTransaction(str)
            if(status) return true
        } catch (error) {
            console.error(error)
        }
    }

    const checkElrondStatus = async (str) => {
        const provider = ExtensionProvider.getInstance()
        try {
            const status = await provider.getTransaction(str)
            if(status) return true
        } catch (error) {
            console.error(error)
        }
    }

    const checkAlgoStatus = async (str) =>{
        // debugger
        const myAlgoConnect = new MyAlgoConnect();
        // console.log("check algorand txn: ", str);
        setCheckStatusInterval('')
        return true
        // TODO transaction status
        // if(myAlgo){
        //     try {
        //         console.log("myAlgoConnect: ", myAlgoConnect);
        //         const status = await algosdk.waitForConfirmation(myAlgoConnect, str, 4)
        //         console.log("algo tx status: ", status);
        //         if(status){
        //             setCheckStatusInterval('')
        //             return true
        //         }
        //     } catch (error) {
        //         console.error(error)
        //     }
        // }
        // else{

        // }

    }

    const checkTransactionStatus = async () => {
        // debugger
        let res
        switch (from.type) {
            case "EVM":
                res = await checkEVMStatus(txn)
                setTxnStatus(res)
                break;
            case "Tron":
                res = await checkTronStatus(txn)
                setTxnStatus(res)
                break;
            case "Elrond":
                res = await checkElrondStatus(txn)
                setTxnStatus(res)
                break;
            case "Algorand":
                res = await checkAlgoStatus(txn)
                setTxnStatus(res)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        // debugger
        if(txn) checkTransactionStatus()
        const s = setInterval(() => checkTransactionStatus(), 1000 * 3);
        setCheckStatusInterval(s)
        if(txnStatus) clearInterval(s);
        return () => clearInterval(s);
    }, [])

    useEffect(async() => {
        if(to.key === 'Algorand') {
            const claimables = await setClaimablesAlgorand(algorandAccount, true)
        }
    },[])

    return (
        <div className='success-nft-info__wrapper'>
            { txn ? 
                <div className="transferred-nft">
                    <div className='nft-image-name'>
                        <img src={image} alt={name} />
                        <div>{name}</div>
                    </div>
                    <div className="txn-status">
                     { !txnStatus ? 
                        <div className='txn-status-pending'>Pending</div> 
                        : 
                        <div className="success-buttons">
                            <a href={`${chainsConfig[from.key].tx + txn}`} target="_blank" className="success-button view-txn-btn">View Txn</a>
                            { to.text === "Algorand" && 
                                <div onClick={claim} style={checkIfAlgoOptIn() ? OFF : {}} className="success-button claim-btn">{ checkIfAlgoOptIn() ? 'Claimed' : "Claim"}</div>
                            }
                        </div> 
                     }    
                    </div>
                </div> 
                : 
                <div className="transferred-nft">
                    <div className='transferred-nft-name'>
                        <img src={image} alt={name} />
                        <div className='transferred-nft-name__txt'>{nft.name}</div>
                    </div>
                    <div className="txn-failed">
                        <img src={Failed} alt="" />
                        Failed
                    </div>
                </div>
            }
        </div>
    )
}
