import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setShowVideo } from "../../store/reducers/generalSlice";

export default function Video() {
    const dispatch = useDispatch();

    function handleClose() {
        dispatch(setShowVideo(false));
    }

    return (
        <>
            <Modal.Header className="border-0">
                <div className="tron-PopUp__header">
                    <Modal.Title>Learn how to use NFT bridge</Modal.Title>
                    <span className="CloseModal" onClick={() => handleClose()}>
                        <Close className="svgWidget" alt="closeIcon" />
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="video-responsive">
                    <iframe
                        src="https://www.youtube.com/embed/CTxtFnABUrg"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </Modal.Body>
        </>
    );
}
