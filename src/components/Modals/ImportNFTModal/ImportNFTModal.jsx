import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setImportModal,
  setPreloadNFTs,
  setNFTList,
} from "../../../store/reducers/generalSlice";

import { validateFunctions } from "../../../services/addressValidators";
import ABI from '../../../event/assets/abi/mintAbi.json'
import ABI1155 from '../../../event/assets/abi/erc1155Abi.json'

import "./importNFTModal.css";
import EVMBody from "./EVMBody";
import { ethers } from "ethers";
import { withServices } from "../../App/hocs/withServices";

function ImportNFTModal({
  serviceContainer
}) {
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
  const validForm = contract?.length === 42 && tokenId;
 
  const handleClose = () => {
    dispatch(setImportModal(false));
  };

  const handleContractChange = (value) => {
    setContract(value);
    // if (value.length === 42 || value.length === 0) {
    //   setValidContract(true);
    // } else setValidContract(false);

    if (value.length > 0) {
      setValidContract(validateFunctions.EVM(value))
    }
    else {
      setValidContract(true)
    }
  };

  /**
   * 
   * IMPORTING TOKEN 
   */
  const handleImport = async () => {
    try {
      setImportBlocked(true);

      // Assuming 'serviceContainer.bridge.getChain' is correct syntax
      const fromChain = await serviceContainer.bridge.getChain(from.nonce);
      const signer = fromChain.signer;
      const Contract = new ethers.Contract(contract, ABI, signer);


      let owner;
      let tokenURI;
      let contractType;

      if (NFTList.find(n => n.native.contract === contract && n.native.tokenId === tokenId)) {
        setImportBlocked(false);
        setError("This NFT already exists!");
        return;
      }

      try {
        // Check if the token is ERC721
        owner = await Contract.ownerOf(tokenId);
        tokenURI = await Contract.tokenURI(tokenId);
        contractType = 'ERC721';

        if (owner !== account) {
          setImportBlocked(false);
          setError("You don't own this NFT!");
          return;
        }
      } catch (err721) {
        console.log({ err721 })
        // If ERC721 check fails, try ERC1155
        try {
          const contract1155 = new ethers.Contract(contract, ABI1155, signer);
          const balance1155 = await contract1155.balanceOf(account, tokenId);

          if (balance1155.toNumber() <= 0) {
            setImportBlocked(false);
            setError("You don't own this NFT!");
            return;
          }

          owner = account;
          tokenURI = await contract1155.uri(tokenId);
          contractType = 'ERC1155';
        } catch (err) {
          console.log(err);
          setImportBlocked(false);
          setError("You don't own this NFT!");
          return;
        }
      }

      const formattedData = {
        collectionIdent: contract,
        uri: tokenURI,
        native: {
          owner,
          tokenId,
          uri: tokenURI,
          contract,
          name: 'NFTs',
          chainId: from.chainId,
          contractType,
        },
      };

      dispatch(setPreloadNFTs(NFTList ? NFTList.length + 1 : 1));
      dispatch(setNFTList(NFTList ? [...NFTList, formattedData] : [formattedData]));
      dispatch(setImportModal(false));
      setImportBlocked(false);
      setError('');

    } catch (err) {
      console.log(err);
      setImportBlocked(false);
      setError("Error importing NFT. Please try again.");
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
        validForm={validForm}
        // OFF={OFF}
        handleClose={handleClose}
        handleContractChange={handleContractChange}
        handleImport={handleImport}
      />
    </div>
  );
}



export default withServices(ImportNFTModal)