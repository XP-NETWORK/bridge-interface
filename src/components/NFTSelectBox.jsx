import React, { useState} from 'react'
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import Departure from '../assets/img/nftSelect/departure.svg';
import Destination from '../assets/img/nftSelect/destination.svg';
import LineArrow from '../assets/img/nftSelect/Line.svg';
import ChainArrow from "../assets/img/icons/Swap.svg";
import SwapHover from "../assets/img/icons/SwapHover.svg"
import SwapPressed from "../assets/img/icons/SwapPressed.svg"
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

    const [swapHover, setSwapHover] = useState()
    const [swapDown, setSwapDown] = useState()
    return (
        <div className="nftSelectBox">
        <div className="selChain seleDepat" onClick={() => handleShow("departure")}>
            { from ? 
                <div className="seleDepatSelec">
                    <img style={{width: "28px"}} src={ from.image.src } alt="" />{from.text}
                </div>
                :
                <div className="seleDepatSelec">
                    <img style={{width: "28px"}} src={ Departure } alt="" />Select departure chain
                </div>
            }
        </div>
        { from && to ?
            <span onMouseDown={() => setSwapDown(true)} onMouseUp={()=>setSwapDown(false)} onMouseOut={()=> setSwapHover(false)} onMouseOver={() => setSwapHover(prev =>!prev)} onClick={ e => switchChains(e)} className="chainArrow"><img src={ swapDown ? SwapPressed : swapHover ? SwapHover : ChainArrow } alt="" /></span>
        :
            <span className="chainArrow"><img src={ ChainArrow } alt="arrow-swap" /></span> 
        }
        <span className="LineArrow"><img src={ LineArrow } alt="" /></span>
        <div className="selChain seleDesti" onClick={() => handleShow("destination")}>
            { to ?
                <div className="seleDestiSele">
                    <img  style={{width: "28px"}} src={ to.image.src } alt="" />{to.text}
                </div>
                :
                <div className="seleDestiSele">
                    <img  style={{width: "28px"}} src={ Destination } alt="" />Select destination chain
                </div>
            }
        </div>
</div>
    )
}
