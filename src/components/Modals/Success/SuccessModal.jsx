import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import TransferredNft from "./TransferredNft";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect } from "react";
import { StringShortener } from "../../../utils";
import { sockets } from "../../values";

import io from "socket.io-client";

import {
    cleanTxnHashArr,
    removeFromSelectedNFTList,
    setNFTSetToggler,
    setSelectedNFT,
    setTxnStatus,
} from "../../../store/reducers/generalSlice";
import "./SuccessModal.css";
import Tooltip from "../AccountModal/Tooltip";

import { setQRCodeModal } from "../../Wallet/TONWallet/tonStore";
import { withServices } from "../../App/hocs/withServices";

/*const socket1 = io("wss://tools.xp.network", { path: "/testnet-explorer/ws" });

setTimeout(() => {
    console.log("x");
    console.log(socket1);
}, 5000);*/

export default withServices(function SuccessModal({ serviceContainer }) {
    const { bridge } = serviceContainer;

    const dispatch = useDispatch();
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);

    const account = useSelector((state) => state.general.account);
    const receiver = useSelector((state) => state.general.receiver);
    const txnHashArr = useSelector((state) => state.general.txnHashArr);
    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    ); /*[
        {
            uri: '',
            name: 'fsdfsdfsdfsd887364 56983465 983465983476598 346598347653 49865348934856f',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg',
                tokenId: '123',
                chainId: '15',
            native: {
                name: 'fsdfsdfsdfsdf',

                tokenId: '123',
                chainId: '15'
            }
        },]*/

    const testnet = useSelector((state) => state.general.testNet);

    const [formatedAddress, setAddress] = useState(account);
    const [formatedReceiver, setReceiver] = useState(receiver);

    const [links, setLinks] = useState({
        txFrom: "",
        txTo: "",
        addressFrom: "",
        addressTo: "",
    });

    const handleClose = () => {
        selectedNFTList?.forEach((nft) => {
            const { txn } = nft;
            if (txn) dispatch(removeFromSelectedNFTList(nft));
        });
        dispatch(cleanTxnHashArr());
        dispatch(setNFTSetToggler());
        dispatch(setQRCodeModal(false));
    };

    const getTX = () => {
        if (txnHashArr && txnHashArr?.length > 0) {
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
    const shortAddress = StringShortener(formatedAddress, 6);
    const shortReceiver = StringShortener(formatedReceiver, 6);

    useEffect(() => {
        const url = sockets[bridge.network].split('::');

        const socket = io(url[0], {
            path:url[1] || "/socket.io",
        });

        const incoming = async (e) => {
            dispatch(setTxnStatus(e));
            console.log("Incoming Event: ", e);
        };

        const update = (text) => async (e) => {
            dispatch(setTxnStatus(e));
            console.log(text, e);
        };

        const updateOld = update("Update Event: ");
        //const updateScraper = update("Update Event ScraperSocket: ");

        socket.on("incomingEvent", incoming);
        // scraperSocket.on("updateEvent", updateScraper);
        socket.on("updateEvent", updateOld);

        Promise.all([
            bridge?.getChain(from?.nonce),
            bridge?.getChain(to?.nonce),
        ]).then(([fromChain, toChain]) => {
            const { chainParams: fromChainParams } = fromChain;
            const { chainParams: toChainParams } = toChain;
            const txBaseFrom = testnet
                ? fromChainParams?.tnBlockExplorerUrl
                : fromChainParams?.blockExplorerUrl;
            const txBaseTo = testnet
                ? toChainParams?.tnBlockExplorerUrl
                : toChainParams?.blockExplorerUrl;
            const addressBaseFrom = testnet
                ? fromChainParams?.tnBlockExplorerUrlAddr
                : fromChainParams?.blockExplorerUrlAddr;
            const addressBaseTo = testnet
                ? toChainParams?.tnBlockExplorerUrlCollection ||
                  toChainParams?.tnBlockExplorerUrlAddr
                : toChainParams?.blockExplorerUrlCollection ||
                  toChainParams?.blockExplorerUrlAddr;

            setAddress(fromChain.adaptAddress(formatedAddress));
            setReceiver(toChain.adaptAddress(formatedReceiver));

            setLinks({
                txFrom: txBaseFrom,
                txTo: txBaseTo,
                addressFrom: addressBaseFrom,
                addressTo: addressBaseTo,
            });

            if (bridge.network === "staging" /*"staging" /*"testnet"*/) {
                toChain
                    .listetnExecutedSocket(socket, from.nonce)
                    .then((res) => {
                        console.log(res, "socket_res");
                        if (res) {
                            dispatch(
                                setSelectedNFT({
                                    index: 0,
                                    nft: {
                                        ...selectedNFTList[0],
                                        ...res,
                                    },
                                })
                            );

                            //vpczs-4iaaa-aaaap-ablra-cai
                        }
                    });
            }
        });

        return () => {
            if (socket) {
                socket.off("incomingEvent", incoming);
                socket.off("updateEvent", updateOld);
                socket.removeAllListeners("tx_executed_event");
                //scraperSocket.off("updateEvent", updateScraper);
            }
        };
    }, [bridge?.network]);

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
                            {moment(txnHashArr[0]?.trxDate).format(
                                "YYYY-M-DD HH:mm"
                            ) || moment.format("YYYY-M-DD HH:mm")}
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
                                    ? links.addressFrom(formatedAddress)
                                    : links.addressFrom + formatedAddress
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
                        <div className="info-item-label">
                            Destination Address
                        </div>
                        <a
                            className="success-hash"
                            href={
                                typeof links.addressTo === "function"
                                    ? links.addressTo(formatedReceiver)
                                    : links.addressTo + formatedReceiver
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
                        {selectedNFTList?.length
                            ? selectedNFTList?.map((nft, index) => (
                                  <TransferredNft
                                      key={`index-${index}-nft-success`}
                                      nft={nft}
                                      links={links}
                                      testnet={testnet}
                                      receiver={formatedReceiver}
                                  />
                              ))
                            : ""}
                    </div>
                </div>
            </Modal.Body>
        </>
    );
});
