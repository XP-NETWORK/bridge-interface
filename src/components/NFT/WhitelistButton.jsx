import PropTypes from "prop-types";
import "./NFTcard.css";
import React from "react";
import { useSelector } from "react-redux";
// import { biz } from "../values";

export const WhitelistButton = ({ whitelist, isNFTWhitelisted }) => {
    const { text } = useSelector((state) => state.general.from);
    const testnet = useSelector((state) => state.general.testNet);
    // const show = text.match(/Polygon|BSC|Ethereum/);

    const show = () => {
        let networks = text.match(
            /Polygon|BSC|Ethereum|Phantom|Avalanche|Moonbeam/
        );
        return networks;
    };

    return !isNFTWhitelisted && show ? (
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
