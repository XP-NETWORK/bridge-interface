import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
    setAccountWalletModal,
    setQrCodeString,
    setTemporaryFrom,
    setTemporaryTo,
} from "../../store/reducers/generalSlice";
import WalletList from "./WalletList";

export default function WalletConnectionModal() {
    const [walletSearch, setWalletSearch] = useState();

    const qrCodeImage = useSelector((state) => state.general.qrCodeImage);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    let walletsModal = useSelector((state) => state.general.walletsModal);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputElement = useRef(null);

    const handleClose = () => {
        if (!temporaryFrom) {
            setWalletSearch("");
            dispatch(setAccountWalletModal(false));
            if (qrCodeImage) {
                dispatch(setQrCodeString(""));
            }
        } else {
            dispatch(setTemporaryFrom(""));
            dispatch(setTemporaryTo(""));
            navigate("/");
            dispatch(setAccountWalletModal(false));
        }
    };

    const handleChange = (e) => {
        if (!(e.nativeEvent.data === " " && walletSearch.length === 0)) {
            setWalletSearch(e.target.value);
        }
    };

    useEffect(() => {
        inputElement?.current?.focus();
    }, []);

    return (
      <Modal show={walletsModal}>
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
            <WalletList input={walletSearch} connected={handleClose} />
          </div>
        </Modal.Body>
      </Modal>
    );
}
