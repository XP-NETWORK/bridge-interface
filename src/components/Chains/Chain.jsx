import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkIfLive } from "./ChainHelper";
import "./Chain.css";
import { useState } from "react";
import Status from "./Status";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Chain(props) {
  const {
    filteredChain,
    chainSelectHandler,
    text,
    image,
    coming,
    newChain,
    maintenance,
    updated,
    nonce,
  } = props;
  const validatorsInfo = useSelector((state) => state.general.validatorsInfo);
  const testnet = useSelector((state) => state.general.testNet);
  const from = useSelector((state) => state.general.from);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const NONE = { display: "none" };
  const [chainStatus, setChainStatus] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    if (testnet) return setChainStatus(true);
    setChainStatus(checkIfLive(nonce, validatorsInfo));
  }, [validatorsInfo]);

  // !! ref
  const getStyle = () => {
    if (
      (location.pathname.includes("testnet")
        ? false
        : !checkIfLive(nonce, validatorsInfo)) ||
      coming
    ) {
      return OFF;
    } else if (
      (location.pathname === "/testnet/account" ||
        location.pathname === "/account" ||
        location.pathname === "/" ||
        location.pathname.includes("testnet")) &&
      from?.text === text &&
      from.type !== "EVM"
    ) {
      return NONE;
    } else if (
      (location.pathname === "/testnet/connect" ||
        location.pathname === "/connect" ||
        location.pathname === "/" ||
        location.pathname.includes("testnet")) &&
      text === from?.text
    ) {
      return NONE;
    } else return {};
  };

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
          {chainStatus === undefined && !coming && !maintenance ? (
            <Status status={"connecting"} />
          ) : (
            !chainStatus &&
            !coming &&
            !maintenance && <Status status={"off-line"} />
          )}
          {coming && <Status status={"coming"} />}
          {maintenance && <Status status={"maintenance"} />}
          {updated && <Status status={"updated"} />}
          {!maintenance && newChain && <Status status={"new"} />}
        </div>
      </div>
    </li>
  );
}

Chain.propTypes = {
  filteredChain: PropTypes.any,
  chainSelectHandler: PropTypes.any,
  text: PropTypes.string,
  image: PropTypes.object,
  coming: PropTypes.bool,
  newChain: PropTypes.bool,
  chainKey: PropTypes.string,
  maintenance: PropTypes.bool,
  updated: PropTypes.bool,
  nonce: PropTypes.number,
};
