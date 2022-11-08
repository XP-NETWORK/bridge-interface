import React, { useRef } from "react";
import NftSelect from "../../../assets/img/nftselect.svg";

import { useSelector, useDispatch } from "react-redux";
import { setAccountModal } from "../../../store/reducers/generalSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Tooltip from "./Tooltip";
import { DetectOutsideClick } from "./accountModalHelper";

export default function AccountModal() {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.general.account);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const MetaMask = useSelector((state) => state.general.MetaMask);
    const Keplr = useSelector((state) => state.general.keplrWallet);

    const algorandWallet = useSelector((state) => state.general.AlgorandWallet);
    const trustWallet = useSelector((state) => state.general.trustWallet);
    const onMaiar = useSelector((state) => state.general.onMaiar);
    const show = useSelector((state) => state.general.accountModal);
    const unstoppableDomains = useSelector(
        (state) => state.general.unstoppableDomains
    );

    const tronWallet = useSelector((state) => state.general.tronWallet);
    const algorandAccount = useSelector(
        (state) => state.general.algorandAccount
    );
    const MyAlgo = useSelector((state) => state.general.MyAlgo);
    const tezosAccount = useSelector((state) => state.general.tezosAccount);
    const tonAccount = useSelector((state) => state.general.tonAccount);
    const secretAccount = useSelector((state) => state.general.secretAccount);

    const WalletConnect = useSelector((state) => state.general.WalletConnect);
    const connectedWallet = useSelector(
        (state) => state.general.connectedWallet
    );
    const WCProvider = useSelector((state) => state.general.WCProvider);
    const tronLink = useSelector((state) => state.general.tronLink);
    const templeWallet = useSelector((state) => state.general.templeWallet);
    // const TonWallet = useSelector((state) => state.general.TonWallet);
    const kukaiWallet = useSelector((state) => state.general.kukaiWallet);
    const hederaWallet = useSelector((state) => state.general.hederaWallet);
    const hederaAccount = useSelector((state) => state.general.hederaAccount);
    const currentAccount =
        tonAccount ||
        hederaAccount ||
        account ||
        elrondAccount ||
        algorandAccount ||
        tezosAccount ||
        tronWallet ||
        secretAccount ||
        undefined;

    const handleClose = () => {
        dispatch(setAccountModal(false));
    };

    const accountModal = useRef(null);

    const connectedWith = () => {
        if (MetaMask) return "MetaMask";
        if (connectedWallet) return connectedWallet;
        else if (unstoppableDomains) return "Unstoppable Domains";
        else if (onMaiar) return "Maiar Wallet";
        else if (trustWallet) return "Trust Wallet";
        else if (algorandWallet) return "Algorand Wallet";
        else if (MyAlgo) return "MyAlgo";
        else if (tronLink) return "Tron Link";
        else if (templeWallet) return "Temple Wallet";
        else if (kukaiWallet) return "Beacon";
        else if (Keplr) return "Keplr";
        else if (hederaWallet) {
            return hederaWallet === "HashPack" ? "HashPack" : "Blade";
        } else if (WalletConnect)
            return `${WCProvider.walletConnectProvider.signer.connection.wc._peerMeta.name} (WalletConnect)`;
    };

    DetectOutsideClick(accountModal, () =>
        setTimeout(() => handleClose(), 100)
    );
    // ! ref
    return show ? (
        <div
            ref={accountModal}
            className="accountBox"
            // show={show}
            // onHide={handleClose}
        >
            <div className="accountTit">
                Account{" "}
                <span className="CloseModal" onClick={handleClose}>
                    <div className="close-modal"></div>
                </span>
            </div>
            <p>{connectedWith()}</p>

            <CopyToClipboard text={currentAccount}>
                <div className="account-modal__account">
                    <img src={NftSelect} alt="#" />
                    {currentAccount &&
                        `${currentAccount.substring(
                            0,
                            10
                        )}...${currentAccount.substring(
                            currentAccount.length - 2
                        )}`}
                    <Tooltip />
                </div>
            </CopyToClipboard>
            <div className="accountBtn">
                <button
                    onClick={() => window.location.reload()}
                    className="changeBtn"
                >
                    Disconnect
                </button>
            </div>
        </div>
    ) : (
        ""
    );
}
