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




export default function TransferredNft({ nft }) {
    const { image, txn, name } = nft
    const { chainId, account, activate, library } = useWeb3React();
    const [txnStatus, setTxnStatus] = useState()
    const [checkStatusInterval, setCheckStatusInterval] = useState()
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const myAlgo = useSelector(state => state.general.myAlgo)
    const algoSigner = useSelector(state => state.general.algoSigner)
    const dispatch = useDispatch()


    // const getTX = () => {
    //     let ntx
    //     // debugger
    //     // const tx = txnHashArr && txnHashArr.length > 0 ? typeof txnHashArr[currentTX] === 'object' ? txnHashArr[currentTX].hash.toString() : txnHashArr[currentTX] : ''
        
    //     if( txnHashArr && txnHashArr.length > 0 ){
    //         if(typeof txnHashArr === 'object' && !Array.isArray(txnHashArr)){
    //             return txnHashArr[0].hash.toString()
    //         }
    //         else if(Array.isArray(txnHashArr)){
    //             if( typeof txnHashArr[0] === "object"){
    //                 return txnHashArr[0].hash.toString()
    //             }
    //             else{
    //                 return txnHashArr[0].toString()
    //             }
    //         }
    //         else{
    //             return txnHashArr
    //         }
    //     }
    //     else{
    //         return "wrong tx"
    //     }
    // }

    const checkEVMStatus = async (str) => {
        try {
            const status = await library.eth.getTransactionReceipt(txn.hash)
            if(status) return true
            
        } catch (error) {
            console.error(error)
        }
    }
    const claim = () => {
        dispatch(claimAlgorandPopup(nft))
    }

    const checkTronStatus = async (str) => {
        try {
            const status = await window.tronWeb.trx.getConfirmedTransaction(txn.hash)
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
        if(myAlgo){
            try {
                const status = await algosdk.waitForConfirmation(myAlgoConnect, str, 4)
                if(status) return true
            } catch (error) {
                console.error(error)
            }
        }
        else{

        }
        const myAlgoConnect = new MyAlgoConnect();
    }

    const checkTransactionStatus = async () => {
        // debugger
        switch (from.type) {
            case "EVM":
                setTxnStatus(checkEVMStatus(txn?.hash))
                break;
            case "Tron":
                setTxnStatus(checkTronStatus(txn?.hash))
                break;
            case "Elrond":
                setTxnStatus(checkElrondStatus(txn?.hash))
                break;
            case "Algorand":
                setTxnStatus(checkAlgoStatus(txn?.harsh))
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if(typeof txn === "object") checkTransactionStatus()
        const s = setInterval(() => checkTransactionStatus(), 1000 * 30);
        setCheckStatusInterval(s)
        if(txnStatus) clearInterval(s);
        return () => clearInterval(s);
    }, [])

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
                            {/* <a href={`${chainsConfig[from.key].tx + getTX()}`} target="_blank" className="success-button view-txn-btn">View Txn</a> */}
                            <a href={`${chainsConfig[from.key].tx + txn?.hash}`} target="_blank" className="success-button view-txn-btn">View Txn</a>
                            { to.text === "Algorand" && 
                                <div onClick={claim} className="success-button claim-btn">Claim</div>
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
