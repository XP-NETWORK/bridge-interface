import PropTypes from "prop-types";
import "./NFTcard.css";
import React from "react";
import { useSelector } from "react-redux";

export const WhitelistButton = ({ whitelist, isNFTWhitelisted }) => {
    const { text } = useSelector((state) => state.general.from);

    const show = text.match(/Polygon|BSC|Ethereum/);

    return !isNFTWhitelisted && show ? (
        <div className="whitelist-btn" onClick={whitelist}>
            Whitelist
        </div>
    ) : null;
};

WhitelistButton.propTypes = {
    isNFTWhitelisted: PropTypes.bool,
    whitelist: PropTypes.func,
};
