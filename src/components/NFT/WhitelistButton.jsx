import PropTypes from "prop-types";
import "./NFTcard.css";
import React from 'react'

export const WhitelistButton = ({
  isNFTWhitelisted = false,
  onClick = () => {},
}) => {
  return isNFTWhitelisted ? null : (
    <div className="new-chain nft__whitelisted-btn" onClick={onClick} >
      Whitelist
    </div>
  );
};

WhitelistButton.propTypes = {
  isNFTWhitelisted: PropTypes.bool,
  onClick: PropTypes.func,
};