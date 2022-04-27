import React, { useEffect, useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as Close } from "../assets/img/icons/close.svg";
import AlgoSignerIcon from "../assets/img/wallet/Algo Signer.png";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import {
  setAlgoSigner,
  setAlgorandAccount,
  connectAlgorandWalletClaim,
  setMyAlgo,
  setAlgorandWallet,
  setAlgoAccountToClaim,
} from "../store/reducers/generalSlice";
import { injected, algoConnector } from "../wallet/connectors";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import AlgorandIcon from "../assets/img/algorandwallet.svg";
import MyAlgoBlue from "../assets/img/wallet/MyAlgoBlue.svg";

function ConnectAlgorand() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const [show, setShow] = useState();
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const handleClose = () => {
    dispatch(connectAlgorandWalletClaim(false));
  };
  const handleShow = () => setShow(true);
  const connectClaimAlgorand = useSelector(
    (state) => state.general.connectClaimAlgorand
  );
  const tronLink = useSelector((state) => state.general.tronLink);
  const trustWallet = useSelector((state) => state.general.trustWallet);
  const AlgoSigner = useSelector((state) => state.general.AlgoSigner);
  const onWC = useSelector((state) => state.general.WalletConnect);
  const testnet = useSelector((state) => state.general.testNet);
  const algorandAccountToClaim = useSelector((state) => state.general.algorandAccountToClaim);
  const [qrCodeString, setQqrCodeString] = useState();
  const [strQR, setStrQr] = useState();
  const { chainId, account, activate } = useWeb3React();

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
        const { address } = algo[0];

        dispatch(setAlgoSigner(true));
        dispatch(setAlgoAccountToClaim(address));
        // handleClose();
      } catch (e) {
        console.error(e);
        return JSON.stringify(e, null, 2);
      }
    } else {
      console.log("Algo Signer not installed.");
    }
  };

  return (
    // connectClaimAlgorand
    <Modal
      show={connectClaimAlgorand}
      onHide={handleClose}
      animation={false}
      className="ChainModal"
    >
      <Modal.Header>
        <Modal.Title>Connect Wallet</Modal.Title>
        <span className="CloseModal" onClick={handleClose}>
          <Close className="svgWidget" />
        </span>
      </Modal.Header>
      { !algorandAccountToClaim ? 
      <Modal.Body>
        <div className="walletListBox">
          <div className="imgcontainer">
            <img src={AlgorandIcon} />
          </div>
          <h3 className="walletalgotitle">
            Connect an Algorand wallet to claim NFTs
          </h3>
          {window.innerWidth < 600 && (
            <div className="no-wallets">
              Claiming your nft is currently only available on desktop using
              MyAlgo or Algosigner
            </div>
          )}
          {window.innerWidth > 600 && (
            <ul className="walletList scrollSty">
              <li onClick={onAlgoSigner} className="wllListItem algo">
                <img src={AlgoSignerIcon} alt="Algor Signer Icon" /><p>Algo Signer</p>
              </li>
              {testnet && <li onClick={onMyAlgo} className="wllListItem algo">
                <img src={MyAlgoBlue} alt="" /> MyAlgo
              </li>}
            </ul>
          )}
        </div>
      </Modal.Body>
      :
      <Modal.Body>
        <div className="walletListBox">
          <div className="imgcontainer">
            <img src={AlgorandIcon} alt="" />
          </div>
        </div>
      </Modal.Body>
      }
    </Modal>
  );
}

export default ConnectAlgorand;
