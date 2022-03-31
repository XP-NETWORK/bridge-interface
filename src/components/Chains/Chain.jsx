import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkIfLive } from "./ChainHelper";
import "./Chain.css";
import { useState } from "react";
import Status from "./Status";


export default function Chain(props) {
  const { filteredChain, chainSelectHandler, text, image, coming, newChain, chainKey, maintenance} = props
  const validatorsInfo = useSelector((state) => state.general.validatorsInfo);
  const OFF = { pointerEvents: "none" };
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
        {text === "xDai" ? "Gnosis" : text}
        <div className="chain--identifier"> 
          {(chainStatus === undefined && !coming && !maintenance) ? <Status status={"connecting"} />
          :(!chainStatus && !coming && !maintenance) && <Status status={"off-line"} /> }
          {coming && <Status status={"coming"} />}
          {maintenance && <Status status={"maintenance"} />}
          {!maintenance && newChain && <Status status={"new"} />}
        </div>
      </div>
    </li>
  );
}