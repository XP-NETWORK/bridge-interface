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
  const departureOrDestination = useSelector((state) => state.general.departureOrDestination);
  const chainSearch = useSelector((state) => state.general.chainSearch);
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const globalTestnet = useSelector((state) => state.general.testNet);
  const show = useSelector((state) => state.general.showChainModal);
  const switchChain = useSelector((state) => state.general.switchDestination);
  const widget = useSelector((state) => state.general.widget);
  const [fromChains, setFromChains] = useState(chains.sort((a, b) => b.order - a.order))
  const [toChains, searchToChains] = useState(chains.sort((a, b) => b.order - a.order))
  const elrondAccount = useSelector(state => state.general.elrondAccount)
  const tezosAccount = useSelector(state => state.general.tezosAccount)
  const algorandAccount = useSelector(state => state.general.algorandAccount)
  const evmAccount = useSelector(state => state.general.account)
  const tronAccount = useSelector(state => state.general.tronWallet)

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
    const onlyElrond = elrondAccount ? chains.filter( chain => chain.type === "Elrond") : undefined
    const onlyEVM = evmAccount ? chains.filter( chain => chain.type === "EVM") : undefined
    const onlyTron = tronAccount ? chains.filter( chain => chain.type === "Tron") : undefined
    const onlyAlgo = algorandAccount ? chains.filter( chain => chain.type === "Algorand") : undefined

    const withNew = chains.filter(chain => chain.newChain)
    const withComing = chains.filter( chain => chain.coming && !chain.newChain )
    const withMaintenance = chains.filter( chain => chain.maintenance && !chain.newChain )
    const noComingNoMaintenance = chains.filter( chain => !chain.coming && !chain.maintenance && !chain.newChain)
    const sorted = [...withNew, ...noComingNoMaintenance, ...withMaintenance, ...withComing]
    setFromChains(sorted)
  }, [elrondAccount, tezosAccount, algorandAccount, tronAccount, evmAccount])

  useEffect(() => {
    if(from)searchToChains(filterChains(chains, from.text))
  }, [from])
  
  useEffect(() => {
  }, [to]);

  return (
    <Modal
      animation={false}
      show={show || switchChain}
      onHide={() => handleClose()}
      className="ChainModal"
    >
      <Modal.Header className="text-left">
        <Modal.Title>{`Select ${
          departureOrDestination === "destination" ? "destination" : "departure"
        } chain`}</Modal.Title>
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
            .sort((chain) => {
              if(chain.coming) return 1
              else if(chain.maintenance) return 0
              else if(!chain.coming) return -1
            })
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
