import React from 'react'
import { useSelector } from 'react-redux'

export default function ChainSwitch({ assignment, func }) {
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
  return (
    <span>
          <img style={{ width: "30px" }} src={to.image.src} alt="" /> {to.key === "xDai" ? "Gnosis Chain" : to.key}
          <div onClick={func} className="triangle">
            {widget ? (
              <div>
                <Vet className="svgWidget trg" />
              </div>
            ) : (
              <img src={vet} alt="" />
            )}
          </div>
        </span>
  )
}
