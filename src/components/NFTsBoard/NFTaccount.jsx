import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NFTgridView from "../NFT/NFTgridView";
import NFTlistView from "../NFT/NFTlistView";
import NFTlistTop from "./NFTlistTop";
import { setChainModal, setDepartureOrDestination, setError, setSearchNFTList } from "../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAlgorandClaimables, setNFTS } from "../../wallet/helpers";
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
import UnsupportedNetwork from "../Modals/ChangeNetwork/UnsupportedNetwork";

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

//Angelika - 0x0d7df42014064a163DfDA404253fa9f6883b9187
//Dima. U - 0x6449b68cc5675f6011e8DB681B142773A3157cb9
// ????? - 0x3Aa485a8e745Fc2Bd68aBbdB3cf05B58E338D7FE

  async function getNFTsList() {
    // debugger
    const useHardcoded = false;
    const hard = "0x16E7B9Afe41daddbE417E8a7Ffb74448f4E33976";
    try {
      const w = useHardcoded
      ? hard
      : type === "EVM" || type === "VeChain"
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
    setShowSelected(!showSelected)
  }

  const handleSearchTop = () => {
    setNFTsSearch(!showNFTsSearch)
    dispatch(setSearchNFTList(''));
  }

  useEffect(async () => {
    await getNFTsList();
    if(algorandAccount){
      await getAlgorandClaimables(algorandAccount)
    }
  }, []);

  // useEffect(() => {
  // }, [algorandClaimables])
  

  const handleFromChainSwitch = () => {
    dispatch(setDepartureOrDestination('departure'))
    dispatch(setChainModal(true))
  }

  useEffect(() => {
    if(selectedNFTs.length < 1){
      setShowSelected(false)
    }
  }, [selectedNFTs, nfts])
  
  
  // useEffect(async () => {}, [nfts]);

  return (
    <div className="NFTaccount">
      <ChangeNetworkModal />
      <UnsupportedNetwork />
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
              <SelectedNFTs on={showSelected} show={selectedNFTs.length > 0 ? handleShowSelected : undefined} showSelected={showSelected} setOff={setShowSelected} />
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
    </div>
  );
}

export default NFTaccount;
