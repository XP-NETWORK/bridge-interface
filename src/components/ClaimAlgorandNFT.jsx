import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import Close from '../assets/img/icons/close.svg';
import Wrong from '../assets/img/Wrong.svg';
import { CHAIN_INFO } from "./values";
import { useSelector } from 'react-redux';
import { getAddEthereumChain } from "../wallet/chains"
import { useDispatch } from 'react-redux';
import { setReset, setWrongNetwork } from '../store/reducers/generalSlice';
import ChangeNetworkLoader from './innercomponents/ChangeNetworkLoader';
import { useWeb3React } from '@web3-react/core';


function ClaimAlgorandNFT() {

    const handleClose = () => dispatch(setReset())
    const from = useSelector(state => state.general.from)
    const algorandClaimPopup = useSelector(state => state.general.algorandClaimPopup)
    const account = useSelector(state => state.general.account)
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const { chainId } = useWeb3React()


   
    
    useEffect(() => {
    }, [algorandClaimPopup])

    return (
        <div>
            {/* <li className="wllListItem" onClick={handleShow}><img src={MetaMask} /> MetaMask</li> */}
            <Modal animation={false} show={algorandClaimPopup} onHide={handleClose} className="nftWorng">
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
                            <h3>Switch to {from?.key} Mainnet</h3>
                            <p className="">XP.network Bridge requires you to <br /> connect to the {from?.key} Mainnet</p>
                        </div>
                       
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ClaimAlgorandNFT;
