import React, { useEffect, useRef, useState } from 'react'
import NftSelect from '../assets/img/nftselect.svg';
import Close from '../assets/img/icons/close.svg';
import FileCopy from '../assets/img/icons/FileCopy.svg';
import CopyHover from '../assets/img/icons/CopyHover.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAccountModal, setReset } from '../store/reducers/generalSlice';
import { DetectOutsideClick } from "../components/helpers"
import {CopyToClipboard } from 'react-copy-to-clipboard';
import { CHAIN_INFO } from '../components/values';
import { getAddEthereumChain } from "../wallet/chains"
import copyTT from "../assets/img/icons/copytoclip.svg"
import copiedIcon from "../assets/img/icons/copiedtoclip.svg"

export default function AccountModal() {
    const dispatch = useDispatch()
    const account = useSelector(state => state.general.account)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const MetaMask = useSelector(state => state.general.MetaMask)
    const algorandWallet = useSelector(state => state.general.AlgorandWallet)
    const trustWallet = useSelector(state => state.general.trustWallet)
    const onMaiar = useSelector(state => state.general.onMaiar)
    const show = useSelector(state => state.general.accountModal)
    const [copyIconHover, setCopyIconHover] = useState()
    const [copied, setCopied] = useState()
    const from = useSelector(state => state.general.from)
    const tronWallet = useSelector(state => state.general.tronWallet)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const MyAlgo = useSelector(state => state.general.MyAlgo)
    const tronAccount = useSelector(state => state.general.tronWallet)
    const WalletConnect = useSelector(state => state.general.WalletConnect)
    const WCProvider = useSelector(state => state.general.WCProvider)
    const tronLink = useSelector(state => state.general.tronLink)

    // const step = useSelector(state => state.general.step)

    const handleClose = () => {
        dispatch(setAccountModal(false))
    }

    const copy = () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    const accountModal = useRef(null)

    function handleDisconnect(){
        dispatch(setReset())
    }

    async function switchNetwork (){
        const info = CHAIN_INFO[from?.key]
        const chainId = `0x${info.chainId.toString(16)}`;
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId }],
              })
        } catch (error) {
            console.log(error);
            try {
                const toHex = (num) => {
                    return '0x'+num.toString(16)
                }
                const chain = getAddEthereumChain()[parseInt(chainId).toString()]
                const params = {
                    chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
                    chainName: chain.name,
                    nativeCurrency: {
                      name: chain.nativeCurrency.name,
                      symbol: chain.nativeCurrency.symbol, // 2-6 characters long
                      decimals: chain.nativeCurrency.decimals,
                    },
                    rpcUrls: chain.rpc,
                    blockExplorerUrls: [ ((chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url) ? chain.explorers[0].url : chain.infoURL) ]
                  }
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [params, account],
                })
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    const connectedWith = () => {
     if(MetaMask) return 'MetaMask'
     else if(onMaiar) return "Maiar Wallet"
     else if(trustWallet) return "Trust Wallet"
     else if(algorandWallet) return 'Algorand Wallet'
     else if(MyAlgo) return "MyAlgo"
     else if(tronLink) return 'Tron Link'
     else if(WalletConnect) return `${WCProvider.walletConnectProvider.signer.connection.wc._peerMeta.name} (WalletConnect)`
    }

    DetectOutsideClick(accountModal, () => setTimeout(() => handleClose(), 100));

    return ( show ?
        <div ref={accountModal} className="accountBox" show={show} onHide={handleClose} >
            <div className="accountTit">
                Account <span className="CloseModal" onClick={handleClose}> <img src={Close}/> </span>
            </div>
            <p className="">{connectedWith()}</p>
                        { copyIconHover && <img className="copytoltip" src={copyTT} /> }
                        { copied && <img className="copytoltip-tron" src={copiedIcon} /> }
            <CopyToClipboard text={elrondAccount || account || tronWallet || algorandAccount}>
                <div className="nftLink">
                    <img src={NftSelect} />

                    { account ?
                    `${account.substring(0, 10)}...${account.substring(account.length - 2)}`
                     : 
                     elrondAccount ? `${elrondAccount.substring(0, 10)}...${elrondAccount.substring(elrondAccount.length - 2)}`
                     :
                     algorandAccount ? `${algorandAccount.substring(0, 10)}...${algorandAccount.substring(algorandAccount.length - 2)}`
                     :
                     `${tronWallet.substring(0, 10)}...${tronWallet.substring(tronWallet.length - 2)}`}
                    <span onClick={() => copy()} onMouseOver={() => setCopyIconHover(true)} onMouseOut={()=> setCopyIconHover(false)} className="copyTokk">
                        <img src={ copyIconHover ? CopyHover : FileCopy} />
                    </span>
                </div>
            </CopyToClipboard>
            <div className="accountBtn">
                <a onClick={() => switchNetwork()} className="changeBtn disabled">Change Network</a>
                <a onClick={() => handleDisconnect()} className="changeBtn">Disconnect</a>
            </div>
        </div>
    :
    ''
    )
}
