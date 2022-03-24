import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setAccountModal, setWalletsModal } from '../../store/reducers/generalSlice';
import { setNFTS } from '../../wallet/helpers';
import Identicon from './Identicon';

export default function UserConnect({desktop}) {
    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const tezosAccount = useSelector(state => state.general.tezosAccount)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const innerWidth = useSelector(state => state.general.innerWidth)
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

    const getAccountString = () => {
      if(innerWidth >= 425){
        return `${walletAccount.substring(0, 18)}...${walletAccount.substring(walletAccount.length - 2)}`
      }
      else if(innerWidth >= 375){
        return `${walletAccount.substring(0, 12)}...${walletAccount.substring(walletAccount.length - 2)}`
      }
      else if(innerWidth >= 320){
        return `${walletAccount.substring(0, 6)}...${walletAccount.substring(walletAccount.length - 2)}`
      }
    }

    useEffect(() => {
      if(account && from){
        setNFTS(account, from.key)
      }
    }, [account])
    

  return (
    <div onClick={handleConnect} className={desktop ? 'navbar-connect' : 'navbar-connect navbar-connect-mob'}>
    {walletAccount ? getAccountString() : "Connect Wallet"}
    {walletAccount && <Identicon account={walletAccount} />}
    </div>
  )
}
