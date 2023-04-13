import { React, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    setAlert,
    setQrCodeString,
    setShowAbout,
    setShowVideo,
    setTemporaryFrom,
    setUnstoppableDomainsIsSelected,
    setWalletsModal,
} from "../../store/reducers/generalSlice";
import { useAccount } from "wagmi";
import WalletList from "./WalletList";
import { useNavigate, useLocation } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useDidUpdateEffect } from "../Settings/hooks";
import Web3 from "web3";
import { switchNetwork } from "../../services/chains/evm/evmService";
import { getRightPath } from "../../wallet/helpers";
import { useWeb3Modal } from "@web3modal/react";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";

function ConnectWallet() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [walletSearch, setWalletSearch] = useState("");

    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    let [show, setShow] = useState();
    const qrCodeImage = useSelector((state) => state.general.qrCodeImage);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const tezosAccount = useSelector((state) => state.general.tezosAccount);
    const secretAccount = useSelector((state) => state.general.secretAccount);
    const tonQRCodeModal = useSelector((state) => state.tonStore.qrCode);
    let unstoppableDomainsIsSelected = useSelector((state) => state.general.unstoppableDomainsIsSelected);
    const unstoppableDomains = useSelector(
        (state) => state.general.unstoppableDomains
    );
    const algorandAccount = useSelector(
        (state) => state.general.algorandAccount
    );
    const evmAccount = useSelector((state) => state.general.account);
    const tronAccount = useSelector((state) => state.general.tronWallet);
    const tonAccount = useSelector((state) => state.general.tonAccount);
    const connectedWallet = useSelector(
        (state) => state.general.connectedWallet
    );

    const algorandAddresses = useSelector(
        (state) => state.general.algorandAddresses
    );

    const hederaAccount = useSelector((state) => state.general.hederaAccount);
    const bitKeep = useSelector((state) => state.general.bitKeep);
    const { address } = useAccount();

    const { account, chainId } = useWeb3React();
    const { isOpen } = useWeb3Modal();

    const inputElement = useRef(null);

    useEffect(() => {
        if (unstoppableDomainsIsSelected) {
            setShow(false);
            setWalletsModal(false)
            dispatch(setUnstoppableDomainsIsSelected(false))
        }
    }, [unstoppableDomainsIsSelected]);

    let connected =
        algorandAddresses.length ||
        tonAccount ||
        hederaAccount ||
        secretAccount ||
        elrondAccount ||
        tezosAccount ||
        algorandAccount ||
        evmAccount ||
        tronAccount ||
        account ||
        address && account ? true: false;



    const handleClose = () => {
        setShow(false);
        setWalletSearch("");
        dispatch(setWalletsModal(false));
        dispatch(setUnstoppableDomainsIsSelected(false))
        if (qrCodeImage) {
            dispatch(setQrCodeString(""));
        }
        dispatch(setTemporaryFrom(""));
    };

    let walletsModal = useSelector((state) => state.general.walletsModal);

 

   
    const connectionMethod = async () => {
      handleGA4Event(
        googleAnalyticsCategories.Connect,
        `Clicked on connect. destination chain: ${from}`
      );
      let provider;
      let _chainId;
      if (bitKeep) {
        provider = window.bitkeep?.ethereum;
        await provider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(provider);
        _chainId = await web3.eth.getChainId();
      }
      const chainID = chainId || _chainId;

      switch (true) {
        case connectedWallet === "WalletConnect":
          navigate(`/account${location.search ? location.search : ""}`);
          break;
        case unstoppableDomains:
          navigate(`/account${location.search ? location.search : ""}`);
          break;
        case from.tnChainId === chainID:
          navigate(`${getRightPath()}`);
          break;
        case from.chainId === chainID: {
          navigate(`${getRightPath()}`);
          break;
        }
        case from.type !== "EVM":
          navigate(`${getRightPath()}`);
          break;
        default: {
          switchNetwork(from).then(()=>{
            navigate(`${getRightPath()}`);
          })
          break;
        }
      }
    };

    const handleConnect = async () => {
      if (from && to) {
        if (!connected) {
          setShow(true);
        } else {
          connectionMethod();
        }
      } else {
        dispatch(setAlert(true));
      }
    };

    function handleAboutClick() {
        handleGA4Event(googleAnalyticsCategories.Content, "About text.");
        dispatch(setShowAbout(true));
    }

    const handleChange = (e) => {
        if (!(e.nativeEvent.data === " " && walletSearch.length === 0)) {
            setWalletSearch(e.target.value);
        }
    };
    function handleVideoClick() {
        handleGA4Event(googleAnalyticsCategories.Content, "About video.");
        dispatch(setShowVideo(true));
    }

    useDidUpdateEffect(() => {
        inputElement?.current?.focus();
    }, [show, walletsModal]);

    useEffect(() => {
        setShow(false);
    }, [tonQRCodeModal, qrCodeImage, connected]);

    useEffect(() => {
        if (isOpen) setShow(false);
    }, [isOpen]);

    useEffect(() => {
        if (evmAccount) setShow(false);
    }, [evmAccount]);




    return (
        <div>
            <div
                onClick={
                    handleConnect
                }
                className={
                    from && to
                        ? "connect-wallet__button"
                        : "connect-wallet__button--disabled"
                }
            >
                Continue Bridging
            </div>
            <div id="aboutnft" className="aboutNft">
                <div
                    onClick={handleVideoClick}
                    className="about-btn about-video"
                >
                    Learn how to use NFT bridge
                </div>
                <div
                    onClick={() => handleAboutClick()}
                    className="about-btn about-text"
                >
                    What is NFT
                </div>
            </div>
            {/* {!qrCodeString && ( */}
            <Modal
                show={show || walletsModal}
                onHide={handleClose}
                animation={null}
                className="ChainModal wallet-modal"
            >
                <Modal.Header>
                    <Modal.Title style={{ minWidth: "max-content" }}>
                        Connect Wallet
                    </Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                        <div className="close-modal"></div>
                    </span>
                </Modal.Header>
                <div className="wallet-search__container">
                    <input
                        ref={inputElement}
                        onChange={handleChange}
                        value={walletSearch}
                        className="wallet-search serchInput"
                        type="text"
                        placeholder="Search"
                    />
                    <div className="magnify"></div>
                </div>
                <Modal.Body>
                    <div className="walletListBox">
                        <WalletList
                            input={walletSearch}
                            connected={handleClose}
                        />
                    </div>
                </Modal.Body>
            </Modal>
            {/* )} */}
            {/* {qrCodeString && (
                <MaiarModal
                    handleClose={handleClose}
                    strQR={qrCodeImage}
                    qrCodeString={qrCodeString}
                    setShow={setShow}
                    show={show}
                />
            )} */}
        </div>
    );
}
//
export default ConnectWallet;
