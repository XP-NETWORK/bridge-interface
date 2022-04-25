import React from 'react'
import Sync2 from "../../assets/img/wallet/Sync2_.svg"

export default function VeChainWallet() {
  return (
    <li className="wllListItem" data-wallet="Sync2">
        <img src={Sync2} alt="Sync2" />
        <p>Sync2</p>
    </li>
  )
}
