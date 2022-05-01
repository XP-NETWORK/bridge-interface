import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkIfLive } from "./ChainHelper";
import "./Chain.css";
import { useState } from "react";
import Status from "./Status";
import { useLocation } from "react-router-dom";


export default function Chain(props) {
  const { filteredChain, chainSelectHandler, text, image, coming, newChain, chainKey, maintenance} = props
  const validatorsInfo = useSelector((state) => state.general.validatorsInfo);
  const testnet = useSelector((state) => state.general.testNet);
  const to = useSelector((state) => state.general.to);
  const OFF = { opacity: 0.6 ,pointerEvents: "none" };
  const [chainStatus, setChainStatus] = useState(undefined)
  const location = useLocation()


  useEffect(() => {
    setChainStatus(checkIfLive(chainKey, validatorsInfo))
  }, [validatorsInfo]);

  const algoStyle = {}

  const getStyle = () => {
 if(maintenance || maintenance || !checkIfLive(chainKey, validatorsInfo) || coming ){
      return OFF
    }
    else if((location.pathname === "/testnet/account" ||location.pathname === "/account") && text === to.text){
      return OFF
    }
    else return {}
  }

  return (
    <li
      style={getStyle()}
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
          {maintenance  && <Status status={"maintenance"} />}
          {!maintenance && newChain && <Status status={"new"} />}
        </div>
      </div>
    </li>
  );
}