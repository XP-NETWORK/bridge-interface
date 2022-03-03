import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setShowAbout, setShowVideo } from "../../store/reducers/generalSlice";

export default function Video() {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.general.video);

  function handleClose() {
    dispatch(setShowVideo(false));
  }

  return (
    <Modal
      animation={false}
      size="xl"
      show={video}
      onHide={() => handleClose()}
    >
      <Modal.Header className="border-0">
        <div className="tron-PopUp__header">
          <Modal.Title>Learn how to use NFT bridge</Modal.Title>
          <span className="CloseModal" onClick={() => handleClose()}>
            <Close className="svgWidget" />
          </span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="video-responsive">
          <iframe
            src="https://www.youtube.com/embed/2dGi6c-nzB0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </Modal.Body>
    </Modal>
  );
}