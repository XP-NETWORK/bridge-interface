import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChainModal, setDepartureOrDestination } from '../../store/reducers/generalSlice';
import Departure from '../../assets/img/nftSelect/departure.svg';
import Jazzicon from 'react-jazzicon'

export default function SetDeparture() {
    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from)

    const [seed, setSeed] = useState()


    
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

    useEffect(() => {
        const _seed = Math.round(Math.random() * 10000000)
        if(!seed)setSeed(_seed)
    }, [])

  return (
        <div className="selChain seleDepat" onClick={() => handleShow("departure")}>
            { from ? 
                <div className="seleDepatSelec">
                    <Jazzicon diameter={30} seed={seed} />
                    <div className="select-chain__text">{from.text === "xDai" ? "Gnosis" : from.text}</div>
                </div>
                :
                <div className="seleDepatSelec">
                    <Jazzicon diameter={30} seed={seed} />
                    <div className="select-chain__text">{window.innerWidth >= 600 ? "Select Departure chain" : "Departure chain"}</div>
                </div>
            }
        </div>
  )
}
