import React, { useEffect, useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as Close } from "../assets/img/icons/close.svg";
import AlgoSignerIcon from "../assets/img/wallet/Algo Signer.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlgoSigner,
  setAlgorandAccount,
  connectAlgorandWalletClaim,
  setMyAlgo,
  setAlgorandWallet,
  setAlgoAccountToClaim,
  setTransferLoaderModal,
} from "../store/reducers/generalSlice";
import { algoConnector } from "../wallet/connectors";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import AlgorandIcon from "../assets/img/algorandwallet.svg";
import MyAlgoBlue from "../assets/img/wallet/MyAlgoBlue.svg";
import axios from "axios";
import { getFactory } from "../wallet/helpers";

function ConnectAlgorand({nftToOptIn, testnet}) {
  const dispatch = useDispatch();
  const [toOptIn, setToOptIn] = useState()
  const [accounts, setAccounts] = useState()
  const handleClose = () => {
    dispatch(connectAlgorandWalletClaim(false));
  };

  const connectClaimAlgorand = useSelector(
    (state) => state.general.connectClaimAlgorand
  );

  const algorandAccountToOptIn = useSelector((state) => state.general.algorandAccountToClaim);
  const networkTestnet = useSelector((state) => state.general.testNet);


  const onAlgoWallet = async () => {
    if (!algoConnector.connected) {
      algoConnector.createSession();
    }

    algoConnector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get provided accounts
      const { accounts } = payload.params[0];
      if (accounts) {
        dispatch(setAlgorandWallet(true));
        dispatch(setAlgorandAccount(accounts[0]));
        handleClose();
      }
    });
  };

  const onMyAlgo = useCallback(async () => {
    const myAlgoConnect = new MyAlgoConnect();
    try {
      const accountsSharedByUser = await myAlgoConnect.connect();
      dispatch(setAlgorandAccount(accountsSharedByUser[0].address));
      dispatch(setMyAlgo(true));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  });

  const onAlgoSigner = async () => {
    if (typeof window.AlgoSigner !== undefined) {
      try {
        await window.AlgoSigner.connect();
        const algo = await window.AlgoSigner.accounts({
          ledger: testnet ? "TestNet" : "MainNet",
        });
        setAccounts(algo)
        dispatch(setAlgoSigner(true));
      } catch (e) {
        console.error(e);
        return JSON.stringify(e, null, 2);
      }
    } else {
      console.log("Algo Signer not installed.");
    }
  };

  const setAlgoAccountToOptIn = (account) => {
    dispatch(setAlgoAccountToClaim(account['address']))
  }

  const optIn = async () => {
    debugger
    dispatch(setTransferLoaderModal(true))
    const factory = await getFactory()
    const algorand = await factory.inner(15)
    // const accounts = await window.AlgoSigner.accounts({ledger:"TestNet"})
    const signer = {
      address: algorandAccountToOptIn,
      algoSigner: window.AlgoSigner,
      ledger: testnet ? "TestNet" : "MainNet"
    }
        try {
            const optin = await algorand.optInNft(signer, toOptIn)
            if(optin){
              handleClose()
            }
        } catch (error) {
            console.log(error);
            console.trace();
            dispatch(setTransferLoaderModal(false))
        }
    dispatch(setTransferLoaderModal(false))
}

   useEffect(async () => {
     let nft
     if(algorandAccountToOptIn){
        try {
          const response = await axios.get(nftToOptIn)
          // console.log("🚀 ~ file: ConnectAlgorand.jsx ~ line 117 ~ useEffect ~ response", response.data)
          nft = {
            image: response.data.image,
            nftId: response.data.wrapped.assetID,
            name: response.data.name
          }
          setToOptIn(nft)
        } catch (error) {
          console.error(error)
        }
     }
   }, [algorandAccountToOptIn])
   

  return (
    <Modal
      show={connectClaimAlgorand}
      onHide={handleClose}
      animation="false"
      className="ChainModal"
    >
      { !algorandAccountToOptIn ?
      <>
      <Modal.Header>
      <Modal.Title>Connect Wallet</Modal.Title>
      <span className="CloseModal" onClick={handleClose}>
        <Close className="svgWidget" />
      </span>
      </Modal.Header>
      <Modal.Body>
        <div className="walletListBox">
          <div className="imgcontainer">
            <img src={AlgorandIcon} />
          </div>
          <h3 className="walletalgotitle">
            {!accounts ?
            "Connect an Algorand wallet to opt-in NFTs":
            "Select Account"}
          </h3>
          {window.innerWidth < 600 && (
            <div className="no-wallets">
              Claiming your nft is currently only available on desktop using
              MyAlgo or Algosigner
            </div>
          )}
          {window.innerWidth > 600 && !accounts && (
            <ul className="walletList scrollSty">
              <li onClick={onAlgoSigner} className="wllListItem algo">
                <img src={AlgoSignerIcon} alt="Algor Signer Icon" /><p>Algo Signer</p>
              </li>
              {networkTestnet && <li onClick={onMyAlgo} className="wllListItem algo">
                <img src={MyAlgoBlue} alt="" /> MyAlgo
              </li>}
            </ul>
          )}
          {accounts && 
          <ul className="algoSigner__accounts">
          {accounts?.map(account => <li onClick={() => setAlgoAccountToOptIn(account)} className="algo-opt-in__button" key={`${account['address']}`}>{`${account['address'].substring(0, 4)}...${account['address'].substring(account['address'].length - 4)}`}</li>)}
          </ul>}
        </div>
      </Modal.Body></>
      :
      <>
      <Modal.Header>
      <Modal.Title className="algo-opt-in__header">Algorand Opt-in</Modal.Title>
      <span className="CloseModal" onClick={handleClose}>
        <Close className="svgWidget" />
      </span>
      </Modal.Header>
      <Modal.Body>
        <div className="walletListBox">
          <div className="imgcontainer">
            <img src={toOptIn?.image} alt=""/>
          </div>
          <div className="algo-opt-in__name">{toOptIn?.name}</div>
          <div className="algo-opt-in__btns">
            <div onClick={handleClose} className="algo-opt-in__button">Skip for now</div>
            <div onClick={optIn} className="algo-opt-in__button">Opt-in NFT</div>
          </div>
        </div>
      </Modal.Body>
      </>
      }
    </Modal>
  );
}

export default ConnectAlgorand;
