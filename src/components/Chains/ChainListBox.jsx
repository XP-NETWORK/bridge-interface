import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chains } from "../../components/values";
import {
  setChainModal,
  setDepartureOrDestination,
  setTo,
  setFrom,
  setChainSearch,
  setSwitchDestination,
} from "../../store/reducers/generalSlice";
import Chain from "./Chain"
import ChainSearch from "../Chains/ChainSearch"
import { Modal } from "react-bootstrap";
import Close from "../../assets/img/icons/close.svg";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import { useState } from "react";
import { filterChains } from "./ChainHelper";

export default function ChainListBox(props) {
  const dispatch = useDispatch();
  const departureOrDestination = useSelector(
    (state) => state.general.departureOrDestination
  );
  const chainSearch = useSelector((state) => state.general.chainSearch);
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const globalTestnet = useSelector((state) => state.general.testNet);
  const show = useSelector((state) => state.general.showChainModal);
  const switchChain = useSelector((state) => state.general.switchDestination);
  const widget = useSelector((state) => state.general.widget);
  const [fromChains, setFromChains] = useState(chains)
  const [toChains, setToChains] = useState(chains)
  // console.log("toChains: ", toChains)


  const handleClose = () => {
    dispatch(setChainModal(false));
    dispatch(setDepartureOrDestination(""));
    dispatch(setSwitchDestination(false));
    dispatch(setChainSearch(""));
  };

  const chainSelectHandler = (chain) => {
    if (departureOrDestination === "departure") {
      if (to && chain.key !== to.key) {
        dispatch(setFrom(chain));
        handleClose();
      } else {
        dispatch(setTo(""));
        dispatch(setFrom(chain));
        handleClose();
      }
    } else if (switchChain) {
      dispatch(setTo(chain));
      handleClose();
    } else {
      dispatch(setTo(chain));
      dispatch(setSwitchDestination(false));
      handleClose();
    }
  };

  useEffect(() => {
    const withNew = chains.filter(chain => chain.newChain).sort((a,b) => a.order - b.order)
    const withComing = chains.filter( chain => chain.coming && !chain.newChain )
    const withMaintenance = chains.filter( chain => chain.maintenance && !chain.newChain )
    const noComingNoMaintenance = chains.filter( chain => !chain.coming && !chain.maintenance && !chain.newChain).sort((a,b) => a.order - b.order)
    const sorted = [...withNew, ...noComingNoMaintenance, ...withMaintenance, ...withComing]
    
    //const orderSorted = sorted.sort((a,b) => a.order - b.order)
    setFromChains(sorted)
  },[])

  useEffect(() => {
    if(from)setToChains(filterChains(chains, from.text))
  }, [from,to])
  
  // useEffect(() => {
  // }, [to]);

  return (
    <Modal
      animation={false}
      show={show || switchChain}
      onHide={() => handleClose()}
      className="ChainModal"
    >
      <Modal.Header className="text-left">
        <Modal.Title>
          <div className="chain-list__header">{`Select ${
          departureOrDestination === "destination" ? "destination" : "departure"
        } chain`}</div>
        </Modal.Title>
        <span className="CloseModal" onClick={() => handleClose()}>
          {widget ? <CloseComp className="svgWidget" /> : <img src={Close} alt="" />}
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="nftChainListBox">
          <ChainSearch />
          <ul className="nftChainList scrollSty">
            {!from ? fromChains
            .filter((chain) => chain.text.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : ""))
            .map((filteredChain, index) => {
            const { image, text, key, coming, newChain, maintenance, testNet, mainnet } = filteredChain;
            return globalTestnet ? testNet && <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={filteredChain} image={image} key={`chain-${key}`}/>
            : (mainnet || coming) && <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={filteredChain} image={image} key={`chain-${key}`}/>})
            
            : toChains
            .filter( chain => chain.key.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : ""))
            .map((chain) => {
              const {image, text, key, coming, newChain, maintenance, testNet, mainnet } = chain;
              return globalTestnet ? ((testNet && chain.key !== from.key)) && <Chain  chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming}  text={text} chainKey={key} filteredChain={chain} image={image} key={`chain-${key}`} /> 
              : (((mainnet || coming) && chain.key !== from.key)) && <Chain  chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming}  text={text} chainKey={key} filteredChain={chain} image={image} key={`chain-${key}`} /> })
            }
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}
