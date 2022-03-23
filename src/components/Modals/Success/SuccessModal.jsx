import React, { useState } from "react";
import { Modal, Image } from "react-bootstrap";
import Close from "../../../assets/img/icons/close.svg";
import Copy from "../../../assets/img/icons/FileCopy.svg";
import Check from "../../../assets/img/icons/Check_circle.svg";
import { useDispatch, useSelector } from "react-redux";
import { ModalActions } from "semantic-ui-react";
import moment from "moment";
import { useWeb3React } from "@web3-react/core";
import TransferredNft from "./TransferredNft";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopy from "../../../assets/img/icons/FileCopy.svg";
import CopyHover from "../../../assets/img/icons/CopyHover.svg";
import ConnectAlgorand from "../../ConnectAlgorand";
import ClaimAlgorandNFT from "../../ClaimAlgorandNFT";
import { useEffect } from "react";
import { setNFTS, socket } from "../../../wallet/helpers";

import {
  claimAlgorandPopup,
  cleanTxnHashArr,
  connectAlgorandWalletClaim,
  removeFromSelectedNFTList,
  setTxnStatus,
} from "../../../store/reducers/generalSlice";
import "./SuccessModal.css";
import Tooltip from "../AccountModal/Tooltip";

export default function SuccessModal() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);

  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const tronWallet = useSelector((state) => state.general.tronWallet);
  const account = useSelector((state) => state.general.account);
  const receiver = useSelector((state) => state.general.receiver);
  const txnHashArr = useSelector((state) => state.general.txnHashArr);
  const currentTX = useSelector((s) => s.general.currrentTx);
  const selectedNFTList = useSelector((state) => state.general.selectedNFTList);
  const hardWallet = "0xb6C8748115d23Eb1c6d59Cb83eAe051b56ef75c7";
  const [copied, setCopy] = useState();
  const [copyHover, setSetCopyHover] = useState();
  const address = account
    ? account
    : algorandAccount
    ? algorandAccount
    : elrondAccount
    ? elrondAccount
    : tronWallet
    ? tronWallet
    : "";

    const socketUrl = "wss://dev-explorer-api.herokuapp.com";
    

  const handleClose = () => {
    selectedNFTList.forEach((nft) => {
      const { txn } = nft;
      if (txn) dispatch(removeFromSelectedNFTList(nft));
    });
    dispatch(cleanTxnHashArr());
    setNFTS(address, from.key)
  };

  function copy() {
    setCopy(true);

    setTimeout(() => setCopy(false), 2000);
  }

  const getSubstringValue = () => {
    if (window.innerWidth <= 320) return 3;
    else if (window.innerWidth <= 375) return 6;
    else return false;
  };

  const getTX = () => {
    let ntx;
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

  const toShow = () => {
    return txnHashArr?.length ? true : false;
    // return true
  };

  useEffect(() => {
    socket.on("incomingEvent", async e => {
      dispatch(setTxnStatus(e))
    });
    socket.on("updateEvent", async e => {
      dispatch(setTxnStatus(e))
    })
    return () => {
      if (socket) {
      socket.off("incomingEvent");
      socket.off("updateEvent");
      }
    }
  }, [])
  

  useEffect(() => {
    if (txnHashArr && txnHashArr.length > 0 && to && to.key === "Algorand") {
      dispatch(connectAlgorandWalletClaim(true));
    }
  }, [txnHashArr]);

  return (
    <>
      <ConnectAlgorand />
      <ClaimAlgorandNFT />
      <Modal animation={false} className="success-modal" show={toShow()}>
        <span onClick={handleClose} className="success-modal-close">
          <img src={Close} alt="" />
        </span>
        <Modal.Header className="border-0">
          <Modal.Title>
            <div className="custom-success-modal__title">Bridging Report</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="success-info-list">
          <div className="success-info-box">
            <div className="success-info-item">
              <div className="info-item-label">Date</div>
              <span>{moment().format("YYYY-MM-DD hh:mm")}</span>
            </div>
            <div className="success-info-item">
              <div className="info-item-label">Txn Hash</div>
              <CopyToClipboard text={getTX() || "No tx"}>
                <div className="success-hash">
                  {getTX()
                    ? `${getTX().substring(
                        0,
                        getSubstringValue() || 10
                      )}...${getTX().substring(getTX().length - 6)}`
                    : ""}
                  <Tooltip />
                </div>
              </CopyToClipboard>
            </div>
          </div>
          <div className="success-info-box">
            <div className="success-info-item">
              <div className="info-item-label">Sent From</div>
              <div className="info-item-chain">
                <img src={from?.image?.src} alt={from?.text} />
                {from?.text || "Algorand"}
              </div>
            </div>
            <div className="success-info-item">
              <div className="info-item-label">Departure Address</div>
              <div className="success-hash">
                {address
                  ? `${address.substring(
                      0,
                      getSubstringValue() || 10
                    )}...${address.substring(address.length - 6)}`
                  : ""}
              </div>
            </div>
            <div className="success-info-item">
              <div className="info-item-label">Sent To</div>
              <div className="info-item-chain">
                <img src={to?.image?.src} alt={to?.text} />
                {to?.text || "BSC"}
              </div>
            </div>
            <div className="success-info-item">
              <div className="info-item-label">Destination address</div>
              <div className="success-hash">
                {receiver
                  ? `${receiver.substring(
                      0,
                      getSubstringValue() || 10
                    )}...${receiver.substring(receiver.length - 6)}`
                  : "test"}
              </div>
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
                      key={`index-${index}-nft-succeess`}
                      nft={nft}
                    />
                  ))
                : ""}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
