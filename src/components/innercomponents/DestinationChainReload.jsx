import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Avalanche from '../../assets/img/chain/Avalanche.svg';
import RedClose from '../../assets/img/icons/RedClose.svg';
import RelWhit from '../../assets/img/icons/RelWhit.svg';
import { setChainModal, setReceiver, setSwitchDestination } from "../../store/reducers/generalSlice"

function DestinationChainReload() {

    const dispatch = useDispatch()
    const receiver = useSelector(state => state.general.receiver)
    const to = useSelector(state => state.general.to)
    const handleChange = e => {
        dispatch(setReceiver(e.target.value))
    }

    function handleSwitchChain() {
        dispatch(setSwitchDestination(true))
    }

    useEffect(() => {

    }, [to])

    return (
        <div className="destiAddress">
            <div onClick={() => handleSwitchChain()} className="desChain">
                Destination<span className="destiReload"><img src={to.image.src} alt="" /> {to.key} <img src={RelWhit} /></span>
            </div>
            <div className="desAddress">
                <input onChange={ e => handleChange(e)} type="text" placeholder="Paste destination address" />
                <span className="invalid"><img src={RedClose} alt="Close" /> Invalid address</span>
            </div>
        </div>
    )
}

export default DestinationChainReload;
