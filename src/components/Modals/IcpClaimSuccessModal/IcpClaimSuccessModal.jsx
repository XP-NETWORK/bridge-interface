import React, { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../../assets/img/icons/close.svg";
import { setIcpClaimSuccess } from "../../../store/reducers/generalSlice";
import SUCCESS from "../../../assets/img/icons/Success.svg";

export default function IcpClaimSuccessModal() {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState();
  const icpClaimSuccess = useSelector((state) => state.general.icpClaimSuccess);

  const handleClose = () => {
    dispatch(
      setIcpClaimSuccess({
        showModal: false,
        canisterId: null,
      })
    );
  };

  const copyTextToClipboard = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(icpClaimSuccess?.canisterId);
    } else {
      return document.execCommand("copy", true, icpClaimSuccess?.canisterId);
    }
  };

  return (
    <>
      <Modal.Header animation={false} className="border-0">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            style={{ margin: "40px auto", width: 80 }}
            alt=""
            src={SUCCESS}
          />
          <Modal.Title style={{ textAlign: "center" }}>
            NFT Claimed Successfully
          </Modal.Title>
          <span className="CloseModal" onClick={handleClose}>
            <Close className="svgWidget" />
          </span>
        </div>
      </Modal.Header>
      <Modal.Body className="modalBody text-center">
        <div className="wrongNFT">{"Canister ID"}</div>
        <InputGroup
          className="mb-3"
          style={{
            width: "80%",
            margin: "auto",
            cursor: "pointer",
          }}
        >
          <Form.Control
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            readOnly
            value={icpClaimSuccess?.canisterId}
            style={{ background: "rgb(249 250 251)" }}
          />
          <InputGroup.Text id="basic-addon2" onClick={copyTextToClipboard}>
            {copied ? "Copied!" : "Copy"}
          </InputGroup.Text>
        </InputGroup>
      </Modal.Body>
    </>
  );
}
