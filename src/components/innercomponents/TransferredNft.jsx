import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { injected, algoConnector } from "../../wallet/connectors"
import Failed from "../../assets/img/icons/Failed.svg"
import { useSelector } from 'react-redux';
import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
import algosdk from "algosdk";
import MyAlgoConnect from '@randlabs/myalgo-connect';



export default function TransferredNft({ nft }) {
    const { image, txn, name } = nft
    const { chainId, account, activate, library } = useWeb3React();
    const [txnStatus, setTxnStatus] = useState()
    const [checkStatusInterval, setCheckStatusInterval] = useState()
    const from = useSelector(state => state.general.from)
    const myAlgo = useSelector(state => state.general.myAlgo)
    const algoSigner = useSelector(state => state.general.algoSigner)

    const checkEVMStatus = async (str) => {
        try {
            const status = await library.eth.getTransactionReceipt(txn.hash)
            if(status) return true
            
        } catch (error) {
            console.error(error)
        }
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
        debugger
        switch (from.type) {
            case "EVM":
                setTxnStatus(checkEVMStatus(txn.hash))
                break;
            case "Tron":
                setTxnStatus(checkTronStatus(txn.hash))
                break;
            case "Elrond":
                setTxnStatus(checkElrondStatus(txn.hash))
                break;
            case "Algorand":
                setTxnStatus(checkAlgoStatus(txn.harsh))
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
            { typeof txn === "object" ? 
                <div className="transferred-nft">
                    <div className='nft-image-name'>
                        <img src={image} alt={name} />
                        <div>{name}</div>
                    </div>
                    <div className="txn-status">
                     { !txnStatus ? 
                        <div>Pending</div> 
                        : 
                        <div className="success-buttons">
                            <div className="success-button view-txn-btn">View Txn</div>
                            <div className="success-button claim-btn">Claim</div>
                        </div> 
                     }    
                    </div>
                </div> 
                : 
                <div className="transferred-nft">
                    <img src={image} alt={name} />
                    <div className="txn-failed">
                        <img src={Failed} alt="" />
                        Failed
                    </div>
                </div>
            }
        </div>
    )
}
