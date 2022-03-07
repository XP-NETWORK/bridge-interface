import { useDispatch } from "react-redux";
import { setTo, setFrom } from "../../store/reducers/generalSlice";
import { useSelector } from "react-redux";
import SetDeparture from "./SetDeparture"
import SetDestination from "./SetDestination";
import ChainListBox from "./ChainListBox";
import swap from "../../assets/img/icons/swapChain.svg"

export default function ChainSelectBox() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const widget = useSelector((state) => state.general.widget);


  const switchChains = (e) => {
   if(from && to){
    e.preventDefault();
    const temp = to;
    dispatch(setTo(from));
    dispatch(setFrom(temp));
   }
  };

  return (
    <>
    <ChainListBox />
    <div className="chain-select__box">Transfer NFTs<br /> between blockchains</div>
    <div className="nftSelectBox">
      <SetDeparture />
      <span className="swap-chain__btn" onClick={(e) => switchChains(e)}><img src={swap} alt="" /></span>
      <span className="chain-sep__line"></span>
      <SetDestination />
    </div>
    </>
  );
}
