import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setAccountModal, setFrom, setUnsupportedNetwork, setWalletsModal, } from '../../store/reducers/generalSlice';
import { setNFTS } from '../../wallet/helpers';
import { chains } from '../values';
import Identicon from './Identicon';

export default function UserConnect({desktop, mobile}) {
    const dispatch = useDispatch()
    const to = useSelector(state => state.general.to)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const tezosAccount = useSelector(state => state.general.tezosAccount)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const _account = useSelector(state => state.general.account)
    const innerWidth = useSelector(state => state.general.innerWidth)
    const tronWallet = useSelector(state => state.general.tronWallet)
    const WalletConnect = useSelector(state => state.general.WalletConnect)
    const { account, chainId, active } = useWeb3React();
    const testnet = useSelector(state => state.general.testNet)
    const walletAccount = account || elrondAccount || tezosAccount || algorandAccount || tronWallet || _account
    const location = useLocation()
  const txnHashArr = useSelector((state) => state.general.txnHashArr);


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
      // debugger
      if(testnet){
        return chains.find(chain => chain.tnChainId === chainId)
      }
      else{
        return chains.find( chain => chain.chainId === chainId)
      }
    }

    useEffect(() => {
      // debugger
      console.log("useEffect")
      const chainConnected = getChain()
      if(chainId && location.pathname.includes("/account")){
        if(testnet){
          if(!chainConnected?.testNet || !chains.some(chain => chain.tnCainId === chainId)){
            dispatch(setUnsupportedNetwork(true))
          }
          else if(chainId === to.tnChainId){
            dispatch(setUnsupportedNetwork(true))
          }
          else{
            dispatch(setUnsupportedNetwork(false))
            dispatch(setFrom(chainConnected))
            setNFTS(account, chainConnected.key)
          }
        }
        else{
          if(!chainConnected?.mainnet || !chains.some(chain => chain.chainId === chainId)){
            dispatch(setUnsupportedNetwork(true))
          }
          else if(chainId === to.chainId){
            dispatch(setUnsupportedNetwork(true))
          }
          else{
            dispatch(setUnsupportedNetwork(false))
            dispatch(setFrom(chainConnected))
            setNFTS(account, chainConnected.key)
          }
        }
      }

    }, [account, chainId])

  useEffect(() => {
    if(!account && WalletConnect){
      active !== undefined && window.location.reload()
    }
  }, [active])
  

  return (
    <div onClick={handleConnect} className={`${walletAccount? 'navbar-connect connected' : 'navbar-connect'} ${mobile? 'xmobile_only': 'xdesktop_only'}`} >
    {walletAccount ? getAccountString() : "Connect Wallet"}
    {walletAccount && <Identicon account={walletAccount} />}
    </div>
  )
}
