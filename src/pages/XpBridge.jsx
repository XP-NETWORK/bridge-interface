import React from 'react';
import { useSelector } from 'react-redux';
import NFTaccount from '../components/NFTaccount';
import NftSelect from '../components/NftSelect';
import NftSlider from '../components/NftSlider';

function XpBridge() {
    const step = useSelector(state => state.general.step)
    return (
        <div className="nftContainer">
            { step === 1 ? <><NftSelect/><NftSlider/></> : "" }
            {/* <NftSelect/> */}
            {/* <NftSlider/> */}
            {/* <NFTaccount /> */}
        </div>
    )
}

export default XpBridge
