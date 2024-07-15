import { ethers } from "ethers";
import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { notifyExplorerForHederaAssociation } from "../../../services/explorer";

export default function ConnectMetamaskWithHaspack({ handleClose }) {
  const [loading, setLoading] = useState(false);
  const account = useSelector((state) => state.general.account);
  const onConnectClick = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner(accounts[0]);

        const address = await signer.getAddress();
        await signer.signMessage(
          "This account is going to associate with ur hedera account."
        );
        //POST api call here...
        console.log("from", account, address);

        const res = await notifyExplorerForHederaAssociation(account, address);

        if (res.message === "Success") {
          setLoading(false);
          handleClose();
        } else {
          alert(
            res.message
          );
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  return (
    <div>
      <Modal.Header className="border-0 pt-5">
        <Modal.Title>Connect Metamask For Galax Campaign</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center px-5 py-3">
          <Button
            variant="primary"
            size="lg"
            style={{
              height: 50,
              width: "90%",
            }}
            onClick={onConnectClick}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <span
                style={{
                  padding: 15,
                }}
              >
                Connect
              </span>
            )}
          </Button>
        </div>
      </Modal.Body>
    </div>
  );
}
