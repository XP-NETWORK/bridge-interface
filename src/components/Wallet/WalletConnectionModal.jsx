import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccountWalletModal,
    setQrCodeString,
    setWalletsModal,
} from "../../store/reducers/generalSlice";
import WalletList from "./WalletList";
import { useDidUpdateEffect } from "../Settings/hooks";

export default function WalletConnectionModal() {
    const [walletSearch, setWalletSearch] = useState();
    const qrCodeImage = useSelector((state) => state.general.qrCodeImage);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);

    const [show, setShow] = useState();
    const dispatch = useDispatch();
    const inputElement = useRef(null);

    const handleClose = () => {
        if (!temporaryFrom) {
            setShow(false);
            setWalletSearch("");
            dispatch(setAccountWalletModal(false));
            if (qrCodeImage) {
                dispatch(setQrCodeString(""));
            }
        } else {
            window.location.reload();
        }
    };

    useEffect(() => {
        inputElement?.current?.focus();
    }, []);

    return (
        <>
            <Modal.Header>
                <Modal.Title>Connect Wallet</Modal.Title>=
                <span className="CloseModal" onClick={handleClose}>
                    <div className="close-modal"></div>
                </span>
            </Modal.Header>
            <div className="wallet-search__container">
                <input
                    ref={inputElement}
                    onChange={(e) => setWalletSearch(e.target.value)}
                    value={walletSearch}
                    className="wallet-search serchInput"
                    type="text"
                    placeholder="Search"
                />
                <div className="magnify"></div>
            </div>
            <Modal.Body>
                <div className="walletListBox">
                    <WalletList input={walletSearch} connected={handleClose} />
                </div>
            </Modal.Body>
        </>
    );
}
