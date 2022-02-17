import React from 'react'
import { connectTempleWallet, connectBeacon } from "../ConnectWalletHelper"

export default function TezosWallet({ wallet }) {
  return wallet === "TempleWalllet" ? <li onClick={connectTempleWallet} style={ (from?.text === "Tezos" && window.innerWidth > 600 ) ? {} : OFF} className="wllListItem"><img style={{width: "28px"}} src={Temple} alt="Temple Icon" /> Temple Wallet</li>
  : wallet === "Beacon" ? <></>
}
