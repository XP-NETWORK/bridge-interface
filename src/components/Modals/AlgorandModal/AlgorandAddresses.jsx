/* eslint-disable no-debugger */
import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { ReactComponent as Close } from "../../../assets/img/icons/close.svg";
import icon from "../../../assets/img/wallet/AlgorandWallet.svg";
import { withServices } from "../../App/hocs/withServices";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccount,
    setAlgorandAddresses,
    setFrom,
} from "../../../store/reducers/generalSlice";
import { Chain } from "xp.network";
import { useNavigate } from "react-router";
import { getRightPath } from "../../../utils";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { peraWallet } from "../../Wallet/ALGOWallet/AlgorandConnectors";
import { chains } from "../../values";

function AlgorandAddresses({ addresses, serviceContainer }) {
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const connectedWallet = useSelector(
        (state) => state.general.connectedWallet
    );

    const { bridge } = serviceContainer;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        dispatch(setAlgorandAddresses([]));
    };

    const navigateToAccountRoute = () => {
        navigate(getRightPath(bridge.network));
    };
    const algorand = chains.find((chain) => chain.text === "Algorand");
    const handleSelect = async (address) => {
        // debugger;
        let signer;
        const chainWrapper = await bridge.getChain(
            from?.nonce || Chain.ALGORAND
        );
        const { chain } = chainWrapper;

        switch (connectedWallet) {
            case "AlgoSigner":
                signer = {
                    address: address,
                    algoSigner: window.AlgoSigner,
                    ledger:
                        bridge.network === "testnet" ? "TestNet" : "MainNet",
                };
                break;
            case "MyAlgo":
                signer = await chain.myAlgoSigner(MyAlgoConnect, address);
                break;
            case "Pera":
                signer = await chain.myAlgoSigner(peraWallet, address);
                break;
            default:
                break;
        }
        if (from && to) navigateToAccountRoute();
        dispatch(setAccount(address));
        dispatch(setAlgorandAddresses([]));
        chainWrapper.setSigner(signer);
        bridge.setCurrentType(chainWrapper);
        dispatch(setFrom(algorand));
    };

    return (
        <div className="algorand-addresses__modal">
            <Modal.Header>
                <Modal.Title className="algo-opt-in__header">
                    Select Algorand Address
                </Modal.Title>
                <span onClick={handleClose} className="CloseModal">
                    <Close className="svgWidget" />
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="addresses__container">
                    {addresses.map((address, index) => (
                        <div
                            key={index}
                            className="address"
                            onClick={() => handleSelect(address)}
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
    serviceContainer: PropTypes.any,
};
export default withServices(AlgorandAddresses);
