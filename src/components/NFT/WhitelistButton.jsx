import PropTypes from "prop-types";
import "./NFTcard.css";
import React from "react";

export const WhitelistButton = ({ whitelist }) => {
    return (
        <div className="whitelist-btn" onClick={whitelist}>
            Whitelist
        </div>
    );
};

WhitelistButton.propTypes = {
    isNFTWhitelisted: PropTypes.bool,
    whitelist: PropTypes.func,
};
