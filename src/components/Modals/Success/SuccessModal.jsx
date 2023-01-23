import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import TransferredNft from "./TransferredNft";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect } from "react";
import {
  socket,
  StringShortener,
  scraperSocket,
} from "../../../wallet/helpers";

import {
  cleanTxnHashArr,
  removeFromSelectedNFTList,
  setNFTSetToggler,
  setTxnStatus,
} from "../../../store/reducers/generalSlice";
import "./SuccessModal.css";
import Tooltip from "../AccountModal/Tooltip";
//import { chainsConfig, CHAIN_INFO } from "../../values";
import { setQRCodeModal } from "../../Wallet/TONWallet/tonStore";
import { withServices } from "../../App/hocs/withServices";

export default withServices(function SuccessModal({ serviceContainer }) {
  const { bridge } = serviceContainer;

  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);

  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const tronWallet = useSelector((state) => state.general.tronWallet);
  const account = useSelector((state) => state.general.account);
  const receiver = useSelector((state) => state.general.receiver);
  const txnHashArr = useSelector((state) => state.general.txnHashArr);
  const selectedNFTList = useSelector((state) => state.general.selectedNFTList);
  const testnet = useSelector((state) => state.general.testNet);
  const secretAccount = useSelector((state) => state.general.secretAccount);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const tonAccount = useSelector((state) => state.general.tonAccount);

  const address =
    tonAccount ||
    account ||
    algorandAccount ||
    elrondAccount ||
    tronWallet ||
    secretAccount ||
    tezosAccount ||
    "";

  const [links, setLinks] = useState({
    txFrom: "",
    txTo: "",
    addressFrom: "",
    addressTo: "",
  });

  const handleClose = () => {
    selectedNFTList.forEach((nft) => {
      const { txn } = nft;
      if (txn) dispatch(removeFromSelectedNFTList(nft));
    });
    dispatch(cleanTxnHashArr());
    dispatch(setNFTSetToggler());
    dispatch(setQRCodeModal(false));
  };

  const getTX = () => {
    if (txnHashArr && txnHashArr.length > 0) {
      if (typeof txnHashArr === "object" && !Array.isArray(txnHashArr)) {
        return txnHashArr[0].hash.toString();
      } else if (Array.isArray(txnHashArr)) {
        if (typeof txnHashArr[0] === "object") {
          return txnHashArr[0].hash.toString();
        } else {
          return txnHashArr[0].toString();
        }
      } else {
        return txnHashArr;
      }
    } else {
      return "wrong tx";
    }
  };

  const tx = getTX();
  const shortTx = StringShortener(tx, 6);
  const shortAddress = StringShortener(address, 6);
  const shortReceiver = StringShortener(receiver, 6);

  useEffect(() => {
    const incoming = async (e) => {
      dispatch(setTxnStatus(e));
      console.log("Incoming Event: ", e);
    };

    const update = (text) => async (e) => {
      dispatch(setTxnStatus(e));
      console.log(text, e);
    };

    const updateOld = update("Update Event: ");
    const updateScraper = update("Update Event ScraperSocket: ");

    socket.on("incomingEvent", incoming);
    scraperSocket.on("updateEvent", updateScraper);
    socket.on("updateEvent", updateOld);

    Promise.all([bridge.getChain(from.nonce), bridge.getChain(to.nonce)]).then(
      ([fromChain, toChain]) => {
        const { chainParams: fromChainParams } = fromChain;
        const { chainParams: toChainParams } = toChain;
        const txBaseFrom = testnet
          ? fromChainParams.tnBlockExplorerUrl
          : fromChainParams.blockExplorerUrl;
        const txBaseTo = testnet
          ? toChainParams.tnBlockExplorerUrl
          : toChainParams.blockExplorerUrl;
        const addressBaseFrom = testnet
          ? fromChainParams.tnBlockExplorerUrlAddr
          : fromChainParams.blockExplorerUrlAddr;
        const addressBaseTo = testnet
          ? toChainParams.tnBlockExplorerUrlAddr
          : toChainParams.blockExplorerUrlAddr;

        setLinks({
          txFrom: txBaseFrom,
          txTo: txBaseTo,
          addressFrom: addressBaseFrom,
          addressTo: addressBaseTo,
        });
      }
    );

    return () => {
      if (socket) {
        socket.off("incomingEvent", incoming);
        socket.off("updateEvent", updateOld);
        scraperSocket.off("updateEvent", updateScraper);
      }
    };
  }, []);

  return (
    <>
      <span onClick={handleClose} className="success-modal-close">
        <div className="close-modal"></div>
      </span>
      <Modal.Header className="border-0">
        <Modal.Title>
          <div className="custom-success-modal__title">Bridging Results</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="success-info-list">
        {false && (
          <div className="success-info-box">
            <div className="success-info-item">
              <div className="info-item-label">Date</div>
              <span>{moment().format("YYYY-MM-DD hh:mm")}</span>
            </div>
            <div className="success-info-item">
              <div className="info-item-label">Txn Hash</div>

              <CopyToClipboard text={tx || "No tx"}>
                <a
                  href={
                    typeof links.txFrom === "function"
                      ? links.txFrom(tx)
                      : links.txFrom + tx
                  }
                  target="_blank"
                  className="success-hash"
                  rel="noreferrer"
                >
                  {shortTx}
                  <Tooltip />
                </a>
              </CopyToClipboard>
            </div>
          </div>
        )}
        <div className="success-info-box">
          <div className="success-info-item">
            <div className="info-item-label">Date</div>
            <div className="info-item-chain">
              {moment(txnHashArr[0]?.trxDate).format("YYYY-M-DD HH:mm") ||
                moment.format("YYYY-M-DD HH:mm")}
            </div>
          </div>
          <div className="success-info-item">
            <div className="info-item-label">Sent From</div>
            <div className="info-item-chain">
              <img src={from?.image?.src} alt={from?.text} />
              {from?.text}
            </div>
          </div>
          <div className="success-info-item">
            <div className="info-item-label">Departure Address</div>
            <a
              href={
                typeof links.addressFrom === "function"
                  ? links.addressFrom(address)
                  : links.addressFrom + address
              }
              className="success-hash"
              target="_blank"
              rel="noreferrer"
            >
              {shortAddress}
            </a>
          </div>
          <div className="success-info-item">
            <div className="info-item-label">Sent To</div>
            <div className="info-item-chain">
              <img src={to?.image?.src} alt={to?.text} />
              {to?.text}
            </div>
          </div>
          <div className="success-info-item">
            <div className="info-item-label">Destination Address</div>
            <a
              className="success-hash"
              href={
                typeof links.addressTo === "function"
                  ? links.addressTo(receiver)
                  : links.addressTo + receiver
              }
              target="_blank"
              rel="noreferrer"
            >
              {shortReceiver}
            </a>
          </div>
        </div>
        <div className="success-info-box">
          <div className="info-item-label">
            Sent NFT / {selectedNFTList?.length || "8"}
          </div>
          <div className="success-nft-info">
            {selectedNFTList.length
              ? selectedNFTList.map((nft, index) => (
                  <TransferredNft
                    key={`index-${index}-nft-success`}
                    nft={nft}
                    links={links}
                    testnet={testnet}
                  />
                ))
              : ""}
          </div>
        </div>
      </Modal.Body>
    </>
  );
});
