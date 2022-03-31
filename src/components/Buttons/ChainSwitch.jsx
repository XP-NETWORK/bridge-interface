import React from 'react'
import { useSelector } from 'react-redux'
import "./Buttons.css"

export default function ChainSwitch({ assignment, func }) {
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const show = () => {
        switch (assignment) {
            case "from":
            return(
            <span onClick={func} className='chain-switch'>
                <img style={{ width: "30px" }} src={from.image.src} alt="" /> {from.key === "xDai" ? "Gnosis" : from.key}
                <div  className="arrow-down"></div>
            </span>
            )
            case "to":
            return(
            <span onClick={func} className='chain-switch'>
                <img style={{ width: "30px" }} src={to.image.src} alt="" /> {to.key === "xDai" ? "Gnosis" : to.key}
                <div  className="arrow-down"></div>
            </span>
            )
            default:
                break;
        }
    }
  return (
      show()
  )
}
