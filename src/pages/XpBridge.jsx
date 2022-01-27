import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NFTaccount from '../components/NFTaccount';
import NftSelect from '../components/NftSelect';
import NftSlider from '../components/NftSlider';
import NFTsuccess from '../components/NFTsuccess';
import Transactionhistory from '../components/Transactionhistory';
// import { Alert } from 'react-bootstrap';


function XpBridge() {
    useEffect(() => {
    }, [])
    const {widget} = useSelector(s => s.general)
    const step = useSelector(state => state.general.step)
    const algorandClaimables = useSelector(state => state.general.algorandClaimables)
    return (
        <div className="nftContainer">
            {algorandClaimables && algorandClaimables.length > 0 ? <Transactionhistory />  : ''}
            { step === 1 ? <><NftSelect/>{!widget ? <NftSlider/> : ''}</> : "" }
            { step === 2 ? <NFTaccount />  : '' }
            {/* <NFTworng /> */}
            {/* <Alert /> */}
            <NFTsuccess/>
        </div>
    )
}

export default XpBridge
