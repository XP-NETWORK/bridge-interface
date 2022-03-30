import { useDispatch } from "react-redux";
import { allSelected, setNFTsListView, cleanSelectedNFTList, setChainModal, setDepartureOrDestination } from "../../store/reducers/generalSlice";
import { useSelector } from "react-redux";
import { setNFTS } from "../../wallet/helpers";
import ChainListBox from "../Chains/ChainListBox";
import NFTSearch from "./NFTSearch";
import ChainSwitch from "../Buttons/ChainSwitch";
import Refresh from "../Buttons/Refresh";
import SelectedNFTs from "../Buttons/SelectedNFTs";
import ViewButton from "../Buttons/ViewButton";


function NFTlistTop() { 
  const dispatch = useDispatch();
  const nfts = useSelector((state) => state.general.NFTList);
  const onlyWhiteListedNFTs = nfts?.filter(n => n.whitelisted)
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
  const OFF = { opacity: 0.6, pointerEvents: "none" };

  const handleFromChainSwitch = () => {
    dispatch(setDepartureOrDestination('departure'))
    dispatch(setChainModal(true))
  }

  return (
    <>
      <div className="yourNft--mobile">
        <span className="yourNft__title">Your NFTs on </span>
          {/* <Refresh /> */}
          <ChainSwitch assignment={'from'} />
      </div>
      <div className="nftListTop">
        <ChainListBox />
        <div className="yourNft desktopOnly">
          Your NFTs on
          <ChainSwitch assignment={"from"} func={handleFromChainSwitch} />
          <Refresh />
        </div>
        <SelectedNFTs />
        {nfts?.length > 0 &&  <div className="nftTopRIght">
          <NFTSearch />
          <ViewButton />
          {onlyWhiteListedNFTs?.length === selectedNFTs?.length && selectedNFTs?.length  ? <div className="delete-all" onClick={() => dispatch(cleanSelectedNFTList())}></div>
          :<div style={nfts ? {} : OFF} onClick={() => dispatch(allSelected())} className="select-all"></div>
          }
        </div>}
      </div>
    </>
  );
}

export default NFTlistTop;
