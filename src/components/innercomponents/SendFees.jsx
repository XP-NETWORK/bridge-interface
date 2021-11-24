import React from 'react'
import { useSelector } from 'react-redux';

function SendFees() {
    const fees = useSelector(state => state.general.fees)
    return (
        <div className="nftFees">
            Fees <span>{fees.toFixed(5)} BNB</span>
        </div>
    )
}

export default SendFees;
