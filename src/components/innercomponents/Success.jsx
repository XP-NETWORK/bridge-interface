import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setSuccess } from "../../store/reducers/generalSlice";
import SUCCESS from "../../assets/img/icons/Success.svg";

export default function Success() {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSuccess(null));
};

  const successMsg = useSelector((state) => state.general.successMsg);

  return (
    <>
      <Modal.Header animation={false} className="border-0">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            style={{ margin: "40px auto", width: 80 }}
            alt=""
            src={SUCCESS}
          />
          <Modal.Title style={{ textAlign: "center" }}>SUCCESS</Modal.Title>
          <span className="CloseModal" onClick={handleClose}>
            <Close className="svgWidget" />
          </span>
        </div>
      </Modal.Header>
      <Modal.Body className="modalBody text-center">
        <div className="wrongNFT">{successMsg}</div>
      </Modal.Body>
    </>
  );
}
