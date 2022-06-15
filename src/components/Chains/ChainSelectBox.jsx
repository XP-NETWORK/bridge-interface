import { useDispatch } from "react-redux";
import { setTo, setFrom, setChangeWallet } from "../../store/reducers/generalSlice";
import { useSelector } from "react-redux";
import SetDeparture from "./SetDeparture"
import SetDestination from "./SetDestination";
import ChainListBox from "./ChainListBox";
import swap from "../../assets/img/icons/swapChain.svg"
import {ReactComponent as SwapComp} from "../../assets/img/icons/swapChain.svg"
import { TESTNET_CHAIN_INFO, CHAIN_INFO } from "../values";
import { useWeb3React } from "@web3-react/core";
import { usePrevious } from "../Settings/hooks";

export default function ChainSelectBox() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const prevSelected = usePrevious(from);
  const to = useSelector((state) => state.general.to);
  const account = useSelector((state) => state.general.account);
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const tronWallet = useSelector((state) => state.general.tronWallet);
  const testnet = useSelector((state) => state.general.testNet);
 


  const switchChains = (e) => {
    // debugger
    if(from.type !== to.type){
      switch (from.type) {
        case "EVM":
          if(account){
            dispatch(setChangeWallet(true))
          }
          else handleSwitch(e)
            break;
        case "Tron":
          if(tronWallet)dispatch(setChangeWallet(true))
          else handleSwitch(e)
            break;
        case "Elrond":
          if(elrondAccount)dispatch(setChangeWallet(true))
          else handleSwitch(e)
            break;
        case "Tezos":
          if(tezosAccount)dispatch(setChangeWallet(true))
          else handleSwitch(e)
            break;
        case "VeChain":
          if(account)dispatch(setChangeWallet(true))
          else handleSwitch(e)
            break;
        case "Algorand":
          if(algorandAccount){
            dispatch(setChangeWallet(true))}
          else handleSwitch(e)
            break;
          default:
              break;
      }
    }
    else{
      handleSwitch(e)
    }
  };

  async function switchNetwork(chain) {
    const info = testnet
      ? TESTNET_CHAIN_INFO[chain?.key]
      : CHAIN_INFO[chain?.key];
    const chainId = `0x${info.chainId.toString(16)}`;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{chainId}],
      })
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }

  const handleSwitch = async (e) => {
    // debugger
    e.preventDefault();
    const temp = to;
    let success
    if(account){
      success = await switchNetwork(temp)
      if(success){
        dispatch(setTo(from));
        dispatch(setFrom(temp));
      }
    }
    else{
      dispatch(setTo(from));
      dispatch(setFrom(temp));
    }
  }

  return (
    <>
    <ChainListBox />
    <div className="chain-select__box">Transfer NFTs<br /> between blockchains</div>
    <div className="nftSelectBox">
      <SetDeparture />
      <span className="swap-chain__btn" onClick={(e) => from && to ? switchChains(e) : undefined}><SwapComp className="svgWidget swpBtn"/> </span>
      <span className="chain-sep__line"></span>
      <SetDestination />
    </div>
    </>
  );
}
