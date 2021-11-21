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
import { useDispatch } from 'react-redux';
import { setChainModal, setDepartureOrDestination, setTo, setFrom  } from "../store/reducers/generalSlice"
import { useSelector, } from 'react-redux';

export default function NFTSelectBox() {

    const dispatch = useDispatch()

    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)

    const handleShow = (str) => {
        dispatch(setChainModal(true));
        str === "departure" ? dispatch(setDepartureOrDestination("departure")) : dispatch(setDepartureOrDestination("destination"))
    }

    const switchChains = e => {
        e.preventDefault();
        const temp = to
        dispatch(setTo(from))
        dispatch(setFrom(temp))
    }

    return (
        <div className="nftSelectBox">
        <div className="selChain seleDepat" onClick={() => handleShow("departure")}>
            { from ? 
                <div className="seleDepatSelec">
                    <img src={from.image.src} alt="" />{from.text}
                </div>
                :
                <div className="seleDepatSelec">
                    <img src={Departure} alt="" />Select departure chain
                </div>
            }
        </div>
        <span onClick={ e => switchChains(e)} className="chainArrow"><img src={ ChainArrow } alt="" /></span>
        <span className="LineArrow"><img src={ LineArrow } alt="" /></span>
        <div className="selChain seleDesti" onClick={() => handleShow("destination")}>
            { to ?
                <div className="seleDestiSele">
                    <img src={to.image.src} alt="" />{to.text}
                </div>
                :
                <div className="seleDestiSele">
                    <img src={Destination} alt="" />Select destination chain
                </div>
            }
        </div>
</div>
    )
}
