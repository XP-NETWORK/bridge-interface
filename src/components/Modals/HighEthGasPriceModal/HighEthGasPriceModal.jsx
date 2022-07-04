import React from "react";
import { useDispatch } from "react-redux";
import {
    setChainModal,
    setDepartureOrDestination,
    setHighEthGasPriceModal,
} from "../../../store/reducers/generalSlice";
import { Modal } from "react-bootstrap";
import message from "../../../assets/img/nav/message.svg";

export default function HighEthGasPriceModal() {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setHighEthGasPriceModal(false));
    };
    const handleSwithChain = () => {
        handleClose();
        dispatch(setDepartureOrDestination("destination"));
        dispatch(setChainModal(true));
    };

    return (
        <>
            <div className="helper-center__header">
                <div className="helper-center__title">
                    <img src={message} />
                    <div>Helper center</div>
                </div>
                <span className="helper-center__close">
                    <div onClick={handleClose} className="close-modal"></div>
                </span>
            </div>
            <Modal.Body>
                <div className="helper-center__text">
                    <div>Unreasonably high gas price on Ethereum</div>
                    <div>
                        Try to transfer your NFTs later or transfer to another
                        chain.
                    </div>
                </div>
                <div className="helper-center__button">
                    <div onClick={handleSwithChain}>Switch Chain</div>
                </div>
            </Modal.Body>
        </>
    );
}
