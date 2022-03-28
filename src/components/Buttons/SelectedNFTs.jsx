import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function SelectedNFTs({show, showSelected, setOff}) {
    const selected = useSelector(state => state.general.selectedNFTList)

    // useEffect(() => {
    //   if(selected.length === 0){
    //     setOff(false)}
    // }, [selected])
    

  return (
    <div  className="selected-nfts__button">
        <span onClick={show} className="selected-nfts__title">Selected</span> 
        <span className="selected-nfts__selected">{`/ ${selected ? selected.length : ""} `}</span>
    </div>
  )
}
