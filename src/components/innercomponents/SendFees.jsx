import React from 'react'
import { useSelector } from 'react-redux';
import { chainsConfig } from '../values';

function SendFees({ fees }) {

    const from = useSelector(state => state.general.from)
    const config = chainsConfig[from?.text]
    return (
        <div className="nftFees">
            Fees <span>{fees && fees > 0 ? fees.toFixed(5) : '0'} {config?.token}</span>
        </div>
    )
}

export default SendFees;
