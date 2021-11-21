import React, { useEffect, useState} from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";

// Chain
import Ethereum from '../assets/img/chain/Etherium.svg';
// import HECO from '../assets/img/chain/HECO.svg';
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
import { setChainModal, setDepartureOrDestination } from "../store/reducers/generalSlice"
import NFTChainListBox from './NFTChainListBox';


function SelectDestination() {
    const departureOrDestination = useSelector(state => state.general.departureOrDestination)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(setChainModal(false))
        dispatch(setDepartureOrDestination(""))
    }
    // const handleShow = () => setShow(true);
    const show = useSelector(state => state.general.showChainModal)
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)

    useEffect(() => {
    }, [to, from])

    return (
        <div>
            <NFTSelectBox />
            <Modal show={show} onHide={() => handleClose()} className="ChainModal">
                <Modal.Header className="text-left">
                    <Modal.Title>{`Select ${departureOrDestination === 'destination' ? 'destination' : 'departure'} chain`}</Modal.Title>
                    <span className="CloseModal" onClick={() => handleClose()}>
                    <img src={Close} alt="" />
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <NFTChainListBox />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SelectDestination
