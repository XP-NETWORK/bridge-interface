import { useState, React } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUnsupportedNetwork } from "../../../store/reducers/generalSlice";
import ChangeNetworkLoader from "../../innercomponents/ChangeNetworkLoader";
import { ReactComponent as CloseComp } from "../../../assets/img/icons/close.svg";
import icon from "../../../assets/img/icons/book.svg";
import { switchNetwork } from "../../../services/chains/evm/evmService";

export default function UnsupportedNetwork() {
    const handleClose = () => {
        dispatch(setUnsupportedNetwork(false));
    };
    const from = useSelector((state) => state.general.from);

    const dispatch = useDispatch();
    const [loader] = useState(false);
    const testnet = useSelector((state) => state.general.testNet);
    const unsupportedNetwork = useSelector(
        (state) => state.general.unsupportedNetwork
    );

    return (
        <Modal
            animation={false}
            show={unsupportedNetwork}
            // show={true}
            onHide={handleClose}
            className="nftWorng"
        >
            <Modal.Header className="border-0">
                <Modal.Title>Wrong Network</Modal.Title>
                <span className="CloseModal" onClick={handleClose}>
                    <CloseComp className="svgWidget closeIcon" />
                </span>
            </Modal.Header>
            <Modal.Body className="modalBody text-center">
                <div className="wrongNFT">
                    <div className="nftWornTop">
                        <span className="worngImg">
                            <div className="wrong-icon">
                                <div className="first-wrong__bg">
                                    <div className="second-wrong__bg">
                                        <img src={icon} alt="" />
                                    </div>
                                </div>
                            </div>
                        </span>
                        <h3>Please switch to supported Network</h3>
                        <p>
                            In order to continue bridging XP.NETWORK Bridge{" "}
                            <br /> requires you to connect to supported Network.
                        </p>
                    </div>
                    {loader && (
                        <div className="switchingAcc">
                            <ChangeNetworkLoader />
                            <p className="">
                                `&quot;`Switching to`&quot;`{" "}
                                {testnet ? "TestNet" : "Mainnet"}
                            </p>
                            <p className="">Follow instructions in MetaMask</p>
                        </div>
                    )}
                    {!loader && (
                        <div
                            onClick={() => switchNetwork(from)}
                            className="switching"
                        >
                            Switch Network
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}
