import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CloseComp } from "../../../assets/img/icons/close.svg";
import {
    setDiscountOn,
    setUseDiscount,
} from "../../../store/reducers/discountSlice";
import xpnet from "../../../assets/img/icons/XPNET.svg";

export default function UseDiscountModal() {
    const dispatch = useDispatch();
    const discountLeftUsd = useSelector(
        (state) => state.discount.discountLeftUsd
    );
    const handleClose = () => {
        dispatch(setDiscountOn(false));
    };

    const handleClick = () => {
        dispatch(setUseDiscount(true));
        dispatch(setDiscountOn(false));
    };
    return (
        <Modal.Body>
            <Modal.Header className="use-discount__header">
                <img src={xpnet} alt="" />
                <div className="use-discount__title">XPNET Discount</div>
                <div className="use-discount-close" onClick={handleClose}>
                    <CloseComp className="svgWidget" />
                </div>
            </Modal.Header>
            <div className="use-discount__body">
                <div className="use-discount__subtitle">
                    Use your XPNET discount for this transaction
                </div>
                <div className="use-discount__info">
                    <div className="use-discount__percent">
                        <span>Discount</span>
                        <span>40%</span>
                    </div>
                    <div className="use-discount__line"></div>
                    <div className="use-discount__available">
                        <span>Available for</span>
                        <span>{`${discountLeftUsd} Tx`}</span>
                    </div>
                </div>
            </div>
            <div className="use-discount__btns">
                <span onClick={handleClose}>Cancel</span>
                <span onClick={handleClick}>Use now</span>
            </div>
        </Modal.Body>
    );
}
