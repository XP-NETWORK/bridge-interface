import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

export default function HederaBody({
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
        <form action="" onSubmit={((e)=>{e.preventDefault()})}>
          <div>
            <label htmlFor="contractAdd">1. Paste Token id</label>
            <input
              onBlur={() => setContractOnBlur(true)}
              onChange={(e) => {
                handleContractChange(e.target.value);
                setContractOnBlur(true);
              }}
              type="text"
              id="contractAdd"
              name="contractAddress"
              placeholder="0.0.432..."
              value={contract}
              className={
                 validContract
                  ? "contract__input--valid"
                  : "contract__input--invalid"
              }
            />
            {contractOnBlur && !validContract && (
              <span className={"contract--invalid"}>
                Error Contract Address
              </span>
            )}
          </div>
          <div>
            <label htmlFor="tokeId">2. Paste Serial No.</label>
            <input
              onChange={(e) => setTokenId(e.target.value)}
              type="text"
              id="tokedId"
              name="tokenId"
              placeholder="1"
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
HederaBody.propTypes = {
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
