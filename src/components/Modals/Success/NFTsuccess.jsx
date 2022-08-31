import { useEffect, useState } from "react";
import { Modal, Image } from "react-bootstrap";
import Close from "../../../assets/img/icons/close.svg";
import Success from "../../../assets/img/icons/Success.svg";
import Check from "../../../assets/img/icons/Check_circle.svg";
import FileCopy from "../../../assets/img/icons/FileCopy.svg";
import CopyHover from "../../../assets/img/icons/CopyHover.svg";
import copiedIcon from "../../../assets/img/icons/copiedtoclip.svg";
import { useSelector, useDispatch } from "react-redux";
import { chainsConfig } from "./../../values";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { setupURI } from "../../../wallet/helpers";
import {
  isValidHttpUrl,
  setClaimablesAlgorand,
  setNFTS,
} from "../../../wallet/helpers";
import {
  claimAlgorandPopup,
  connectAlgorandWalletClaim,
  cleanTxnHashArr,
  removeFromSelectedNFTList,
} from "../../../store/reducers/generalSlice";
import ConnectAlgorand from "../../ConnectAlgorand";
import ClaimAlgorandNFT from "../../ClaimAlgorandNFT";
import "./SuccessNFT.css";
import { getUrl } from "../../innercomponents/NFTHelper";
import VideoOrImage from "../../innercomponents/VideoOrImage";
import brockenurl from "../../../assets/img/brockenurl.png";
import { ReactComponent as CloseComp } from "../../../assets/img/icons/close.svg";
import { ReactComponent as FileCopyComp } from "../../../assets/img/icons/FileCopy.svg";

