import React from 'react'
import NONFT from '../../assets/img/noNft.svg';

function NoneNFT() {
    return (
        <div className="nonftContainer">
            <div className="nonftAcc">
                <img src={NONFT} alt="No NFT" className="nonft" />
                <h2>Oops...</h2>
                There is nothing here.
                <a href="#" className="switching">Switch Network</a>
            </div>
        </div>
    )
}

export default NoneNFT;
