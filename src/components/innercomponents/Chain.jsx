import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CHAIN_INFO } from "../../components/values";
import "./Chain.css";


export default function Chain(props) {
  const { filteredChain, chainSelectHandler, text, image, coming, newChain, chainKey, maintenance, off } = props
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
      style={maintenance || !checkIfLive(chainKey) ? OFF : {}}
      onClick={() => chainSelectHandler(filteredChain)}
      className="nftChainItem"
      data-chain={text}
    >
      <img className="modalSelectOptionsImage" src={image.src} alt={text} />
      <div className="modalSelectOptionsText">
        {text === "xDai" ? "Gnosis Chain" : text}
        {maintenance ? <div className="coming-chain">Maintenance</div> : ""}
        {/* {coming && <div className="coming-chain">Coming</div>} */}
        {!checkIfLive(chainKey) && !coming && (
          <div className="chain__off">Offline</div>
        )}
        {newChain && <div className="new-chain">New</div>}
      </div>
    </li>
  );
}
