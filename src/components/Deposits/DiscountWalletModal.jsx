import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDidUpdateEffect } from "../Settings/hooks";
import WalletList from "../Wallet/WalletList";

export default function DiscountWalletModal({ handleClose }) {
    const [walletSearch, setWalletSearch] = useState();

    const inputElement = useRef(null);

    useEffect(() => {
        inputElement?.current?.focus();
    }, []);

    return (
        <div>
            <Modal.Header>
                <Modal.Title>Connect Wallet</Modal.Title>
                <span className="CloseModal" onClick={handleClose}>
                    <div className="close-modal"></div>
                </span>
            </Modal.Header>
            {/* <div className="wallet-search__container">
                <input
                    ref={inputElement}
                    onChange={(e) => setWalletSearch(e.target.value)}
                    value={walletSearch}
                    className="wallet-search serchInput"
                    type="text"
                    placeholder="Search"
                />
                <div className="magnify"></div>
            </div> */}
            <Modal.Body>
                <div className="walletListBox">
                    <WalletList
                        discount={true}
                        input={walletSearch}
                        connected={handleClose}
                    />
                </div>
            </Modal.Body>
        </div>
    );
}
