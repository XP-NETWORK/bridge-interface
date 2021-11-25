import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import RedClose from '../../assets/img/icons/RedClose.svg';
import { setChainModal, setReceiver } from "../../store/reducers/generalSlice"
// import web3 from

function DestinationChain() {

    const from = useSelector(state => state.general.from)
    const Web3Utils = require("web3-utils");
    const dispatch = useDispatch()
    const receiver = useSelector(state => state.general.receiver)

    const handleChange = e => {
        dispatch(setReceiver(e.target.value))
    }

    function handleSwitchChain() {
        dispatch(setChainModal(true))
    }

    return (
        <div className="destiAddress">
            <div onClick={() => handleSwitchChain()} className="desChain">
                Destination Chain <span><img src={from.image.src} alt="" /> {from.key}</span>
            </div>
            <div className="desAddress">
                <input value={receiver} onChange={ e => handleChange(e)} type="text" placeholder="Paste destination address" />
                <span  className="invalid"><img src={RedClose} alt="Close" /> Invalid address</span>
            </div>
        </div>
    )
}

export default DestinationChain;
