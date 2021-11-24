import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Avalanche from '../../assets/img/chain/Avalanche.svg';
import RedClose from '../../assets/img/icons/RedClose.svg';
import { setReceiver } from "../../store/reducers/generalSlice"

function DestinationChain() {

    const from = useSelector(state => state.general.from)
    
    const dispatch = useDispatch()
    const receiver = useSelector(state => state.general.receiver)

    const handleChange = e => {
        console.log(e.target.value);
        dispatch(setReceiver(e.target.value))
    }


    return (
        <div className="destiAddress">
            <div className="desChain">
                Destination Chain <span><img src={from.image.src} alt="" /> {from.key}</span>
            </div>
            <div className="desAddress">
                <input value={receiver} onChange={ e => handleChange(e)} type="text" placeholder="Paste destination address" />
                <span className="invalid"><img src={RedClose} alt="Close" /> Invalid address</span>
            </div>
        </div>
    )
}

export default DestinationChain;
