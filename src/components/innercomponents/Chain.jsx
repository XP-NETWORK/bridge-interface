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
  chainKey,
  maintenance
}) {
  const validatorsInfo = useSelector((state) => state.general.validatorsInfo);
  const checkIfLive = (chain) => {
    console.log(chain)
    const nonce = CHAIN_INFO[chain]?.nonce;
    console.log(CHAIN_INFO[chain])
    if (validatorsInfo) {
      return validatorsInfo[nonce]?.bridge_alive;
    }
  };
  console.log("key: ", key)
  console.log("chainKey: ", chainKey)

  useEffect(() => {}, [validatorsInfo]);
  useEffect(() => {console.log("rendered!!!")},)
  
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
        {!checkIfLive(chainKey) && !coming && (
          <div className="chain__off">Offline</div>
        )}
        {newChain && <div className="new-chain">New</div>}
      </div>
    </li>
  );
}
