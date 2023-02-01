import PropTypes from "prop-types";
import "./NFTcard.css";
import React from "react";
import { useSelector } from "react-redux";
// import { biz } from "../values";

export const WhitelistButton = ({ whitelist, isNFTWhitelisted }) => {
    const { text, testNet } = useSelector((state) => state.general.from);

    // const show = text.match(/Polygon|BSC|Ethereum/);

    const show = () => {
        let networks = text.match(
            /Polygon|BSC|Ethereum|Phantom|Avalanche|Moonbeam/
        );
        return networks;
    };

    return !isNFTWhitelisted && show ? (
        <div
            style={{ display: testNet ? "none" : "auto" }}
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
