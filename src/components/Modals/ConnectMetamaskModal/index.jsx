import { ethers } from "ethers";
import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

export default function ConnectMetamaskWithHaspack({ handleClose }) {
  const [loading, setLoading] = useState(false);

  const onConnectClick = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const address = await signer.getAddress();
        console.log({ address });
        await new Promise((r) => setTimeout(r, 1000));

        //POST api call here...

        await new Promise((r) => setTimeout(r, 2000));
        setLoading(false);
        handleClose();
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
