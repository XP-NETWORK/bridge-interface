import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { ReactComponent as Close } from "../../../assets/img/icons/close.svg";
import icon from "../../../assets/img/wallet/AlgorandWallet.svg";

export default function AlgorandAddresses({ addresses }) {
    return (
        <div className="algorand-addresses__modal">
            <Modal.Header>
                <Modal.Title className="algo-opt-in__header">
                    Select Algorand Address
                </Modal.Title>
                <span className="CloseModal">
                    <Close className="svgWidget" />
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="addresses__container">
                    {addresses.map((address, index) => (
                        <div
                            key={index}
                            className="address"
                            onClick={() => console.log({ address })}
                        >
                            <span className="address-icon">
                                <img src={icon} alt="" />
                            </span>
                            <span className="address-text">
                                {`${address.slice(0, 10)}...${address.slice(
                                    address.length - 10
                                )}`}
                            </span>
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </div>
    );
}
AlgorandAddresses.propTypes = {
    addresses: PropTypes.array,
};
