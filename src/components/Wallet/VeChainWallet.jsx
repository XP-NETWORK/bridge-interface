import React from 'react'
import Sync2 from "../../assets/img/wallet/Sync2_.svg"
import { useDispatch, useSelector } from "react-redux";
import { connectSync2 } from './ConnectWalletHelper';

export default function VeChainWallet() {

  const getStyle = () => {
    if(!from){
      return {}
    }
    else if(from && from.type === "VeChain"){
      return {}
    }
    else return {}
  }

  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector(state => state.general.from);
  const to = useSelector(state => state.general.to);
  const testnet = useSelector(state => state.general.testNet);
  const dispatch = useDispatch()

  return (
    <li style={getStyle()} onClick={() => connectSync2(testnet)} className="wllListItem" data-wallet="Sync2">
        <img src={Sync2} alt="Sync2" />
        <p>Sync2</p>
    </li>
  )
}
