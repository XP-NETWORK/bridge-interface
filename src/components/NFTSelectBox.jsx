import React, { useState} from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";

// // Chain
// import Ethereum from '../assets/img/chain/Etherium.svg';
// import Heco from '../assets/img/chain/HECO.svg';
// import Elrond from '../assets/img/chain/Elrond.svg';
// import BSC from '../assets/img/chain/Binance.svg';
// import Cardano from '../assets/img/chain/Cardano.svg';
// import Algorand from '../assets/img/chain/Algarand.svg';
import Departure from '../assets/img/nftSelect/departure.svg';
import Destination from '../assets/img/nftSelect/destination.svg';
import ChainArrow from '../assets/img/nftSelect/ChianArrow.svg';
import LineArrow from '../assets/img/nftSelect/Line.svg';
// import Video from '../assets/img/icons/Video_icon.svg';
// import INF from '../assets/img/icons/Inf.svg';
// import Close from '../assets/img/icons/close.svg';
// import Search from '../assets/img/icons/Search.svg';
import { useDispatch } from 'react-redux';
import { setChainModal, setDepartureOrDestination } from "../store/reducers/generalSlice"
import { useSelector } from 'react-redux';

export default function NFTSelectBox() {
    const dispatch = useDispatch()
    const handleShow = (str) => {
        // debuggers
        dispatch(setChainModal(true));
        str === "departure" ? dispatch(setDepartureOrDestination("departure")) : dispatch(setDepartureOrDestination("destination"))
    }

    return (
        <div className="nftSelectBox">
        <div className="selChain seleDepat" onClick={() => handleShow("departure")}>
            <div className="seleDepatSelec">
                <img src={Departure} alt="" />
                Select departure chain
            </div>
        </div>
        <span className="chainArrow"><img src={ChainArrow} alt="" /></span>
        <span className="LineArrow"><img src={LineArrow} alt="" /></span>
        <div className="selChain seleDesti" onClick={() => handleShow("destination")}>
            <div className="seleDestiSele">
                <img src={Destination} alt="" />
                Select destination chain
            </div>
        </div>
</div>
    )
}
