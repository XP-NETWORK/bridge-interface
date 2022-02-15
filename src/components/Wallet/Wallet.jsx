import React from 'react'

export default function Wallet( props ) {

    const { active, icon, connection, name } = props
    const OFF = { opacity: 0.6, pointerEvents: "none" };


  return (
    <li onClick={connection} style={ active ? {} : OFF } className="wllListItem">
        <img src={icon} alt="MetaMask Icon" /> {name}
    </li>
  )
}
