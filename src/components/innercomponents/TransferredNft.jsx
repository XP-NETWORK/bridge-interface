import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { injected, algoConnector } from "../../wallet/connectors"
import Failed from "../../assets/img/icons/Failed.svg"

export default function TransferredNft({ nft }) {
    const { image, txn, name } = nft
    const { chainId, account, activate, library } = useWeb3React();
    const [txnStatus, setTxnStatus] = useState()
    const [checkStatusInterval, setCheckStatusInterval] = useState()

    const checkTransactionStatus = async () => {
        debugger
        try {
            const status = await library.eth.getTransactionReceipt(txn.hash)
            if(status) setTxnStatus(status)
            
        } catch (error) {
            
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
