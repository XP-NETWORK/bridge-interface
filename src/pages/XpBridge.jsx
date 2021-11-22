import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NFTaccount from '../components/NFTaccount';
import NftSelect from '../components/NftSelect';
import NftSlider from '../components/NftSlider';
import NFTsuccess from '../components/NFTsuccess';
import NFTworng from '../components/NFTworng';

function XpBridge() {

    useEffect(() => {

    }, [])

    const step = useSelector(state => state.general.step)
    return (
        <div className="nftContainer">
            { step === 1 ? <><NftSelect/><NftSlider/></> : "" }
            { step === 2 ? <NFTaccount/>  : '' }
            <NFTworng />
            {/* { step === 3 ? <NFTsuccess/> : '' } */}
        </div>
    )
}

export default XpBridge
