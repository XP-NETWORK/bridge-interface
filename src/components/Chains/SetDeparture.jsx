import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChainModal, setDepartureOrDestination } from '../../store/reducers/generalSlice';
import Departure from '../../assets/img/nftSelect/departure.svg';

export default function SetDeparture() {
    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from)
    const deisplayWidth = window.innerWidth
    
    const handleShow = (str) => {
        dispatch(setChainModal(true));
        switch (str) {
            case "departure":
                dispatch(setDepartureOrDestination("departure"))    
                break;            
            case "destination":
            dispatch(setDepartureOrDestination("destination"))    
                break;
            default:
                break;
        }
    }

  return (
        <div className="selChain seleDepat" onClick={() => handleShow("departure")}>
            { from ? 
                <div className="seleDepatSelec">
                    <img src={ from.image.src } alt="" />{from.text === "xDai" ? "Gnosis" : from.text}
                </div>
                :
                <div className="seleDepatSelec">
                    <img src={ Departure } alt="" />{deisplayWidth > 350 ? "Departure chain" : "Departure chain"}
                </div>
            }
        </div>
  )
}
