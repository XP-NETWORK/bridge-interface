import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CHAIN_INFO } from "../../components/values";
import "./Chain.css";


export default function Chain(props) {
  const { filteredChain, chainSelectHandler, text, image, coming, newChain, chainKey, maintenance} = props
  const validatorsInfo = useSelector((state) => state.general.validatorsInfo);
  const checkIfLive = (chain) => {
    const nonce = CHAIN_INFO[chain]?.nonce;
    if (validatorsInfo) {
      return validatorsInfo[nonce]?.bridge_alive;
    }
  };

  useEffect(() => {}, [validatorsInfo]);

  const OFF = { opacity: 0.6, pointerEvents: "none" };

  return (
    <li
      style={maintenance || !checkIfLive(chainKey) || coming ? OFF : {}}
      onClick={() => chainSelectHandler(filteredChain)}
      className="nftChainItem"
      data-chain={text}
    >
      <img className="modalSelectOptionsImage" src={image.src} alt={text} />
      <div className="modalSelectOptionsText">
        {text === "xDai" ? "Gnosis Chain" : text}
        <div className="chain--identifier"> 
          {!checkIfLive(chainKey) && !coming && <div className="chain__off">Offline</div>}
          {coming && <div className="coming-chain">Coming</div>}
          {maintenance && <div className="coming-chain">Maintenance</div>}
          {newChain && <div className="new-chain">New</div>}
        </div>
      </div>
    </li>
  );
}