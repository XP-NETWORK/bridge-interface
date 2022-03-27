import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NFTgridView from "../NFT/NFTgridView";
import NFTlistView from "../NFT/NFTlistView";
import NFTlistTop from "./NFTlistTop";
import { setError, setSearchNFTList } from "../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setNFTS } from "../../wallet/helpers";
import { ReturnBtn } from "../Settings/returnBtn";
import DesktopTransferBoard from "../TransferBoard/DesktopTransferBoard";
import MobileTransferBoard from "../TransferBoard/MobileTransferBoard";
import MobileDestinationAddressBar from "../MobileOnly/MobileDestinationAddressBar";
import "./NFTsBoard.css"
import Refresh from "../Buttons/Refresh";
import ChainSwitch from "../Buttons/ChainSwitch";
import SelectedNFTs from "../Buttons/SelectedNFTs";
import ViewButton from "../Buttons/ViewButton";
import SelectClearAll from "../Buttons/SelectClearAll";
import SelectedNFT from "../innercomponents/SelectedNFT";
import SearchButton from "../Buttons/SearchButton";
import MobileNFTsSearch from "../MobileOnly/MobileNFTsSearch";
import Approval from "../TransferBoard/Approval";
import SendFees from "../TransferBoard/SendFees";
import ButtonToTransfer from "../TransferBoard/ButtonToTransfer";
import ChangeNetworkModal from "../Modals/ChangeNetwork/ChangeNetworkModal";

function NFTaccount() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from.key);
  const type = useSelector((state) => state.general.from.type);
  const algorandAccount = useSelector((s) => s.general.algorandAccount);
  const NFTListView = useSelector((state) => state.general.NFTListView);
  const nfts = useSelector((state) => state.general.NFTList);
  const tronWallet = useSelector((state) => state.general.tronWallet);
  const account = useSelector((state) => state.general.account);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const [showSelected, setShowSelected] = useState(false)
  const [showNFTsSearch, setNFTsSearch] = useState(false)
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);



  async function getNFTsList() {
    const useHardcoded = false;
    const hard = "0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE";
    try {
      const w = useHardcoded
        ? hard
        : type === "EVM"
        ? account
        : type === "Tezos"
        ? tezosAccount
        : type === "Algorand"
        ? algorandAccount
        : type === "Elrond"
        ? elrondAccount
        : type === "Tron"
        ? tronWallet
        : undefined;
      await setNFTS(w, from);
    } catch (error) {
      dispatch(setError(error.data ? error.data.message : error.message));
    }
  }

  const handleShowSelected = () => {
    if(selectedNFTs.length > 0){
    setShowSelected(!showSelected)
    }
    else return
  }

  const handleSearchTop = () => {
    setNFTsSearch(!showNFTsSearch)
    dispatch(setSearchNFTList(''));
  }

  useEffect(async () => {
    await getNFTsList();
  }, []);

  const handleFromChainSwitch = () => {
    console.log("click")
  }
  
  useEffect(async () => {}, [nfts]);

  return (
    <div className="NFTaccount">
      
      <Container className="nftSlectContaine">
        <ReturnBtn />
        <div className="row">
          <div className="nftListCol col-lg-8">
            <div className="nft_selectBox">
              <NFTlistTop />
              {NFTListView ? <NFTlistView /> : <NFTgridView />}
              {/* <div className="algo-claimable">
                // TODO Algorand Claimable
              </div> */}
            </div>
            <MobileTransferBoard />
          </div>
          <DesktopTransferBoard />
        </div>
        <div className="mobile-col">
          <div className="mobile-col__tittle">
            <div>Send NFT</div>
          </div>
          <div className="mobile-col__header">
            <div>Your NFTs on</div>
            <Refresh />
            <ChainSwitch assignment={"from"} func={handleFromChainSwitch} />
          </div>
          <div className="mobile-nfts__list">
            { !showNFTsSearch ? <div className="mobile-nfts__header">
              <SelectedNFTs show={handleShowSelected} showSelected={showSelected} />
              <div className="mobile-nfts__buttons">
                <SearchButton handleSearchTop={handleSearchTop} />
                <ViewButton />
                <SelectClearAll />
              </div>
            </div>
            :<MobileNFTsSearch handleSearchTop={handleSearchTop} />}
            <div className="mobile-nfts__body">
              { !showSelected ? NFTListView ? <NFTlistView /> : <NFTgridView /> :
              showSelected && <SelectedNFT /> }
            </div>
          </div>
          <MobileDestinationAddressBar />
          <Approval />
          <SendFees />
          <ButtonToTransfer />
        </div>
      </Container>
      <ChangeNetworkModal />
    </div>
  );
}

export default NFTaccount;