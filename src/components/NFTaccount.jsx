import { useEffect } from "react";
import { Container } from "react-bootstrap";


import DestinationChain from "./innercomponents/DestinationChain";
import DestinationChainReload from "./innercomponents/DestinationChainReload";


import SelectedNFT from "./innercomponents/SelectedNFT";
import Approval from "./innercomponents/Approval";
import NFTgridView from "../components/NFT/NFTgridView";
import NFTlistView from "../components/NFT/NFTlistView";
import SendFees from "./innercomponents/SendFees";
import NFTlistTop from "./innercomponents/NFTlistTop";
import { setError } from "../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonToTransfer from "./innercomponents/ButtonToTransfer";
import { setNFTS } from "../wallet/helpers";
import Comment from "../components/innercomponents/Comment";
import { ReturnBtn } from "./Settings/returnBtn";


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
  const testnet = useSelector((state) => state.general.testNet);

  async function getNFTsList() {
    const useHardcoded = true;
    const hard = "0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6";
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
      await setNFTS(w, from, testnet);
    } catch (error) {
      dispatch(setError(error.data ? error.data.message : error.message));
    }
  }

  useEffect(async () => {
    await getNFTsList();
  }, []);

  useEffect(async () => {}, [nfts]);

  // ! Estimate moved to SendFees component
  // useEffect(() => {
  //     if(selectedNFTList.length > 0) estimate();
  //     else setFees("0")
  //     const s = setInterval(() => estimate(), 1000 * 30);
  //     setEstimateInterval(s)
  //     return () => clearInterval(s);
  // }, [selectedNFTList])

  // useEffect(() => {
  //     clearInterval(estimateInterval)
  //     estimate()
  //     const s = setInterval(() => estimate(), 1000 * 30);
  //     setEstimateInterval(s)
  //     return () => clearInterval(s)
  // }, [to])

  return (
    <div className="NFTaccount">
      <Container className="nftSlectContaine">
        <ReturnBtn />
        <div className="row">
          <div className="nftListCol col-lg-8">
            <div className="mobileOnly">
              <div className="sendNftTit">
                <h3>Send NFT</h3>
              </div>
              <DestinationChainReload />
            </div>
            <div className="nft_selectBox">
              <NFTlistTop />
              {NFTListView ? <NFTlistView /> : <NFTgridView />}
            </div>
            <div className="mobileOnly">
              <Approval getNft={getNFTsList} />
              <div className="nftSendBtn disenable">
                <SendFees />
                <ButtonToTransfer />
                {/* <div onClick={sendAllNFTs} className={approved && receiver && !loading ? 'nftSendBtn' : 'nftSendBtn disabled'}  >
                                <a  className="themBtn">
                                    {loading ? 'Processing' : 'Send' }
                                </a>
                            </div> */}
              </div>
            </div>
          </div>
          <div className="sendNftCol col-lg-4 desktopOnly">
            <div className="sendNftBox">
              <form action="#">
                <div className="sendNftTit">
                  <h3>Send NFT</h3>
                </div>
                <DestinationChain />
                {nfts?.length ? (
                  <>
                    <SelectedNFT />
                    <Approval />
                    <SendFees />
                    <ButtonToTransfer />
                    {/* <div 
                                        onClick={sendAllNFTs} className={approved && receiver && !loading ? 'nftSendBtn' : 'nftSendBtn disabled'}  >
                                            <a  className="themBtn">
                                                {loading ? 'Processing' : 'Send' }
                                            </a>
                                        </div> */}
                  </>
                ) : (
                  <Comment />
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NFTaccount;
