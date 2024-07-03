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
  const chainNonce = from.nonce;
  console.log({ chainNonce })

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

  //"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ";
  //"http://192.168.129.241:3000/nfts/nftCheck";
  const handleImport = async () => {
    setImportBlocked(true);
    setTimeout(() => {
      setImportBlocked(false);
    }, 10000);


    const fromChain = await serviceContainer.bridge.getChain(from.nonce)
    const signer = fromChain.signer
    const Contract = new ethers.Contract(contract, ABI, signer);

    try {

      const owner = await Contract.ownerOf(tokenId);

      if (owner !== account) {
        setImportBlocked(false);
        setError("You dont own this NFT!")
        return;
      }

      console.log({ NFTList })

      if (NFTList.find(n => n.native.contract === contract && n.native.tokenId === tokenId)) {
        setImportBlocked(false);
        setError("This NFT already exists!")
        return;
      }

      setError('')
      const tokenURI = await Contract.tokenURI(tokenId);

      const formatedData = {
        collectionIdent: contract,
        uri: tokenURI,
        native: {
          owner,
          tokenId,
          uri: tokenURI,
          contract,
          name: 'NFTs',
          chainId: from.chainId,
          contractType: 'ERC721',
        }
      }

      dispatch(setPreloadNFTs(NFTList ? NFTList.length + 1 : 1));
      dispatch(setNFTList(NFTList ? [...NFTList, formatedData] : [formatedData]));
      dispatch(setImportModal(false));
      setImportModal(false)
      setImportBlocked(false);

    } catch (err) {
      console.log({ err })
      setImportBlocked(false);
      setError("NFT doesn't exist!")
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