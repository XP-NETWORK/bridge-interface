import React from "react";
import { Modal, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setError } from "../../store/reducers/generalSlice";
import ERR from "../../assets/img/icons/ERROR.svg";

export default function Error() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setError(false));
  };
  const error = useSelector((state) => state.general.error);

  return (
    <>
      <Modal.Header className="border-0">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img style={{ margin: "30px" }} src={ERR} />
          <Modal.Title>An error has occured</Modal.Title>
          <span
            className="CloseModal"
            onHide={handleClose}
            onClick={handleClose}
          >
            <Close className="svgWidget" />
          </span>
        </div>
      </Modal.Header>
      <Modal.Body className="modalBody text-center">
        <div className="wrongNFT">
          {typeof error === "object" ? error?.message : error}
        </div>
      </Modal.Body>
    </>
  );
}
