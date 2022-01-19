import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { chains, CHAIN_INFO }from '../../components/values'
import "./Chain.css"


export default function Chain({ filteredChain, chainSelectHandler, text, image, key, coming, bridge_live, newChain }) {

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
        // style={ coming || !checkIfLive(text) ? OFF : {}}
        <li  onClick={() => chainSelectHandler(filteredChain)} className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
            <div className="modalSelectOptionsText">
                {text}
            { coming ? <div className="coming-chain">Coming soon</div> : ''}
            { (!checkIfLive(text) && !coming) &&  <div className="chain__off">Offline</div>}
            { newChain && <div className='new-chain'>New</div> }
            </div>
        </li>
    )
}
