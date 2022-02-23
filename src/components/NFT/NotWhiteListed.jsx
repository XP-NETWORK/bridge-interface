import React from 'react'

export default function NotWhiteListed() {
  return (
    <div className="nft-box__container not-whitelisted">
        <div className="not-whitelisted__wrapper">
            <span className='not-whitelisted__text'>NFT is not Whitelisted</span>
            <a className='not-whitelisted__button' href='https://t.me/xp_network' target="_blank" rel="noreferrer">Tech support</a>
        </div>
    </div>
  )
}