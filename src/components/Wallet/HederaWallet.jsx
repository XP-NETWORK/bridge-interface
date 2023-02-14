import React from "react";
// import { connectHashpack } from "./ConnectWalletHelper";
import hashpack from "../../assets/img/wallet/hashpack.svg";
import PropTypes from "prop-types";

export default function HederaWallet({ wallet }) {
    const getStyle = () => {
        return { display: "none" };
    };

    const connectHandler = async (wallet) => {
        switch (wallet) {
            case "Hashpack":
                // if (await connectHashpack()) close();
                break;
            default:
                break;
        }
    };

    switch (wallet) {
        case "Hashpack":
            return (
                <li
                    style={getStyle()}
                    onClick={() => connectHandler("Hashpack")}
                    className="wllListItem"
                    data-wallet="Hashpack"
                >
                    <img
                        style={{ width: "28px" }}
                        src={hashpack}
                        alt="Hashpack Icon"
                    />
                    <p>Hashpack</p>
                </li>
            );
        default:
            return (
                <li
                    style={getStyle()}
                    // onClick={() => connectHandler("MetaMask")}
                    className="wllListItem"
                    data-wallet="Blade"
                >
                    {/* <img src={MetaMask} alt="MetaMask Icon" /> */}
                    <p>Blade</p>
                </li>
            );
    }
}
HederaWallet.propTypes = {
    close: PropTypes.any,
    wallet: PropTypes.string,
};
