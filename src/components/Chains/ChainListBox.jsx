import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chains, CHAIN_INFO, TESTNET_CHAIN_INFO } from "../../components/values";
import { setChainModal, setDepartureOrDestination, setTo, setFrom, setChainSearch, setSwitchDestination, setValidatorsInf, setSelectedNFTList, cleanSelectedNFTList} from "../../store/reducers/generalSlice";
import Chain from "./Chain"
import ChainSearch from "../Chains/ChainSearch"
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { getAddEthereumChain } from "../../wallet/chains";
import { useLocation } from "react-router-dom";

export default function ChainListBox(props) {
  const dispatch = useDispatch();
  const location = useLocation()
  const departureOrDestination = useSelector((state) => state.general.departureOrDestination);
  const chainSearch = useSelector((state) => state.general.chainSearch);
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const globalTestnet = useSelector((state) => state.general.testNet);
  const show = useSelector((state) => state.general.showChainModal);
  const switchChain = useSelector((state) => state.general.switchDestination);
  const [fromChains, setFromChains] = useState(chains)
  const [toChains, setToChains] = useState(chains)
  const elrondAccount = useSelector(state => state.general.elrondAccount)
  const tezosAccount = useSelector(state => state.general.tezosAccount)
  const algorandAccount = useSelector(state => state.general.algorandAccount)
  const evmAccount = useSelector(state => state.general.account)
  const tronAccount = useSelector(state => state.general.tronWallet)
  const { account } = useWeb3React()
  const testnet = useSelector(state => state.general.testNet)
  const validatorsInfo = useSelector(state => state.general.validatorsInfo)
  const Sync2 = useSelector(state => state.general.Sync2)
  const axios = require('axios')
  

  async function switchNetwork(chain) {
// debugger
    const info = testnet
      ? TESTNET_CHAIN_INFO[chain.key]
      : CHAIN_INFO[chain.key];
    const chainId = `0x${info.chainId.toString(16)}`;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (error) {
      console.log(error);
      try {
        const chain = getAddEthereumChain()[parseInt(chainId).toString()];

        const params = {
          chainId: chainId, // A 0x-prefixed hexadecimal string
          chainName: chain.name,
          nativeCurrency: {
            name: chain.nativeCurrency.name,
            symbol: chain.nativeCurrency.symbol, // 2-6 characters long
            decimals: chain.nativeCurrency.decimals,
          },
          rpcUrls: chain.rpc,
          blockExplorerUrls: [
            chain.explorers &&
            chain.explorers.length > 0 &&
            chain.explorers[0].url
              ? chain.explorers[0].url
              : chain.infoURL,
          ],
        };
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [params, account],
        });
      } catch (error) {
        console.log(error);
      }
    }
  
}


