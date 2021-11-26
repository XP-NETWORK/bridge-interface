import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import RedClose from '../../assets/img/icons/RedClose.svg';
import { setChainModal, setReceiver, setSwitchDestination } from "../../store/reducers/generalSlice"
// import web3 from

function DestinationChain() {

    const to = useSelector(state => state.general.to)
    const Web3Utils = require("web3-utils");
    const dispatch = useDispatch()
    const receiver = useSelector(state => state.general.receiver)

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
                Destination<span><img src={to.image.src} alt="" /> {to.key}</span>
            </div>
            <div className="desAddress">
                <input value={receiver} onChange={ e => handleChange(e)} type="text" placeholder="Paste destination address" />
                <span  className="invalid"><img src={RedClose} alt="Close" /> Invalid address</span>
            </div>
        </div>
    )
}

export default DestinationChain;
