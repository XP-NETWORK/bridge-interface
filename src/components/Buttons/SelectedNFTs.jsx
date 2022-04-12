import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function SelectedNFTs({show, showSelected, setOff, on}) {
    const selected = useSelector(state => state.general.selectedNFTList)

  

  return (
    <div onClick={show} className="selected-nfts__button">
        <span  className="selected-nfts__title">{!on ? "Selected" : "Back"}</span> 
        <span className="selected-nfts__selected">{`/ ${selected ? selected.length : ""} `}</span>
    </div>
  )
}
