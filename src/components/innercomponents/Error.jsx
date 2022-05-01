import React from "react";
import { Modal, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setError } from "../../store/reducers/generalSlice";
import ERR from "../../assets/img/icons/ERROR.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "../Modals/AccountModal/Tooltip";

export default function Error() {
  const dispatch = useDispatch();
  const URLToOptIn = useSelector(state => state.general.URLToOptIn)
  const handleClose = () => {
    dispatch(setError(false));
  };
  const error = useSelector((state) => state.general.error);

  return (
    <Modal show={error} className="error__modal">
      <Modal.Header animation={false} className="border-0">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img style={{ margin: "30px" }} alt="" src={ERR} />
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
      <Modal.Body className="modalBody text-center" >
        <div className="wrongNFT" style={{overflowWrap: "break-word"}}>
          <p> {typeof error === "object" ? error?.message : error}</p>
         
        </div>
        { URLToOptIn &&
          <CopyToClipboard text={URLToOptIn}>
            <div className="opt-in__error">
              <div className="opt-in__body">
                <div className="opt-in__text">Click on <a href={URLToOptIn} target="_blank" rel="noreferrer">LINK </a>
                or send it to the receiver to opt-in the NFT.</div>
              </div>
            </div>
          </CopyToClipboard>
        }
      </Modal.Body>
    </Modal>
  );
}
