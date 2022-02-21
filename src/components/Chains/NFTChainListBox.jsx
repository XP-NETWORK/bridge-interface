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

export default function NFTChainListBox(props) {
  const dispatch = useDispatch();
  const departureOrDestination = useSelector(
    (state) => state.general.departureOrDestination
  );
  const chainSearch = useSelector((state) => state.general.chainSearch);
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const fromChains = chains.sort((a, b) => a.order - b.order)
  const toChains = chains.sort((a, b) => a.order - b.order);
  const globalTestnet = useSelector((state) => state.general.testNet);
  const show = useSelector((state) => state.general.showChainModal);
  const switchChain = useSelector((state) => state.general.switchDestination);
  const widget = useSelector((state) => state.general.widget);

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

  useEffect(() => {}, [to]);

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
            {!from ? fromChains.filter((chain) => chain.text.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : "")).sort(chain => chain.maintenance ? 0 : -1).map((filteredChain, index) => {
                    const { image, text, key, coming, newChain, maintenance, testNet, off } = filteredChain;
                    return globalTestnet ? testNet && <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} off={off} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={filteredChain} image={image} key={`chain-${key}`}/>
                   :
                    !off && <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} off={off} text={text} chainKey={key} filteredChain={filteredChain} image={image} key={`chain-${key}`} />
                  })
                : toChains.filter( chain => chain.key.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : "")).sort(chain => chain.maintenance ? 0 : -1).map((chain) => {
                    const {
                      image,
                      text,
                      key,
                      coming,
                      newChain,
                      maintenance,
                      testNet,
                      off
                    } = chain;
                    if (globalTestnet && testNet && chain.key !== from.key) {
                      return (
                        <Chain  chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming}  text={text} off={off}  chainKey={key} filteredChain={chain} image={image} key={`chain-${key}`} /> );
                    } else if (!globalTestnet) { return (chain.key !== from.key && !off) ? ( <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} chainKey={key} coming={coming} text={text} filteredChain={chain} image={image} off={off} key={`chain-${key}`} maintenance={maintenance} />) : ("")}})
            }
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}
