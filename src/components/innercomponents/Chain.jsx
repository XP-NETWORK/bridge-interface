import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { chains, CHAIN_INFO } from "../../components/values";
import "./Chain.css";

export default function Chain({
  filteredChain,
  chainSelectHandler,
  text,
  image,
  key,
  coming,
  bridge_live,
  newChain,
  chainKey
}) {
  const validatorsInfo = useSelector((state) => state.general.validatorsInfo);
  // console.log("key: ", chainKey)
  const checkIfLive = (chain) => {
    // let c = chain === "GnosisChain" ? "xDai" : chain
    const nonce = CHAIN_INFO[chain]?.nonce;
    // console.log("nonce: ", nonce)
    if (validatorsInfo) {
      return validatorsInfo[nonce]?.bridge_alive;
    }
  };

  useEffect(() => {}, [validatorsInfo]);

  const OFF = { opacity: 0.6, pointerEvents: "none" };
  return (
    // style={ coming || !checkIfLive(text) ? OFF : {}}
    <li
      style={coming || !checkIfLive(chainKey) ? OFF : {}}
      onClick={() => chainSelectHandler(filteredChain)}
      className="nftChainItem"
      data-chain={text}
    >
      <img className="modalSelectOptionsImage" src={image.src} alt={text} />
      <div className="modalSelectOptionsText">
        {text === "xDai" ? "Gnosis Chain" : text}
        {coming ? <div className="coming-chain">Coming soon</div> : ""}
        {!checkIfLive(chainKey) && !coming && (
          <div className="chain__off">Offline</div>
        )}
        {newChain && <div className="new-chain">New</div>}
      </div>
    </li>
  );
}
