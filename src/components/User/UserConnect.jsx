import { useWeb3React } from '@web3-react/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setAccountModal, setWalletsModal } from '../../store/reducers/generalSlice';
import Identicon from './Identicon';

export default function UserConnect({desktop}) {
    const dispatch = useDispatch()
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const tezosAccount = useSelector(state => state.general.tezosAccount)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const tronWallet = useSelector(state => state.general.tronWallet)
    const { account } = useWeb3React();
    const walletAccount = account || elrondAccount || tezosAccount || algorandAccount || tronWallet
    const location = useLocation()

    const handleConnect = () => {
        if(!walletAccount){
        dispatch(setWalletsModal(true))
        }
        else if(walletAccount && location.pathname === "/account")dispatch(setAccountModal(true))
    }

  return (
    <div onClick={handleConnect} className={desktop ? 'navbar-connect' : 'navbar-connect navbar-connect-mob'}>
    {walletAccount ? `${walletAccount.substring(0, window.innerWidth <= 600 ? 6 : 16)}...${walletAccount.substring(walletAccount.length - 2)}` : "Connect Wallet"}
    {walletAccount && <Identicon account={walletAccount} />}
    </div>
  )
}
