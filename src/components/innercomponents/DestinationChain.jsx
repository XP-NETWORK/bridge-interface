import React from 'react'
import { useSelector } from 'react-redux';
import Avalanche from '../../assets/img/chain/Avalanche.svg';
import RedClose from '../../assets/img/icons/RedClose.svg';

function DestinationChain() {

    const from = useSelector(state => state.general.from)

    return (
        <div className="destiAddress">
            <div className="desChain">
                Destination Chain <span><img src={from.image.src} alt="" /> {from.key}</span>
            </div>
            <div className="desAddress">
                <input type="text" placeholder="Paste destination address" />
                <span className="invalid"><img src={RedClose} alt="Close" /> Invalid address</span>
            </div>
        </div>
    )
}

export default DestinationChain;
