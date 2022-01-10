import React from 'react'
import { useSelector } from 'react-redux';
import { chainsConfig } from '../values';

function SendFees({ fees }) {

    function getNumToFix(fees) {
        debugger
        let num = 1
        let str
        if(fees > 0 && fees){
            do {
                num++
                str = fees?.toFixed(num).toString()
            } while (str[str.length - 2] === "0");
        }
        return num
    }
    // getNumToFix(fees)
    const from = useSelector(state => state.general.from)
    const config = chainsConfig[from?.text]
    return (
        <div className="nftFees">
            Fees <span>{fees && fees > 0 ? fees?.toFixed(getNumToFix(fees)) : '0'} {config?.token}</span>
        </div>
    )
}

export default SendFees;
