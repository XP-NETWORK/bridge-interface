import React from 'react'



export default function Chain({ filteredChain, chainSelectHandler, text, image, key, coming, bridge_live }) {
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    return (
        <li style={ coming || !bridge_live ? OFF : {}} onClick={() => chainSelectHandler(filteredChain)} className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
            <div className="modalSelectOptionsText">
                {text}
            { coming ? <div className="coming__chain">coming soon</div> : ''}
            { (!bridge_live && !coming) &&  <div className="chain__off">Offline</div>}
            </div>
        </li>
    )
}
