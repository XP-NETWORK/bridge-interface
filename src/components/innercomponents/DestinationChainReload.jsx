import React from 'react'
import Avalanche from '../../assets/img/chain/Avalanche.svg';
import RedClose from '../../assets/img/icons/RedClose.svg';
import RelWhit from '../../assets/img/icons/RelWhit.svg';

function DestinationChainReload() {
    return (
        <div className="destiAddress">
            <div className="desChain">
                Destination Chain <span className="destiReload"><img src={Avalanche} alt="" /> Avalanche <img src={RelWhit} /></span>
            </div>
            <div className="desAddress">
                <input type="text" placeholder="Paste destination address" />
                <span className="invalid"><img src={RedClose} alt="Close" /> Invalid address</span>
            </div>
        </div>
    )
}

export default DestinationChainReload;
