import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { claimAlgorandPopup } from '../../../store/reducers/generalSlice';
import { setClaimablesAlgorand, getFactory } from "../../../wallet/helpers"
import TxStatus from './TxStatus';

export default function TransferredNft({ nft }) {
    const { image, txn, name, native } = nft
    const to = useSelector(state => state.general.to)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const dispatch = useDispatch()
    const txnHashArr = useSelector(state => state.general.txnHashArr)
    const [txnStatus, setTxnStatus] = useState("pending")

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

    const claim = () => {
        dispatch(claimAlgorandPopup(nft))
    }

    const checkStatus = () => {
        // debugger
        for (const tx of txnHashArr) {
            if(nft.native.uri === tx.nftUri){
                if(txnStatus !== "Completed")
                setTxnStatus(tx?.status?.toLowerCase())
            }
        }
    }

    useEffect(() => {

        checkStatus()
    }, [txnHashArr])
    

    useEffect(async() => {
        if(to.key === 'Algorand') {
            const claimables = await setClaimablesAlgorand(algorandAccount, true)
        }
    },[])

    return (
        <div className='success-nft-info__wrapper'>
            <div className="transferred-nft">
                <div className='nft-image-name'>
                    <img src={image} alt={name} />
                    <div classNam="transferred-nft-name">{name}</div>
                </div>
                <TxStatus status={txn ? txnStatus : "failed"} />
            </div> 
        </div>
    )
}
