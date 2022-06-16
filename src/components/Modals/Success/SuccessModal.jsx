import { Modal } from "react-bootstrap";
import Close from "../../../assets/img/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import TransferredNft from "./TransferredNft";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ConnectAlgorand from "../../ConnectAlgorand";
import ClaimAlgorandNFT from "../../ClaimAlgorandNFT";
import { useEffect } from "react";
import { setNFTS, socket } from "../../../wallet/helpers";

import {
    cleanTxnHashArr,
    connectAlgorandWalletClaim,
    removeFromSelectedNFTList,
    setNFTSetToggler,
    setTxnStatus,
} from "../../../store/reducers/generalSlice";
import "./SuccessModal.css";
import Tooltip from "../AccountModal/Tooltip";
import { chainsConfig, CHAIN_INFO } from "../../values";

export default function SuccessModal() {
    const dispatch = useDispatch();
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    console.log("🚀 ~ file: SuccessModal.jsx ~ line 11 ~ socket", socket);

    const algorandAccount = useSelector(
        (state) => state.general.algorandAccount
    );
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const tronWallet = useSelector((state) => state.general.tronWallet);
    const account = useSelector((state) => state.general.account);
    const receiver = useSelector((state) => state.general.receiver);
    const txnHashArr = useSelector((state) => state.general.txnHashArr);
    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );
    const testnet = useSelector((state) => state.general.testNet);
    const address = account
        ? account
        : algorandAccount
        ? algorandAccount
        : elrondAccount
        ? elrondAccount
        : tronWallet
        ? tronWallet
        : "";

    const handleClose = () => {
        selectedNFTList.forEach((nft) => {
            const { txn } = nft;
            if (txn) dispatch(removeFromSelectedNFTList(nft));
        });
        dispatch(cleanTxnHashArr());
        dispatch(setNFTSetToggler());
        // setNFTS(address, from.key, undefined, "success")
    };

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

    const getExplorer = () => {
        return !testnet
            ? `${CHAIN_INFO[from?.text]?.blockExplorerUrls}${address}`
            : `${CHAIN_INFO[from?.text]?.testBlockExplorerUrls}${address}`;
    };

    useEffect(() => {
        socket.on("incomingEvent", async (e) => {
            debugger;
            dispatch(setTxnStatus(e));
            console.log(
                "🚀 ~ file: SuccessModal.jsx ~ line 96 ~ socket.on ~ e",
                e
            );
        });
        socket.on("updateEvent", async (e) => {
            dispatch(setTxnStatus(e));
            console.log(
                "🚀 ~ file: SuccessModal.jsx ~ line 99 ~ socket.on ~ e",
                e
            );
        });
        return () => {
            if (socket) {
                socket.off("incomingEvent");
                socket.off("updateEvent");
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
                    <div className="custom-success-modal__title">
                        Bridging Results
                    </div>
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
                            <CopyToClipboard text={getTX() || "No tx"}>
                                <a
                                    href={
                                        testnet
                                            ? `${chainsConfig[from?.key]
                                                  ?.testTx + getTX()}`
                                            : `${chainsConfig[from?.key]?.tx +
                                                  getTX()}`
                                    }
                                    target="_blank"
                                    className="success-hash"
                                >
                                    {getTX()
                                        ? `${getTX().substring(
                                              0,
                                              getSubstringValue() || 10
                                          )}...${getTX().substring(
                                              getTX().length - 6
                                          )}`
                                        : ""}
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
                            {moment(txnHashArr[0]?.trxDate).format(
                                "YYYY-M-DD HH:mm"
                            ) || moment.format("YYYY-M-DD HH:mm")}
                        </div>
                    </div>
                    <div className="success-info-item">
                        <div className="info-item-label">Sent From</div>
                        <div className="info-item-chain">
                            <img src={from?.image?.src} alt={from?.text} />
                            {from?.text === "xDai" ? "Gnosis" : from?.text}
                        </div>
                    </div>
                    <div className="success-info-item">
                        <div className="info-item-label">Departure Address</div>
                        <a
                            href={getExplorer() || "#"}
                            className="success-hash"
                            target="_blank"
                        >
                            {address
                                ? `${address.substring(
                                      0,
                                      getSubstringValue() || 10
                                  )}...${address.substring(address.length - 6)}`
                                : ""}
                        </a>
                    </div>
                    <div className="success-info-item">
                        <div className="info-item-label">Sent To</div>
                        <div className="info-item-chain">
                            <img src={to?.image?.src} alt={to?.text} />
                            {to?.text === "xDai" ? "Gnosis" : to?.text}
                        </div>
                    </div>
                    <div className="success-info-item">
                        <div className="info-item-label">
                            Destination Address
                        </div>
                        <a
                            className="success-hash"
                            href={`${
                                CHAIN_INFO[to?.text]?.blockExplorerUrls
                            }${receiver}`}
                            target="_blank"
                        >
                            {receiver
                                ? `${receiver.substring(
                                      0,
                                      getSubstringValue() || 10
                                  )}...${receiver.substring(
                                      receiver.length - 6
                                  )}`
                                : "test"}
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
                                  />
                              ))
                            : ""}
                    </div>
                </div>
            </Modal.Body>
        </>
    );
}
