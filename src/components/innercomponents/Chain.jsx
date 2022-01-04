import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { chains, CHAIN_INFO }from '../../components/values'



export default function Chain({ filteredChain, chainSelectHandler, text, image, key, coming, bridge_live }) {

    const validatorsInfo = useSelector(state => state.general.validatorsInfo)

    const checkIfLive = chain => {
        const nonce = CHAIN_INFO[chain]?.nonce
        if(validatorsInfo){
            return validatorsInfo[nonce]?.bridge_alive
        }
    }

    useEffect(() => {  }, [validatorsInfo])

    const OFF = { opacity: 0.6, pointerEvents: "none" };
    return (
        <li style={ coming || !checkIfLive(text) ? OFF : {}} onClick={() => chainSelectHandler(filteredChain)} className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
            <div className="modalSelectOptionsText">
                {text}
            { coming ? <div className="coming__chain">coming soon</div> : ''}
            { (!checkIfLive(text) && !coming) &&  <div className="chain__off">Offline</div>}
            </div>
        </li>
    )
}