function NFTsuccess() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const account = useSelector((state) => state.general.account);
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const tronWallet = useSelector((state) => state.general.tronWallet);
  const receiver = useSelector((state) => state.general.receiver);
  const txnHashArr = useSelector((state) => state.general.txnHashArr);
  const currentTX = useSelector((s) => s.general.currrentTx);
  const selectedNFTList = useSelector((state) => state.general.selectedNFTList);
  const widget = useSelector((state) => state.widget.widget);

  const refresh = async () => {
    // debugger
    let w;
    if (from.type === "EVM") w = account;
    else if (from.type === "Tezos") w = tezosAccount;
    else if (from.type === "Algorand") w = algorandAccount;
    else if (from.type === "Elrond") w = elrondAccount;
    else if (from.type === "Tron") w = tronWallet;
    // await setNFTS(w, from.key, undefined, "Success");
  };

  const handleClose = () => {
    selectedNFTList.forEach((nft) => {
      const { txn } = nft;
      if (txn) dispatch(removeFromSelectedNFTList(nft));
    });
    dispatch(cleanTxnHashArr());
    refresh();
  };

  const [copied, setCopy] = useState();
  const [copyHover, setSetCopyHover] = useState();

  useEffect(() => {
    if (txnHashArr && txnHashArr.length > 0 && to && to.key === "Algorand") {
      dispatch(connectAlgorandWalletClaim(true));
    }
  }, [txnHashArr]);

  function copy() {
    setCopy(true);

    setTimeout(() => setCopy(false), 2000);
  }

  const getSubstringValue = () => {
    if (window.innerWidth <= 320) return 3;
    else if (window.innerWidth <= 375) return 6;
    else return false;
  };

  const toShow = () => {
    return txnHashArr?.length ? true : false;
    // return true
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

  const address = account
    ? account
    : algorandAccount
    ? algorandAccount
    : elrondAccount
    ? elrondAccount
    : tronWallet
    ? tronWallet
    : "";
  return (
    <div>
      <ConnectAlgorand />
      <ClaimAlgorandNFT />
      {/* <a href="#" className="themBtn" onClick={handleShow}>Send</a> */}
      {/* show={txnHashArr?.length} */}
      <Modal
        animation={false}
        show={toShow()}
        onHide={handleClose}
        className="nftSuccessMod"
      >
        <Modal.Header>
          <Modal.Title>
            <img src={Success} /> Success
          </Modal.Title>
          <span className="CloseModal" onClick={handleClose}>
            {widget ? <CloseComp className="svgWidget" /> : <img src={Close} />}
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="successBody">
            <div className="successBox status">
              <div className="sucesList">
                <label>Status</label>{" "}
                <span className="statComp">
                  <img src={Check} /> Completed
                </span>
              </div>
              <div className="sucesList">
                <label>Date</label>{" "}
                <span className="statDate">
                  {moment().format("YYYY-MM-DD hh:mm")}
                </span>
              </div>
              <div className="sucesList">
                <label>Txn Hash</label>
                <CopyToClipboard text={getTX() || "No tx"}>
                  <div className="txn-hash">
                    {getTX()
                      ? `${getTX().substring(
                          0,
                          getSubstringValue() || 10
                        )}...${getTX().substring(getTX().length - 6)}`
                      : ""}
                    {widget ? (
                      <FileCopyComp
                        onClick={() => copy()}
                        onMouseOver={() => setSetCopyHover(true)}
                        onMouseOut={() => setSetCopyHover(false)}
                        className="success__copy svgWidget"
                      />
                    ) : (
                      <Image
                        onClick={() => copy()}
                        onMouseOver={() => setSetCopyHover(true)}
                        onMouseOut={() => setSetCopyHover(false)}
                        src={copyHover ? CopyHover : FileCopy}
                        className="success__copy"
                      />
                    )}
                  </div>
                </CopyToClipboard>
                <div className="tooltip-icon">
                  <img src={copied ? copiedIcon : ""} alt="" />
                </div>
              </div>
            </div>
            <div className="successBox SentFrom">
              <div className="sucesList">
                <label>Sent From</label>{" "}
                <span className="">
                  <img alt="" src={from ? from.image.src : ""} />{" "}
                  {from?.text === "xDai" ? "Gnosis" : from?.text}
                </span>
              </div>
              <div className="sucesList">
                <label>Departure Address</label>{" "}
                <span className="colBlue">
                  {address
                    ? `${address.substring(
                        0,
                        getSubstringValue() || 10
                      )}...${address.substring(address.length - 6)}`
                    : ""}
                </span>
              </div>
              <div className="sucesList">
                <label>Sent To</label>{" "}
                <span className="">
                  <img alt="" src={to ? to.image.src : ""} />{" "}
                  {to?.key === "xDai" ? "Gnosis" : to?.key}
                </span>
              </div>
              <div className="sucesList">
                <label>Destination address</label>{" "}
                <span className="colBlue">
                  {receiver
                    ? `${receiver.substring(
                        0,
                        getSubstringValue() || 10
                      )}...${receiver.substring(receiver.length - 6)}`
                    : "test"}
                </span>
              </div>
            </div>
            <div className="nftSelectList">
              <div className="nftSeleTop">
                <div className="selectedNft">
                  Sent NFT <span>{`/ ${selectedNFTList?.length}`}</span>
                </div>
              </div>
              <ul className="nftSelected nft--success">
                {selectedNFTList.length
                  ? selectedNFTList.map((nft, index) => (
                      <SuccessNFT
                        nft={nft}
                        index={index}
                        key={`${index}-nft-succeess`}
                        from={from}
                      />
                    ))
                  : ""}
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NFTsuccess;

function SuccessNFT({ nft, from, index }) {
  const dispatch = useDispatch();
  const { to, algorandAccount } = useSelector((s) => s.general);
  const testnet = useSelector((state) => state.general.testNet);
  const tx = nft.txn
    ? typeof nft.txn === "object"
      ? nft.txn.hash.toString()
      : nft.txn
    : "";
  const { video, url, ipfsArr } = getUrl(nft);
  const getTX = () => {
    if (nft.txn) {
      if (typeof nft.txn === "object") {
        return nft.txn?.hash?.toString();
      } else {
        return nft.txn;
      }
    } else return "";
  };
  const off = { opacity: 0.6, pointerEvents: "none" };

  useEffect(async () => {
    if (to.key === "Algorand") {
      const claimables = await setClaimablesAlgorand(algorandAccount, true);
      // if(claimables && claimables.length > 0) {

      // }
    }
  }, []);

  const claim = () => {
    dispatch(claimAlgorandPopup(nft));
  };
  return (
    <li className="nftSelecItem">
      {url && nft.uri && isValidHttpUrl(nft.uri) ? (
        video && url ? (
          <video
            controls={false}
            playsInline={true}
            autoPlay={true}
            loop={true}
            src={setupURI(url)}
          />
        ) : (
          <img alt="NFTss" src={setupURI(url)} />
        )
      ) : ipfsArr.length ? (
        <VideoOrImage urls={ipfsArr} />
      ) : (
        <div className="brocken-url">
          <img src={brockenurl} alt="Broken Token URI" />
          <span className="brocken-url__msg">
            NFTs URL
            <br /> is broken
          </span>
        </div>
      )}
      <span className="nftSelected__name">{nft.name || nft.native.name}</span>
      <span className="bluTextBtn">
        <a
          href={
            testnet
              ? `${chainsConfig[from.key].testTx + getTX()}`
              : `${chainsConfig[from.key].tx + getTX()}`
          }
          target="_blank"
          rel="noreferrer"
        >
          View Txn
        </a>
      </span>
      {to.key === "Algorand" ? (
        <span className="bluTextBtn">
          <a style={algorandAccount ? {} : off} onClick={claim} target="_blank">
            Claim
          </a>
        </span>
      ) : (
        ""
      )}
    </li>
  );
}
