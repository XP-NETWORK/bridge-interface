import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setImportModal,
  setPreloadNFTs,
  setNFTList,
} from "../../../store/reducers/generalSlice";

import { validateFunctions } from "../../../services/addressValidators";
import "./importNFTModal.css";
import EVMBody from "./EVMBody";
import { withServices } from "../../App/hocs/withServices";
import { importNFTURI, validForm } from "../../../utils/importNFTUtility";

function ImportNFTModal({ serviceContainer }) {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const account = useSelector((state) => state.general.account);
  const NFTList = useSelector((state) => state.general.NFTList);

  const [validContract, setValidContract] = useState(true);
  const [contract, setContract] = useState();
  const [contractOnBlur, setContractOnBlur] = useState(false);
  const [tokenId, setTokenId] = useState();
  const [importBlocked, setImportBlocked] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    dispatch(setImportModal(false));
  };

  const handleContractChange = (value) => {
    setContract(value);
    // if (value.length === 42 || value.length === 0) {
    //   setValidContract(true);
    // } else setValidContract(false);

    if (value.length > 0 && from.type === "EVM") {
      setValidContract(validateFunctions.EVM(value));
    } else if (from.type === "Elrond") {
      console.log("Elrond");
      setValidContract(validateFunctions.Elrond(value));
    } else {
      setValidContract(true);
    }
  };

  /**
   *
   * IMPORTING TOKEN
   */
  const handleImport = async () => {
    try {
      setImportBlocked(true);

      const fromChain = await serviceContainer.bridge.getChain(from.nonce);
      const signer = fromChain.signer;

      if (
        NFTList.find(
          (n) => n.native.contract === contract && n.native.tokenId === tokenId
        )
      )
        throw new Error("NFT already imported!");

      const formattedData = await importNFTURI(
        contract,
        tokenId,
        account,
        signer,
        from
      );

      dispatch(setPreloadNFTs(NFTList ? NFTList.length + 1 : 1));
      dispatch(setNFTList(NFTList ? [...NFTList, formattedData] : [formattedData]));
      dispatch(setImportModal(false));
      setImportBlocked(false);
      setError('');

    } catch (err) {
      console.log(err);
      setImportBlocked(false);
      setError(err.message || "You don't own this NFT!");
    }
  };


  return (
    <div>
      <Modal.Header className="border-0">
        <Modal.Title>Import NFT</Modal.Title>
        <span className="CloseModal">
          <div onClick={handleClose} className="close-modal"></div>
        </span>
      </Modal.Header>
      <EVMBody
        validContract={validContract}
        contract={contract}
        contractOnBlur={contractOnBlur}
        setContractOnBlur={setContractOnBlur}
        tokenId={tokenId}
        setTokenId={setTokenId}
        importBlocked={importBlocked}
        error={error}
        validForm={validForm(from, contract, tokenId)}
        // OFF={OFF}
        handleClose={handleClose}
        handleContractChange={handleContractChange}
        handleImport={handleImport}
      />
    </div>
  );
}



export default withServices(ImportNFTModal)