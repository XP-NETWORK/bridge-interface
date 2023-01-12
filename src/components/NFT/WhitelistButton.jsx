import PropTypes from "prop-types";
import "./NFTcard.css";
import React from "react";
import { useSelector } from "react-redux";
import { biz } from "../values";

export const WhitelistButton = ({ whitelist, isNFTWhitelisted }) => {
  const { text } = useSelector((state) => state.general.from);

  // const show = text.match(/Polygon|BSC|Ethereum/);

  const show = biz && text.match(/Polygon|BSC|Ethereum|Phantom|Avalanche/)

  /*const show = () => {
    let networks;
    switch (biz) {
      case true:
        networks = text.match(/Polygon|BSC|Ethereum|Phantom|Avalanche/);
        break;

      default:
        networks = text.match(/Polygon|BSC|Ethereum/);
        break;
    }
    return networks;
  };*/

  return !isNFTWhitelisted && show ? (
    <div
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
