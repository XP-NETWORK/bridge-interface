import { useDispatch } from "react-redux";
import { setTo, setFrom, setChangeWallet } from "../../store/reducers/generalSlice";
import { useSelector } from "react-redux";
import SetDeparture from "./SetDeparture"
import SetDestination from "./SetDestination";
import ChainListBox from "./ChainListBox";
import swap from "../../assets/img/icons/swapChain.svg"

export default function ChainSelectBox() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const account = useSelector((state) => state.general.account);
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const tronWallet = useSelector((state) => state.general.tronWallet);
 


  const switchChains = (e) => {
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
      // dispatch(setChangeWallet(true))
    }
    else{
      handleSwitch(e)
      // e.preventDefault();
      // const temp = to;
      // dispatch(setTo(from));
      // dispatch(setFrom(temp));
    }
  };

  const handleSwitch = (e) => {
    e.preventDefault();
    const temp = to;
    dispatch(setTo(from));
    dispatch(setFrom(temp));
  }

  return (
    <>
    <ChainListBox />
    <div className="chain-select__box">Transfer NFTs<br /> between blockchains</div>
    <div className="nftSelectBox">
      <SetDeparture />
      <span className="swap-chain__btn" onClick={(e) => from && to ? switchChains(e) : undefined}><img src={swap} alt="" /></span>
      <span className="chain-sep__line"></span>
      <SetDestination />
    </div>
    </>
  );
}
