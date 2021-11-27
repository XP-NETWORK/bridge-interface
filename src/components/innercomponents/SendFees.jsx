import React from 'react'
import { useSelector } from 'react-redux';

function SendFees({ fees }) {

    const from = useSelector(state => state.general.from)

    return (
        <div className="nftFees">
            Fees <span>{fees && fees > 0 ? fees.toFixed(5) : '0'} {from?.text}</span>
        </div>
    )
}

export default SendFees;
