import React, { useEffect, useState } from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";

import Close from '../assets/img/icons/close.svg';
import Wrong from '../assets/img/Wrong.svg';
import Switch from '../assets/img/Switch.svg';
import { CHAIN_INFO } from "../components/values";
import MetaMask from '../assets/img/wallet/MetaMask.svg';
import { useSelector } from 'react-redux';
import { getAddEthereumChain } from "../wallet/chains"
import { useDispatch } from 'react-redux';
import { setWrongNetwork } from '../store/reducers/generalSlice';


function NFTworng() {


    const handleClose = () => dispatch(setWrongNetwork(false))
    const from = useSelector(state => state.general.from.key)
    const showWrong = useSelector(state => state.general.wrongNetwork)
    console.log("showWrong", showWrong);
    const account = useSelector(state => state.general.account)
    const dispatch = useDispatch()

    async function switchNetwork (){
        const info = CHAIN_INFO[from]
        const chainId = `0x${info.chainId.toString(16)}`;
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId }],
              })
              dispatch(setWrongNetwork(false))
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
                dispatch(setWrongNetwork(false))
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    useEffect(() => {
    }, [showWrong])

    return (
        <div>
            {/* <li className="wllListItem" onClick={handleShow}><img src={MetaMask} /> MetaMask</li> */}
            <Modal show={showWrong} onHide={handleClose} className="nftWorng">
                <Modal.Header className="border-0">
                    <Modal.Title>Wrong Network</Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                        <img src={Close} alt="" />
                    </span>
                </Modal.Header>
                <Modal.Body className="modalBody text-center">
                    <div className="wrongNFT">
                        <div className="nftWornTop">
                            <span className="worngImg"><img src={Wrong} alt="Worng" /></span>
                            <h3>Switch to Polygon Mainnet</h3>
                            <p className="">XP.network Bridge requires you to <br /> connect to the Polygon Mainnet</p>
                        </div>
                        <a onClick={() => switchNetwork()} href="#" className="switching">Switch Network</a>
                        <div style={{visibility: "hidden"}} className="switchingAcc">
                            <img src={Switch} alt="Switching" />
                            <p className="">Switching to Mainnet</p>
                            <p className="">Follow instructions in MetaMask</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NFTworng;
