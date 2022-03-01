import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkIfLive } from "./ChainHelper";
import "./Chain.css";
import { useState } from "react";


export default function Chain(props) {
  const { filteredChain, chainSelectHandler, text, image, coming, newChain, chainKey, maintenance} = props
  const validatorsInfo = useSelector((state) => state.general.validatorsInfo);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const [chainStatus, setChainStatus] = useState(undefined)


  useEffect(() => {
    setChainStatus(checkIfLive(chainKey, validatorsInfo))
  }, [validatorsInfo]);

  return (
    <li
      style={maintenance || !checkIfLive(chainKey, validatorsInfo) || coming ? OFF : {}}
      onClick={() => chainSelectHandler(filteredChain)}
      className="nftChainItem"
      data-chain={text}
    >
      <img className="modalSelectOptionsImage" src={image.src} alt={text} />
      <div className="modalSelectOptionsText">
        {text === "xDai" ? "Gnosis Chain" : text}
        <div className="chain--identifier"> 
          {(chainStatus === undefined && !coming && !maintenance) ? <div className="chain-connecting">Connecting...</div>
          :(!chainStatus && !coming && !maintenance) && <div className="chain__off">Offline</div>}
          {/* {!checkIfLive(chainKey, validatorsInfo) && !coming && <div className="chain__off">Offline</div>} */}
          {coming && <div className="coming-chain">Coming</div>}
          {maintenance && <div className="coming-chain">Maintenance</div>}
          {!maintenance && newChain && <div className="new-chain">New</div>}
        </div>
      </div>
    </li>
  );
}