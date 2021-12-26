import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NFTaccount from '../components/NFTaccount';
import NftSelect from '../components/NftSelect';
import NftSlider from '../components/NftSlider';
import NFTsuccess from '../components/NFTsuccess';
import NFTOnaccount from "../components/NFTOnaccount"
import NFTworng from '../components/NFTworng';
import Transactionhistory from '../components/Transactionhistory';
import AccountModal from '../components/AccountModal';
import { Alert } from 'react-bootstrap';
import ApproveLoader from '../components/innercomponents/ApproveLoader';

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
            {/* <NFTOnaccount /> */}
            {/* <NFTworng /> */}
            <Alert />
            <NFTsuccess/>
        </div>
    )
}

export default XpBridge
