import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { importInputs } from "../../../../utils/importNFTUtility";

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
  const from = useSelector((state) => state.general.from);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  return (
    <Modal.Body className="import-nft__body">
      {error && <div className="import-error">{error}</div>}
      <div className="import-nft__form">
        <form action="" onSubmit={((e)=>{e.preventDefault()})}>
          <div>
            <label htmlFor="contractAdd">
              {importInputs(from).contract.label}
            </label>
            <input
              onBlur={() => setContractOnBlur(true)}
              onChange={(e) => {
                handleContractChange(e.target.value);
                setContractOnBlur(true);
              }}
              type="text"
              id="contractAdd"
              name="contractAddress"
              placeholder={importInputs(from).contract.placeholder}
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
          {from.type !== "TON" && from.type !== "Solana" ? (
            <div>
              <label htmlFor="tokeId">{importInputs(from).tokenId.label}</label>
              <input
                onChange={(e) => setTokenId(e.target.value)}
                type="text"
                id="tokedId"
                name="tokenId"
                placeholder={importInputs(from).tokenId.placeholder}
                value={tokenId}
              />
            </div>
          ) : (
            ""
          )}
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
