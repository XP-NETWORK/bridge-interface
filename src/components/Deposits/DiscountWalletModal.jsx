import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import WalletList from "../Wallet/WalletList";
import PropTypes from "prop-types";

export default function DiscountWalletModal({ handleClose }) {
    const [walletSearch] = useState();

    const inputElement = useRef(null);

    useEffect(() => {
        inputElement?.current?.focus();
    }, []);

    return (
        <div>
            <Modal.Header>
                <Modal.Title style={{minWidth: "max-content"}}>Connect Wallet</Modal.Title>
                <span className="CloseModal" onClick={handleClose}>
                    <div className="close-modal"></div>
                </span>
            </Modal.Header>
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

DiscountWalletModal.propTypes = {
    handleClose: PropTypes.any,
};
