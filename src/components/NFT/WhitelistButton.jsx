import PropTypes from "prop-types";
import "./NFTcard.css";
import React from "react";
import { useSelector } from "react-redux";
// import { biz } from "../values";

export const WhitelistButton = ({ whitelist, isNFTWhitelisted }) => {
  const { text } = useSelector((state) => state.general.from);
  let networks = text.match(
    /Polygon|BSC|Ethereum|Energi|Fantom|Harmony|Caduceus|Velas|Avalanche|ABEY|Moonbeam/
    /*SKALE|Godwoken|GateChain|Fuse|Gnosis|Velas|Harmony|Caduceus|Arbitrum|MultiversX*/
  );
  const testnet = useSelector((state) => state.general.testNet);
  return !isNFTWhitelisted && networks ? (
    <div
      style={{ display: testnet ? "none" : "" }}
      // style={{ display: "none" }}
      className="whitelist-btn"
      onClick={whitelist}
    >
      Whitelist
    </div>
  ) : null;
};

WhitelistButton.propTypes = {
  isNFTWhitelisted: PropTypes.bool,
  whitelist: PropTypes.func,
};
