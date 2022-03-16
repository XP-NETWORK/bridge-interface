import { useDispatch } from "react-redux";
import { allSelected, setNFTsListView, cleanSelectedNFTList } from "../../store/reducers/generalSlice";
import { useSelector } from "react-redux";
import { setNFTS } from "../../wallet/helpers";
import ChainListBox from "../Chains/ChainListBox";
import NFTSearch from "./NFTSearch";
import ChainSwitch from "../Buttons/ChainSwitch";
import Refresh from "../Buttons/Refresh";
import SelectedNFTs from "../Buttons/SelectedNFTs";


function NFTlistTop() { 
  const dispatch = useDispatch();
  const nfts = useSelector((state) => state.general.NFTList);
  const onlyWhiteListedNFTs = nfts?.filter(n => n.whitelisted)
  const { algorandAccount, tronWallet, elrondAccount, tezosAccount, account, bigLoader } = useSelector((state) => state.general);
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
  const NFTListView = useSelector((state) => state.general.NFTListView);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);


  const handleView = () => {
    dispatch(setNFTsListView());
  };

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
          <ChainSwitch assignment={"from"} func={undefined} />
          <Refresh />
        </div>
        <SelectedNFTs />
        <div className="nftTopRIght">
          <NFTSearch />
          <div onClick={() => handleView()} className="change-view__button">
          { NFTListView ? <div className="grid-icon"></div>:<div className="list-icon"></div> }
          </div>
          {/* <span onClick={() => setShowSearch(prev => prev = !prev)} className="mobileOnly search-btn"><img src={Search} /></span> */}
          {onlyWhiteListedNFTs?.length === selectedNFTs?.length && selectedNFTs?.length  ? <div className="delete-all" onClick={() => dispatch(cleanSelectedNFTList())}></div>
          :<div style={nfts ? {} : OFF} onClick={() => dispatch(allSelected())} className="select-all"></div>
          }
        </div>
      </div>
    </>
  );
}

export default NFTlistTop;
