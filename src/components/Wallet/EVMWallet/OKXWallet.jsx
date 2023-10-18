import React from "react";
import icon from "../../../assets/img/wallet/okx_wallet_icon.svg";
import HigherEVM from "./HigherEVM";
import { useDispatch } from "react-redux";
import { setEVMProvider, setError } from "../../../store/reducers/generalSlice";

function OKXWallet({ styles, key }) {
    const disaptch = useDispatch();

    const handleconnect = () => {
        if (!window.okxwallet) {
            return disaptch(
                setError({ message: "OKX Wallet extension is not installed" })
            );
        }
        disaptch(setEVMProvider(window.okxwallet));
    };

    return (
        <li
            style={styles()}
            onClick={handleconnect}
            className="wllListItem"
            data-wallet={key}
        >
            <img src={icon} alt="OKX Wallet Icon" />
            <p>OKX Wallet</p>
        </li>
    );
}

export default HigherEVM(OKXWallet);
