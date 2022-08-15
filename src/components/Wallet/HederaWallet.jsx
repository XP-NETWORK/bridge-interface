import React from "react";

export default function HederaWallet({ wallet }) {
    switch (wallet) {
        case "Hashpack":
            return (
                <li
                    // style={getStyle()}
                    // onClick={() => connectHandler("MetaMask")}
                    className="wllListItem"
                    data-wallet="Hashpack"
                >
                    {/* <img src={MetaMask} alt="MetaMask Icon" /> */}
                    <p>Hashpack</p>
                </li>
            );
        default:
            return (
                <li
                    // style={getStyle()}
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
