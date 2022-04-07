import React, { useRef, useState } from "react";
import NftSelect from "../../../assets/img/nftselect.svg";
import Close from "../../../assets/img/icons/close.svg";
import { ReactComponent as CloseComp } from "../../../assets/img/icons/close.svg";
import FileCopy from "../../../assets/img/icons/FileCopy.svg";
import CopyHover from "../../../assets/img/icons/CopyHover.svg";
import { useSelector, useDispatch } from "react-redux";
import { setAccountModal, setReset } from "../../../store/reducers/generalSlice";
import { DetectOutsideClick } from "../../../components/helpers";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CHAIN_INFO } from "../../../components/values";
import { getAddEthereumChain } from "../../../wallet/chains";
import Tooltip from "./Tooltip";

export default function AccountModal() {
  const widget = new URLSearchParams(window.location.search).get("widget");
  const dispatch = useDispatch();
  const account = useSelector((state) => state.general.account);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const MetaMask = useSelector((state) => state.general.MetaMask);
  const algorandWallet = useSelector((state) => state.general.AlgorandWallet);
  const trustWallet = useSelector((state) => state.general.trustWallet);
  const onMaiar = useSelector((state) => state.general.onMaiar);
  const show = useSelector((state) => state.general.accountModal);
  const [copyIconHover, setCopyIconHover] = useState();
  const [copied, setCopied] = useState();
  const from = useSelector((state) => state.general.from);

  const tronWallet = useSelector((state) => state.general.tronWallet);
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const MyAlgo = useSelector((state) => state.general.MyAlgo);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const WalletConnect = useSelector((state) => state.general.WalletConnect);
  const WCProvider = useSelector((state) => state.general.WCProvider);
  const tronLink = useSelector((state) => state.general.tronLink);
  const templeWallet = useSelector((state) => state.general.templeWallet);
  const kukaiWallet = useSelector((state) => state.general.kukaiWallet);
  const currentAccount = account || elrondAccount || algorandAccount || tezosAccount || tronWallet || undefined
  

  const handleClose = () => {
    dispatch(setAccountModal(false));
  };

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const accountModal = useRef(null);

  function handleDisconnect() {
    // window.ethereum.request({
    //   method: "disconnect"
    // })
  }

  async function switchNetwork() {
    const info = CHAIN_INFO[from?.key];
    const chainId = `0x${info.chainId.toString(16)}`;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (error) {
      console.log(error);
      try {
        const toHex = (num) => {
          return "0x" + num.toString(16);
        };
        const chain = getAddEthereumChain()[parseInt(chainId).toString()];
        const params = {
          chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
          chainName: chain.name,
          nativeCurrency: {
            name: chain.nativeCurrency.name,
            symbol: chain.nativeCurrency.symbol, // 2-6 characters long
            decimals: chain.nativeCurrency.decimals,
          },
          rpcUrls: chain.rpc,
          blockExplorerUrls: [
            chain.explorers &&
            chain.explorers.length > 0 &&
            chain.explorers[0].url
              ? chain.explorers[0].url
              : chain.infoURL,
          ],
        };
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [params, account],
        });
      } catch (error) {
        console.log(error);
      }
    }
  }


  const connectedWith = () => {
    if (MetaMask) return "MetaMask";
    else if (onMaiar) return "Maiar Wallet";
    else if (trustWallet) return "Trust Wallet";
    else if (algorandWallet) return "Algorand Wallet";
    else if (MyAlgo) return "MyAlgo";
    else if (tronLink) return "Tron Link";
    else if (templeWallet) return "Temple Wallet";
    else if (kukaiWallet) return "Beacon";
    else if (WalletConnect)
      return `${WCProvider.walletConnectProvider.signer.connection.wc._peerMeta.name} (WalletConnect)`;
  };

  DetectOutsideClick(accountModal, () => setTimeout(() => handleClose(), 100));
  console.log(currentAccount, 'acc');
  return show ? (
    <div
      ref={accountModal}
      className="accountBox"
      show={show}
      onHide={handleClose}
    >
      <div className="accountTit">
        Account{" "}
        <span className="CloseModal" onClick={handleClose}>
          <div className="close-modal"></div>
        </span>
      </div>
      <p className="">{connectedWith()}</p>

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
        {/* <button onClick={() => switchNetwork()} className="changeBtn disabled">
          Change Network
        </button> */}
        <button onClick={() => window.location.reload()} className="changeBtn">
          Disconnect
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
