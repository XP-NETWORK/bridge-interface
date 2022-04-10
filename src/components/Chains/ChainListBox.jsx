import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chains, CHAIN_INFO, TESTNET_CHAIN_INFO } from "../../components/values";
import {
  setChainModal,
  setDepartureOrDestination,
  setTo,
  setFrom,
  setChainSearch,
  setSwitchDestination,
  setWrongNetwork,
} from "../../store/reducers/generalSlice";
import Chain from "./Chain"
import ChainSearch from "../Chains/ChainSearch"
import { Modal } from "react-bootstrap";

import { useState } from "react";
import { filterChains } from "./ChainHelper";
import { useWeb3React } from "@web3-react/core";
import { chainsConfig } from "..//values"
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
  const widget = useSelector((state) => state.general.widget);
  const [fromChains, setFromChains] = useState(chains)
  const [toChains, setToChains] = useState(chains)
  const elrondAccount = useSelector(state => state.general.elrondAccount)
  const tezosAccount = useSelector(state => state.general.tezosAccount)
  const algorandAccount = useSelector(state => state.general.algorandAccount)
  const evmAccount = useSelector(state => state.general.account)
  const tronAccount = useSelector(state => state.general.tronWallet)
  const walletconnect = useSelector(state => state.general.WalletConnect)
  const { chainId, account } = useWeb3React()
  const testnet = useSelector(state => state.general.testNet)

  
  async function switchNetwork(chain) {

      const info = testnet
        ? TESTNET_CHAIN_INFO[chain?.key]
        : CHAIN_INFO[chain?.key];
      const chainId = `0x${info.chainId.toString(16)}`;

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      } catch (error) {
        console.log(error);
        try {
          const toHex = (num) => {
            return "0x" + num.toString(16);
          };
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

  const handleClose = () => {
    dispatch(setChainModal(false));
    dispatch(setDepartureOrDestination(""));
    dispatch(setSwitchDestination(false));
    dispatch(setChainSearch(""));
  };


  const chainSelectHandler = (chain) => {
    // debugger
        if (departureOrDestination === "departure") {
          if(from && account){
            dispatch(setFrom(chain));
            switchNetwork(chain)
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
        } else if (switchChain) {
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
    const withNew = chains.filter(chain => chain.newChain).sort((a, b) => a.order - b.order)
    const withComing = chains.filter( chain => chain.coming && !chain.newChain )
    const withMaintenance = chains.filter( chain => chain.maintenance && !chain.newChain )
    const noComingNoMaintenance = chains.filter( chain => !chain.coming && !chain.maintenance && !chain.newChain).sort((a, b) => a.order - b.order)
    const sorted = [...withNew, ...noComingNoMaintenance, ...withMaintenance, ...withComing]

    const onlyElrond = elrondAccount ? sorted.filter( chain => chain.type === "Elrond") : undefined
    const onlyEVM = evmAccount ? sorted.filter( chain => chain.type === "EVM") : undefined
    const onlyTron = tronAccount ? sorted.filter( chain => chain.type === "Tron") : undefined
    const onlyAlgo = algorandAccount ? sorted.filter( chain => chain.type === "Algorand") : undefined
    const onlyTezos = tezosAccount ? sorted.filter( chain => chain.type === "Tezos") : undefined

    setFromChains(onlyElrond || onlyEVM || onlyTron || onlyAlgo || onlyTezos || sorted)
  }, [elrondAccount, tezosAccount, algorandAccount, tronAccount, evmAccount])

  useEffect(() => {
    
    if(from && from.type === "EVM"){
      const c = chains.filter(chain => from.type === "EVM" && chain.type === "EVM")
      setToChains(filterChains(c, from.text))
    }
    else if(from)setToChains(filterChains(chains, from.text))
    if(from?.text === to?.text && (location.pathname === "/connect" || location.pathname === "/testnet/connect")){
      dispatch(setTo(''))
    }
    else if(from?.text === to?.text && location.pathname === '/account'){
      dispatch(setWrongNetwork(true))
    }
  }, [from])
  
  useEffect(() => {
    if(from?.text === to?.text){
      dispatch(setTo(''))
    }
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
          <div className="close-modal"></div>
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="nftChainListBox">
          { showSearch() }
          <ul className="nftChainList scrollSty">
            {!from ? fromChains
            .filter((chain) => chain.text.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : "") )
            .map((filteredChain, index) => {
            const { image, text, key, coming, newChain, maintenance, testNet, mainnet } = filteredChain;
            return globalTestnet ? testNet && <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={filteredChain} image={image} key={`chain-${key}`}/>
            : (mainnet || coming) && <Chain chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={filteredChain} image={image} key={`chain-${key}`}/>})
            
            : toChains
            // .filter(chain => from && from.type === "EVM" && chain.type === "EVM" && location.pathname === "/connect")//??
            .filter( chain => chain.key.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : "") && (chain.text?.toLowerCase() !== to.text?.toLowerCase()) )
            .sort((chain) => {
              if(chain.coming) return 1
              else if(chain.maintenance) return 0
              else if(!chain.coming) return -1
            }).sort((a, b) => a.order - b.order)
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
