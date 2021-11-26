import React from 'react'



export default function Chain({ filteredChain, chainSelectHandler, text, image, key }) {
    return (
        <li onClick={() => chainSelectHandler(filteredChain)} className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
            <div className="modalSelectOptionsText">
                {text}
            </div>
        </li>
    )
}
