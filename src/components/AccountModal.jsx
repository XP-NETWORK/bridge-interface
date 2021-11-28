import React, { useRef, useState } from 'react'
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

export default function AccountModal() {
    const dispatch = useDispatch()
    const account = useSelector(state => state.general.account)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const MetaMask = useSelector(state => state.general.MetaMask)
    const onMaiar = useSelector(state => state.general.onMaiar)
    const show = useSelector(state => state.general.accountModal)
    const [copyIconHover, setCopyIconHover] = useState()
    const from = useSelector(state => state.general.from)


    const handleClose = () => {
        dispatch(setAccountModal(false))
    }

    const [copied, setCopy] = useState()

    const copy = () => {
        setCopy(true)
        setTimeout(() => setCopy(false), 2000)
      }

    const accountModal = useRef(null)
    const handleDisconnect = () => {
        dispatch(setReset())
    }

    async function switchNetwork (){
        const info = CHAIN_INFO[from?.key]
        console.log("info", info);
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

    DetectOutsideClick(accountModal, () => setTimeout(() => handleClose(), 100));

    return ( show ?
        <div ref={accountModal} className="accountBox" show={show} onHide={handleClose} >
            <div className="accountTit">
                Account <span className="CloseModal" onClick={handleClose}> <img src={Close}/> </span>
            </div>
            <p className="">{`Connected with ${MetaMask ? 'MetaMask' : onMaiar ? "Maiar Wallet" : ''}`}</p>
            <CopyToClipboard text={account} onCopy={copy}>
                <div className="nftLink">
                    <img src={NftSelect} />
                    {account ?`${account.substring(0, 10)}...${account.substring(account.length - 2)}` : elrondAccount ? `${elrondAccount.substring(0, 10)}...${elrondAccount.substring(elrondAccount.length - 2)}`: ''}
                    <span onMouseOver={() => setCopyIconHover(true)} onMouseOut={()=> setCopyIconHover(false)} className="copyTokk"><img src={ copyIconHover ? CopyHover : FileCopy} /></span>
                </div>
            </CopyToClipboard>
            <div className="accountBtn">
                <a onClick={() => switchNetwork()} href="#" className="changeBtn">Change Network</a>
                <a onClick={() => handleDisconnect()} href="#" className="changeBtn">Disconnect</a>
            </div>
        </div>
    :
    ''
    )
}
