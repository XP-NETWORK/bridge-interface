import { useSelector } from "react-redux"
export default function SelectedNFTs() {
    const nfts = useSelector((state) => state.general.NFTList);

  return (
    <div className="selected-nfts__button">
        Selected <span>{`/ ${nfts ? nfts.length : ""} `}</span>
    </div>
  )
}
