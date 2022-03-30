import React from 'react'
import { useDispatch } from 'react-redux';
import NONFT from '../../assets/img/noNft.svg';
import { setReset } from '../../store/reducers/generalSlice';

function NoneNFT() {

    const dispatch = useDispatch()
    return (
        <div className="nonftContainer">
            <div className="nonftAcc">
                <img src={NONFT} alt="No NFT" className="nonft" />
                <h2>Oops...</h2>
                <span>There is nothing here.</span>
                <a onClick={() => dispatch(setReset())} className="switching">Switch Network</a>
            </div>
        </div>
    )
}

export default NoneNFT;
