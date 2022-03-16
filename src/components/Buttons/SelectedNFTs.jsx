import { useSelector } from "react-redux"
export default function SelectedNFTs() {
    const nfts = useSelector((state) => state.general.NFTList);
    const selected = useSelector(state => state.general.selectedNFTList)

  return (
    <div className="selected-nfts__button">
        <span className="selected-nfts__title">Selected</span> 
        <span className="selected-nfts__selected">{`/ ${selected ? selected.length : ""} `}</span>
    </div>
  )
}
