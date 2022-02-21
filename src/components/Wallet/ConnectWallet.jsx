import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Close from "../../assets/img/icons/close.svg";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import NFTworng from "../../components/NFTworng";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { algoConnector } from "../../wallet/connectors";
import {
  setAccount,
  setAlgorandWallet,
  setStep,
  setWrongNetwork,
  setAlgorandAccount,
  setQrCodeString,
} from "../../store/reducers/generalSlice";
import { CHAIN_INFO, TESTNET_CHAIN_INFO } from "../values";
import MaiarModal from "../MaiarModal";
import EVMWallet from "./EVMWallet";
import TezosWallet from "./TezosWallet";
import AlgorandWallet from "./AlgorandWallet";
import TronWallet from "./TronWallet";
import ElrondWallet from "./ElrondWallet";
import USBWallet from "./USBWallet";

function ConnectWallet() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const [show, setShow] = useState();
  const qrCodeString = useSelector((state) => state.general.qrCodeString);
  const qrCodeImage = useSelector((state) => state.general.qrCodeImage);
  const handleClose = () => {
    setShow(false);
    if (qrCodeImage) {
      dispatch(setQrCodeString(""));
    }
  };
  const handleShow = () => setShow(true);
  const kukaiWallet = useSelector((state) => state.general.kukaiWallet);
  const templeWallet = useSelector((state) => state.general.templeWallet);
  const metaMask = useSelector((state) => state.general.MetaMask);
  const tronLink = useSelector((state) => state.general.tronLink);
  const trustWallet = useSelector((state) => state.general.trustWallet);
  const AlgoSigner = useSelector((state) => state.general.AlgoSigner);
  const algorandWallet = useSelector((state) => state.general.AlgorandWallet);
  const onWC = useSelector((state) => state.general.WalletConnect);
  const MaiarWallet = useSelector((state) => state.general.onMaiar);
  const { chainId, account } = useWeb3React();
  const testnet = useSelector((state) => state.general.testNet);
  const MyAlgo = useSelector((state) => state.general.MyAlgo);
  const widget = useSelector((state) => state.general.widget);

  useEffect(() => {
    algoConnector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get provided accounts
      const { accounts } = payload.params[0];
      if (accounts) {
        dispatch(setAlgorandWallet(true));
        dispatch(setAlgorandAccount(accounts[0]));
      }
    });
    // debugger;
    let correct;
    if (testnet) {
      correct = from ? TESTNET_CHAIN_INFO[from?.key].chainId === chainId : "";
    } else {
      correct = from ? CHAIN_INFO[from?.key].chainId === chainId : "";
    }

    if (from?.type === "EVM") {
      dispatch(setAccount(account));
    }
    if (from) {
      // debugger;
      dispatch(
        setWrongNetwork(
          testnet
            ? TESTNET_CHAIN_INFO[from.key].chainId !== chainId
            : CHAIN_INFO[from.key].chainId !== chainId
        )
      );
    }
    if (
      ((metaMask || tronLink || onWC || trustWallet || MaiarWallet) &&
        correct) ||
      MyAlgo ||
      algorandWallet ||
      AlgoSigner ||
      kukaiWallet ||
      templeWallet
    ) {
      dispatch(setStep(2));
    }
  }, [
    account,
    metaMask,
    chainId,
    tronLink,
    onWC,
    trustWallet,
    AlgoSigner,
    algorandWallet,
    MaiarWallet,
    MyAlgo,
    templeWallet,
    kukaiWallet,
  ]);

  return (
    <div>
      <NFTworng />
      <div className={from && to ? "connectNft" : "disabled"}>
        <a href="#" className="themBtn disabled" onClick={handleShow}>
          Continue bridging -<span>{">"}</span>{" "}
        </a>
      </div>
      {!qrCodeString ? (
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          className="ChainModal"
        >
          <Modal.Header>
            <Modal.Title>Connect Wallet</Modal.Title>
            <span className="CloseModal" onClick={handleClose}>
              {widget ? (
                <CloseComp className="svgWidget" />
              ) : (
                <img src={Close} alt="" />
              )}
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className="walletListBox">
              <ul className="walletList scrollSty">
                <EVMWallet wallet={"MetaMask"} />
                <EVMWallet wallet={undefined} /> {/* Wallet Connect */}
                <EVMWallet wallet={"TrustWallet"} />
                <AlgorandWallet wallet={"MyAlgo"} />
                <AlgorandWallet wallet={"AlgoSigner"} />
                <AlgorandWallet wallet={undefined} /> {/* Algorand Wallet */}
                <TronWallet />
                <ElrondWallet wallet={"Maiar"} />
                <TezosWallet wallet={"TempleWallet"} />
                <TezosWallet wallet={undefined} /> {/* Beacon */}
                <ElrondWallet wallet={undefined} /> {/** Maiar Extension*/}
                <USBWallet wallet={"Ledger"} />
                <USBWallet /> {/** Trezor */}
              </ul>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <MaiarModal
          handleClose={handleClose}
          strQR={qrCodeImage}
          qrCodeString={qrCodeString}
          show={show}
        />
      )}
    </div>
  );
}
//
export default ConnectWallet;
