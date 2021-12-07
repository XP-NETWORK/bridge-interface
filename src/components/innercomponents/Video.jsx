import React from 'react'
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import Close from '../../assets/img/icons/close.svg';
import { setShowAbout, setShowVideo } from '../../store/reducers/generalSlice';

export default function Video() {
    const dispatch = useDispatch()
    const video = useSelector(state => state.general.video)

    function handleClose() {
        dispatch(setShowVideo(false))
    }

    return (
        <Modal show={video} onHide={() => handleClose()}>
            <Modal.Header className="border-0">
                <div className="tron-PopUp__header">
                    <Modal.Title>Learn how to use NFT bridge</Modal.Title>
                    <span className="CloseModal" onClick={() => handleClose()}>
                        <img src={Close} alt="" />
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body>
            <div className="video-responsive">
                <iframe
                width="100%"
                height="280px"
                src="https://www.youtube.com/embed/o-em_ooWN3g"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                />
            </div>
            </Modal.Body>
        </Modal>
    )
}