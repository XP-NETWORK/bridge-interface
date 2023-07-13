import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./TransferLoader.css";

export default function TransferLoader({ mode }) {
    const whitelistingLoader = useSelector(
        (state) => state.general.whitelistingLoader
    );

    if (whitelistingLoader) {
        mode = "whitelist";
    }

    const title = {
        auth: "Authentification",
        whitelist: "Whitelist Processing",
    };

    const details = {
        auth: "Please wait",
        whitelist:
            "Please wait patiently while our servers are fetching your code and approving it. Fetching code from blockchain can take a while.",
    };

    return (
        <>
            <Modal.Header className="border-0">
                <Modal.Title>
                    <div className="transfer-loader__animation">
                        <Animation />
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="transfer-loader__body">
                <div className="transfer-loader__title">
                    {title[mode] || "Transaction Processing"}
                </div>
                <div className="transfer-loader__text">
                    {details[mode] ||
                        "Departure and destination chain transactions take time, especially in periods of heavy congestion."}
                </div>
                <div className="transfer-loader__sub">💙 Please be patient</div>
            </Modal.Body>
        </>
    );
}

function Animation() {
    return (
        <div className="center">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
    );
}
