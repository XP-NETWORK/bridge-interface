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

    const step = useSelector(state => state.general.step)
    return (
        <div className="nftContainer">
            { step === 1 ? <><NftSelect/><NftSlider/></> : "" }
            { step === 2 ? <NFTaccount />  : '' }
            {/* <NFTOnaccount /> */}
            {/* <NFTworng /> */}
            <Alert />
            <NFTsuccess/>
            {/* <Transactionhistory />     // !! TO DO */}
        </div>
    )
}

export default XpBridge
