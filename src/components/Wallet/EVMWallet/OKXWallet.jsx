import React from "react";
import icon from "../../../assets/img/wallet/okx_wallet_icon.svg";
import HigherEVM from "./HigherEVM";
import { useDispatch } from "react-redux";
import { setEVMProvider, setError } from "../../../store/reducers/generalSlice";
import { isMobile } from "../../../utils";

function OKXWallet() {
    const disaptch = useDispatch();

    const handleconnect = async () => {
        const provider = window.okxwallet;
        if (!provider) {
            if (isMobile.any()) {
                return window.open(
                    `okx://wallet/dapp/details?dappUrl=${window.location.host}${window.location.pathname}`
                );
            }

            return disaptch(setError({ message: "OKX Wallet extension is not installed" }));
        }

        disaptch(setEVMProvider(provider));
    };

    return (
        <li onClick={handleconnect} className="wllListItem" data-wallet={"OKXWallet"}>
            <img src={icon} alt="OKX Wallet Icon" />
            <p>OKX Wallet</p>
        </li>
    );
}

export default HigherEVM(OKXWallet);
