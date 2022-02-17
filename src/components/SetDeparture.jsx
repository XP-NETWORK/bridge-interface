import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChainModal, setDepartureOrDestination } from '../store/reducers/generalSlice';
import Departure from '../assets/img/nftSelect/departure.svg';

export default function SetDeparture() {
    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from)

    const handleShow = (str) => {
        dispatch(setChainModal(true));
        str === "departure" ? dispatch(setDepartureOrDestination("departure")) : dispatch(setDepartureOrDestination("destination"))
    }

  return (
        <div className="selChain seleDepat" onClick={() => handleShow("departure")}>
            { from ? 
                <div className="seleDepatSelec">
                    <img src={ from.image.src } alt="" />{from.text === "xDai" ? "Gnosis Chain" : from.text}
                </div>
                :
                <div className="seleDepatSelec">
                    <img src={ Departure } alt="" />Select departure chain
                </div>
            }
        </div>
  )
}
