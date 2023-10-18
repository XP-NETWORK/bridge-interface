import React from "react";
import icon from "../../../assets/img/wallet/okx_wallet_icon.svg";
import HigherEVM from "./HigherEVM";
import { useDispatch, useSelector } from "react-redux";
import { setEVMProvider, setError } from "../../../store/reducers/generalSlice";
import { switchNetwork } from "../../../services/chains/evm/evmService";

function OKXWallet({ styles, key }) {
    const disaptch = useDispatch();
    const from = useSelector((state) => state.general.from);

    const handleconnect = async () => {
        const provider = window.okxwallet;
        if (!provider) {
            return disaptch(
                setError({ message: "OKX Wallet extension is not installed" })
            );
        }
        from && (await switchNetwork(from));
        disaptch(setEVMProvider(provider));
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
