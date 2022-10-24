import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

export default function EVMBody({
    error,
    tokenId,
    handleImport,
    handleClose,
    validForm,
    importBlocked,
    validContract,
    setTokenId,
    setContractOnBlur,
    contract,
    contractOnBlur,
    handleContractChange,
}) {
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    return (
        <Modal.Body className="import-nft__body">
            {error && <div className="import-error">{error}</div>}
            <div className="import-nft__form">
                <form action="">
                    <div>
                        <label htmlFor="contractAdd">
                            1. Paste contract address
                        </label>
                        <input
                            onBlur={() => setContractOnBlur(true)}
                            onChange={(e) =>
                                handleContractChange(e.target.value)
                            }
                            type="text"
                            id="contractAdd"
                            name="contractAddress"
                            placeholder="0x..."
                            value={contract}
                            className={
                                contractOnBlur && !validContract
                                    ? "contract__input--invalid"
                                    : "contract__input--valid"
                            }
                        />
                        <div
                            className={
                                contractOnBlur && validContract
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
                            onChange={(e) => setTokenId(e.target.value)}
                            type="text"
                            id="tokedId"
                            name="tokenId"
                            placeholder="Enter Token ID"
                            value={tokenId}
                        />
                    </div>
                    <div className="import-nft__buttons">
                        <div
                            onClick={handleImport}
                            style={validForm && !importBlocked ? {} : OFF}
                            className="btn-import"
                        >
                            Import
                        </div>
                        <div onClick={handleClose} className="btn-cancel">
                            Cancel
                        </div>
                    </div>
                </form>
            </div>
        </Modal.Body>
    );
}
EVMBody.propTypes = {
    error: PropTypes.string,
    tokenId: PropTypes.string,
    handleImport: PropTypes.any,
    handleClose: PropTypes.any,
    validForm: PropTypes.bool,
    importBlocked: PropTypes.bool,
    validContract: PropTypes.bool,
    setTokenId: PropTypes.any,
    setContractOnBlur: PropTypes.any,
    contract: PropTypes.string,
    contractOnBlur: PropTypes.string,
    handleContractChange: PropTypes.any,
};
