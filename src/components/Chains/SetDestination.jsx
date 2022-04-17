import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import Destination from '../../assets/img/nftSelect/destination.svg';
import { setChainModal, setDepartureOrDestination } from '../../store/reducers/generalSlice';
import Jazzicon from 'react-jazzicon'

export default function SetDestination() {
    const to = useSelector(state => state.general.to)
    const dispatch = useDispatch()

    const [seed, setSeed] = useState()

    useEffect(() => {
        const _seed = Math.round(Math.random() * 10000000)
        if(!seed)setSeed(_seed)
    }, [])
    


    
    const handleShow = (str) => {
        dispatch(setChainModal(true));
        str === "departure" ? dispatch(setDepartureOrDestination("departure")) : dispatch(setDepartureOrDestination("destination"))
    }
  return (
    <div className="selChain seleDesti" onClick={() => handleShow("destination")}>
    { to ?
        <div className="seleDestiSele">
            <Jazzicon diameter={30} seed={seed} />
            {to.text === "xDai" ? "Gnosis" : to.text}
        </div>
        :
        <div className="seleDestiSele">
            <Jazzicon diameter={30} seed={seed} />
            {window.innerWidth >= 600 ? "Select Destination chain" : "Destination chain"}
        </div>
    }
</div>
  )
}
