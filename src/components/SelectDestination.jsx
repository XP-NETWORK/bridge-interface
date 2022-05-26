import React, { useEffect, useState} from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";

// Chain
import Ethereum from '../assets/img/chain/Etherium.svg';
import HECO from '../assets/img/chain/HECO.svg';
import Elrond from '../assets/img/chain/Elrond.svg';
import BSC from '../assets/img/chain/Binance.svg';
import Cardano from '../assets/img/chain/Cardano.svg';
import Algorand from '../assets/img/chain/Algarand.svg';
import Departure from '../assets/img/nftSelect/departure.svg';
import Destination from '../assets/img/nftSelect/destination.svg';
import ChainArrow from '../assets/img/nftSelect/ChianArrow.svg';
import LineArrow from '../assets/img/nftSelect/Line.svg';
import Video from '../assets/img/icons/Video_icon.svg';
import INF from '../assets/img/icons/Inf.svg';

import Close from '../assets/img/icons/close.svg';
import Search from '../assets/img/icons/Search.svg';
import NFTSelectBox from './NFTSelectBox';
import { useDispatch, useSelector } from 'react-redux';
import { setChainModal } from "../store/reducers/generalSlice"


function SelectDestination() {
    const dispatch = useDispatch()
    // const [show, setShow] = useState(false);
    const handleClose = () => dispatch(setChainModal(false))
    // const handleShow = () => setShow(true);
    const show = useSelector(state => state.general.showChainModal)
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)

    useEffect(() => {
    }, [to, from])

    return (
        <div>
            {/* <Button variant="primary" onClick={handleShow}>
                Select destination chain
            </Button> */}
            {/* NFT Select Box Component */}
            {/* <div className="nftSelectBox">
                    <div className="selChain seleDepat" onClick={handleShow}>
                        <div className="seleDepatSelec">
                            <img src={Departure} alt="" />
                            Select departure chain
                        </div>
                    </div>
                    <span className="chainArrow"><img src={ChainArrow} alt="" /></span>
                    <span className="LineArrow"><img src={LineArrow} alt="" /></span>
                    <div className="selChain seleDesti" onClick={handleShow}>
                        <div className="seleDestiSele">
                            <img src={Destination} alt="" />
                            Select destination chain
                        </div>
                    </div>
            </div> */}
            <NFTSelectBox />
            <Modal show={show} onHide={handleClose} className="ChainModal">
                <Modal.Header className="text-left">
                    <Modal.Title>Select destination chain</Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                    <img src={Close} alt="" />
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <div className="nftChainListBox">
                        <form action="#">
                            <div className="searchChain">
                                <input type="search" placeholder="Search" />
                                <button type="submit"><img src={Search} alt="" /></button>
                            </div>
                        </form>
                        <ul className="nftChainList scrollSty">
                            <li className="nftChainItem"><img src={Ethereum} /> Ethereum</li>
                            <li className="nftChainItem"><img src={HECO} /> HECO</li>
                            <li className="nftChainItem"><img src={Elrond} /> Elrond</li>
                            <li className="nftChainItem"><img src={BSC} /> BSC</li>
                            <li className="nftChainItem"><img src={Cardano} /> Cardano</li>
                            <li className="nftChainItem"><img src={Algorand} /> Algorand</li>
                            <li className="nftChainItem"><img src={Ethereum} /> Ethereum</li>
                            <li className="nftChainItem"><img src={HECO} /> HECO</li>
                            <li className="nftChainItem"><img src={Elrond} /> Elrond</li>
                            <li className="nftChainItem"><img src={BSC} /> BSC</li>
                            <li className="nftChainItem"><img src={Cardano} /> Cardano</li>
                            <li className="nftChainItem"><img src={Algorand} /> Algorand</li>
                        </ul> 
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SelectDestination