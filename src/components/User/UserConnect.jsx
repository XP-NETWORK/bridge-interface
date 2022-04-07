import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setAccountModal, setFrom, setReset, setWalletsModal, setWrongNetwork } from '../../store/reducers/generalSlice';
import { getAddEthereumChain } from '../../wallet/chains';
import { setNFTS } from '../../wallet/helpers';
import { CHAIN_INFO, TESTNET_CHAIN_INFO } from '../values';
import { chains, chainsConfig } from '../values';
import Identicon from './Identicon';

export default function UserConnect({desktop}) {
    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const tezosAccount = useSelector(state => state.general.tezosAccount)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const innerWidth = useSelector(state => state.general.innerWidth)
    const tronWallet = useSelector(state => state.general.tronWallet)
    const WalletConnect = useSelector(state => state.general.WalletConnect)
    const { account, chainId, active } = useWeb3React();
    const testnet = useSelector(state => state.general.testNet)
    const walletAccount = account || elrondAccount || tezosAccount || algorandAccount || tronWallet

    const handleConnect = () => {
        if(!walletAccount){
        dispatch(setWalletsModal(true))
        }
        else if(walletAccount)dispatch(setAccountModal(true))
    }

    const getAccountString = () => {
      if(innerWidth >= 425){
        return `${walletAccount.substring(0, 5)}...${walletAccount.substring(walletAccount.length - 4)}`
      }
      else if(innerWidth >= 375){
        return `${walletAccount.substring(0, 4)}...${walletAccount.substring(walletAccount.length - 4)}`
      }
      else if(innerWidth >= 320){
        return `${walletAccount.substring(0, 3)}...${walletAccount.substring(walletAccount.length - 4)}`
      }
    }

    const getChain = () => {
      return chains.find( chain => chain.chainId === chainId)
    }

    useEffect(() => {
      if(account && from && chainId){
        if(chainId && !testnet && chains.some(chain => chain.chainId === chainId)){
          dispatch(setWrongNetwork(false))
          const chain = getChain()
          setNFTS(account, chain.key)
          dispatch(setFrom(chain))
        }
        else if(from.type !== "EVM"){
          dispatch(setWrongNetwork(false))
        }
        else{
          dispatch(setWrongNetwork(true))
          console.log("setWrongNetwork eseEffect userConnect");
        }
      }
    }, [account, chainId])

  useEffect(() => {
    if(!account && WalletConnect){
      active !== undefined && window.location.reload()
    }
  }, [active])
  

  return (
    <div onClick={handleConnect} className={walletAccount? 'navbar-connect connected' : 'navbar-connect'}>
    {walletAccount ? getAccountString() : "Connect Wallet"}
    {walletAccount && <Identicon account={walletAccount} />}
    </div>
  )
}
