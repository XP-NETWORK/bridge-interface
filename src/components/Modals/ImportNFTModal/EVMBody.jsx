import React from "react";
import { Modal } from "react-bootstrap";

export default function EVMBody(props) {
    return (
        <Modal.Body className="import-nft__body">
            {props.error && <div className="import-error">{props.error}</div>}
            <div className="import-nft__form">
                <form action="">
                    <div>
                        <label htmlFor="contractAdd">
                            1. Paste contract address
                        </label>
                        <input
                            onBlur={() => props.setContractOnBlur(true)}
                            onChange={(e) =>
                                props.handleContractChange(e.target.value)
                            }
                            type="text"
                            id="contractAdd"
                            name="contractAddress"
                            placeholder="0x..."
                            value={props.contract}
                            className={
                                props.contractOnBlur && !props.validContract
                                    ? "contract__input--invalid"
                                    : "contract__input--valid"
                            }
                        />
                        <div
                            className={
                                props.contractOnBlur && !props.validContract
                                    ? "contract--invalid"
                                    : "contract--valid"
                            }
                        >
                            Error contract address
                        </div>
                    </div>
                    <div>
                        <label htmlFor="tokeId">2. Paste Toked ID</label>
                        <input
                            onChange={(e) => props.setTokenId(e.target.value)}
                            type="text"
                            id="tokedId"
                            name="tokenId"
                            placeholder="Enter Token ID"
                            value={props.tokenId}
                        />
                    </div>
                    <div className="import-nft__buttons">
                        <div
                            onClick={props.handleImport}
                            style={
                                props.validForm && !props.importBlocked
                                    ? {}
                                    : props.OFF
                            }
                            className="btn-import"
                        >
                            Import
                        </div>
                        <div onClick={props.handleClose} className="btn-cancel">
                            Cancel
                        </div>
                    </div>
                </form>
            </div>
        </Modal.Body>
    );
}