const checkValidators = async () => {
  let res;
  try {
    res = await axios.get("https://bridgestatus.herokuapp.com/status");
  } catch (error) {
    console.error(error);
  }
  if (res?.data) dispatch(setValidatorsInf(res.data));
};

  const handleClose = () => {
    dispatch(setChainModal(false));
    dispatch(setDepartureOrDestination(""));
    dispatch(setSwitchDestination(false));
    dispatch(setChainSearch(""));
  };

  useEffect(async () => {
    if (!validatorsInfo) await checkValidators();
  }, [validatorsInfo]);


  const chainSelectHandler = (chain) => {
    // debugger
        if (departureOrDestination === "departure") {
          if(from && account && (location.pathname === "/account" || location.pathname === "/testnet/account")){
            let temp = from
            dispatch(setFrom(chain));
            dispatch(setTo(temp))
            switchNetwork(chain)
            dispatch(cleanSelectedNFTList())
            handleClose();
          } 
          else if (to && chain.key !== to.key) {
            dispatch(setFrom(chain));
            handleClose();
          }
          else {
            dispatch(setTo(""));
            dispatch(setFrom(chain));
            handleClose();
          }
        }
        else if(location.pathname === "/account" || location.pathname === "/testnet/account"){
          if(chain.chainId === from.chainId){
            let temp = from
            dispatch(setFrom(to));
            switchNetwork(to)
            dispatch(setTo(temp));
            dispatch(cleanSelectedNFTList())
            handleClose();
          }
          else{
            dispatch(setTo(chain));
            handleClose();
          }
        }
        else if (switchChain) {
          dispatch(setTo(chain));
          handleClose();
        } else {
          dispatch(setTo(chain));
          dispatch(setSwitchDestination(false));
          handleClose();
        }
  };
  const nonEVM = tezosAccount || tronAccount || algorandAccount || elrondAccount;
  const showSearch = () => {
    if(nonEVM && !from?.text) return ""
    else return <ChainSearch />
  }

  useEffect(() => {
    // debugger
    let filteredChains = chains
    const withNew = filteredChains.filter(chain => chain.newChain).sort((a, b) => a.order - b.order)
    const withComing = filteredChains.filter( chain => chain.coming && !chain.newChain).sort((a, b) => b.order - a.order)
    const withMaintenance = filteredChains.filter( chain => chain.maintenance && !chain.newChain )
    const noComingNoMaintenance = filteredChains.filter( chain => !chain.coming && !chain.maintenance && !chain.newChain).sort((a, b) => a.order - b.order)
    let sorted = [...withNew, ...noComingNoMaintenance, ...withMaintenance, ...withComing]
    if(chainSearch && departureOrDestination === "departure"){
      sorted = chains.filter(chain => chain.text.toLowerCase().includes(chainSearch.toLowerCase()))
    }
    const onlyElrond = elrondAccount ? sorted.filter( chain => chain.type === "Elrond") : undefined
    const onlyVeChain = evmAccount && Sync2 ? sorted.filter( chain => chain.type === "VeChain") : undefined
    const onlyEVM = evmAccount ? sorted.filter( chain => chain.type === "EVM") : undefined
    const onlyTron = tronAccount ? sorted.filter( chain => chain.type === "Tron") : undefined
    const onlyAlgo = algorandAccount ? sorted.filter( chain => chain.type === "Algorand") : undefined
    const onlyTezos = tezosAccount ? sorted.filter( chain => chain.type === "Tezos") : undefined
    const set = onlyVeChain || onlyElrond || onlyEVM || onlyTron || onlyAlgo || onlyTezos || sorted
    setFromChains(set)

  }, [elrondAccount, tezosAccount, algorandAccount, tronAccount, evmAccount, chainSearch, to])

  useEffect(() => {
    // debugger 
    let filteredChains = chains
    const withNew = filteredChains.filter(chain => chain.newChain).sort((a, b) => a.order - b.order)
    const withComing = filteredChains.filter( chain => chain.coming && !chain.newChain ).sort((a, b) => b.order - a.order)
    const withMaintenance = filteredChains.filter( chain => chain.maintenance && !chain.newChain )
    const noComingNoMaintenance = filteredChains.filter( chain => !chain.coming && !chain.maintenance && !chain.newChain).sort((a, b) => a.order - b.order)
    let sorted = [...withNew, ...noComingNoMaintenance, ...withMaintenance, ...withComing]
    if(chainSearch && departureOrDestination === "destination"){
      sorted = chains.filter(chain => chain.text.toLowerCase().includes(chainSearch.toLowerCase()))
    }
    setToChains(sorted)
  }, [from, chainSearch, departureOrDestination])
  
  useEffect(() => {
    if(from?.text === to?.text && (!location.pathname === "/account" || !location.pathname === "/testnet/account")){
      dispatch(setTo(''))
    }
  }, [to, from]);

 
  

  return (
    <Modal
      animation={false}
      show={show || switchChain}
      onHide={handleClose}
      className="ChainModal"
    >
      <Modal.Header className="text-left">
        <Modal.Title>{`Select ${
          departureOrDestination === "destination" ? "destination" : "departure"
        } chain`}</Modal.Title>
        <span className="CloseModal" onClick={handleClose}>
          <div className="close-modal"></div>
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="nftChainListBox">
          { showSearch() }
          <ul className="nftChainList scrollSty">
            { //! Show only mainnet FROM chains //
              departureOrDestination === "departure" && !globalTestnet && fromChains.map( chain => {
              console.log("🚀 ~ file: ChainListBox.jsx ~ line 219 ~ ChainListBox ~ chain", chain)
                const { image, text, key, coming, newChain, maintenance, mainnet } = chain;
                return (mainnet || coming) && <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={chain} image={image} key={`chain-${key}`}/>
              })
            }
            {//! Show only mainnet TO chains //
              departureOrDestination === "destination" && !globalTestnet && toChains.map( chain => {
                const { image, text, key, coming, newChain, maintenance, mainnet } = chain;
                return (mainnet || coming) && <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={chain} image={image} key={`chain-${key}`}/>
              })
            }
            { //! Show only testnet FROM chains //
              departureOrDestination === "departure" && globalTestnet && fromChains.map( chain => {
                const { image, text, key, coming, newChain, maintenance, testNet } = chain;
                return testNet && <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={chain} image={image} key={`chain-${key}`}/>
              })
            }
            {//! Show only testnet TO chains //
              departureOrDestination === "destination" && globalTestnet && toChains.map( chain => {
                const { image, text, key, coming, newChain, maintenance, testNet } = chain;
                return testNet && <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={chain} image={image} key={`chain-${key}`}/>
              })
            }
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}
