import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkIfLive } from "./ChainHelper";
import "./Chain.css";
import { useState } from "react";
import Status from "./Status";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
// import { biz } from "../values";

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
        chainType,
    } = props;

    const validatorsInfo = useSelector((state) => state.general.validatorsInfo);
    const testnet = useSelector((state) => state.general.testNet);
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const NONE = { display: "none" };
    const [chainStatus, setChainStatus] = useState(undefined);
    const location = useLocation();
    const departureOrDestination = useSelector(
        (state) => state.general.departureOrDestination
    );
    // const receiveFromSolana = biz && type === "EVM";
    // const sendFromSolana = biz && type === "Solana";
    // const isSolana = filteredChain.type === "Solana";
    // const solanaDepOrDes =
    //     (from && from?.type === "Solana") || (to && to?.type === "Solana");

    useEffect(() => {
        if (testnet) return setChainStatus(true);
        setChainStatus(checkIfLive(nonce, validatorsInfo));
    }, [validatorsInfo]);

    // !! ref
    const getStyle = () => {
        switch (departureOrDestination) {
            case "departure":
                if (to && to?.text === text) return NONE;
                if (to && to?.type === "Solana" && chainType !== "EVM")
                    return OFF;
                if (to && to?.type !== "EVM" && chainType === "Solana")
                    return OFF;
                break;
            case "destination":
                if (from && from?.text === text) return NONE;
                if (from && from?.type === "Solana" && chainType !== "EVM")
                    return OFF;
                if (from && from?.type !== "EVM" && chainType === "Solana")
                    return OFF;
        }

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

    // const getSolanaDepOrDesStyles = () => {
    //     // eslint-disable-next-line no-debugger
    //     // debugger;
    //     switch (departureOrDestination) {
    //         case "departure":
    //             if (to.type === "Solana" && chainType !== "EVM") return OFF;
    //             else if (to.type !== "EVM" && text === "Solana") return OFF;
    //             else return styles();

    //         case "destination":
    //             return from.type === "Solana" && chainType !== "EVM" ? OFF : {};
    //     }
    // };

    return (
        <li
            style={getStyle()}
            onClick={() => chainSelectHandler(filteredChain)}
            className="nftChainItem"
            data-chain={text}
        >
            <img
                className="modalSelectOptionsImage"
                src={image.src}
                alt={text}
            />
            <div className="modalSelectOptionsText">
                {text}
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
    chainType: PropTypes.text,
    nonce: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
