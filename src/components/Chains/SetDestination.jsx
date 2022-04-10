import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import Destination from '../../assets/img/nftSelect/destination.svg';
import { setChainModal, setDepartureOrDestination } from '../../store/reducers/generalSlice';

export default function SetDestination() {
    const to = useSelector(state => state.general.to)
    const dispatch = useDispatch()
    
    const handleShow = (str) => {
        dispatch(setChainModal(true));
        str === "departure" ? dispatch(setDepartureOrDestination("departure")) : dispatch(setDepartureOrDestination("destination"))
    }
  return (
    <div className="selChain seleDesti" onClick={() => handleShow("destination")}>
    { to ?
        <div className="seleDestiSele">
            <img  style={{width: "28px"}} src={ to.image.src } alt="" />{to.text === "xDai" ? "Gnosis" : to.text}
        </div>
        :
        <div className="seleDestiSele">
            <img  style={{width: "28px"}} src={ Destination } alt="" />{window.innerWidth >= 600 ? "Select Destination chain" : "Destination chain"}
        </div>
    }
</div>
  )
}
