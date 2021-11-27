import React from 'react'



export default function Chain({ filteredChain, chainSelectHandler, text, image, key, coming }) {
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    return (
        <li style={ coming ? OFF : {}} onClick={() => chainSelectHandler(filteredChain)} className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
            <div className="modalSelectOptionsText">
                {text}
            </div>
        </li>
    )
}
