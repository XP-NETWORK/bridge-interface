import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./TransferLoader.css";

export default function TransferLoader() {
    const whitelistingLoader = useSelector(
        (state) => state.general.whitelistingLoader
    );

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
                    {!whitelistingLoader
                        ? "Transaction Processing"
                        : "Whitelist Processing"}
                </div>
                <div className="transfer-loader__text">
                    {!whitelistingLoader
                        ? "Departure and destination chain transactions take time, especially in periods of heavy congestion."
                        : "Deploying smart contract on destination chain."}
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
