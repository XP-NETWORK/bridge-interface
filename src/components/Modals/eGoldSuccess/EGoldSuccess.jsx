import { Modal } from "react-bootstrap";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUnwrappedEGold } from "../../../store/reducers/generalSlice";

export default function EGoldSuccess() {
    const dispatch = useDispatch();
    const unwrappedEGold = useSelector((state) => state.general.unwrappedEGold);

    return (
        <>
            <Modal.Header className="border-0">
                <Modal.Title>Unwrap eGold</Modal.Title>
                <span
                    onClick={() => dispatch(setUnwrappedEGold(""))}
                    className="CloseModal"
                >
                    <div className="close-modal"></div>
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="eGold-success__text">{`You successfully unwrapped ${(
                    unwrappedEGold / 1e18
                ).toFixed(3)} eGold`}</div>
            </Modal.Body>
        </>
    );
}
