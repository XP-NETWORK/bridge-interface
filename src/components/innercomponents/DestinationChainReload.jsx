import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Avalanche from '../../assets/img/chain/Avalanche.svg';
import RedClose from '../../assets/img/icons/RedClose.svg';
import RelWhit from '../../assets/img/icons/RelWhit.svg';
import { setChainModal, setReceiver } from "../../store/reducers/generalSlice"

function DestinationChainReload() {

    const dispatch = useDispatch()
    const receiver = useSelector(state => state.general.receiver)
    const from = useSelector(state => state.general.from)
    const handleChange = e => {
        dispatch(setReceiver(e.target.value))
    }

    function handleSwitchChain() {
        dispatch(setChainModal(true))
    }

    return (
        <div className="destiAddress">
            <div onClick={() => handleSwitchChain()} className="desChain">
                Destination Chain <span className="destiReload"><img src={from.image.src} alt="" /> {from.key} <img src={RelWhit} /></span>
            </div>
            <div className="desAddress">
                <input onChange={ e => handleChange(e)} type="text" placeholder="Paste destination address" />
                <span className="invalid"><img src={RedClose} alt="Close" /> Invalid address</span>
            </div>
        </div>
    )
}

export default DestinationChainReload;
