import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Close from "../../../assets/img/icons/close.svg";
import Wrong from "../../../assets/img/Wrong.svg";
import { CHAIN_INFO, TESTNET_CHAIN_INFO, chains } from "../../values";
import { useSelector } from "react-redux";
import { getAddEthereumChain } from "../../../wallet/chains";
import { useDispatch } from "react-redux";
import { setWrongNetwork } from "../../../store/reducers/generalSlice";
import ChangeNetworkLoader from "../../innercomponents/ChangeNetworkLoader";
import { ReactComponent as CloseComp } from "../../../assets/img/icons/close.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import icon from "../../../assets/img/icons/book.svg";
import { switchNetwork } from "../../../services/chains/evm/evmService";

function ChangeNetworkModal() {
    const handleClose = () => {
        dispatch(setWrongNetwork(false));
    };
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const showWrong = useSelector((state) => state.general.wrongNetwork);
    const account = useSelector((state) => state.general.account);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const testnet = useSelector((state) => state.general.testNet);
    const WalletConnect = useSelector((state) => state.general.WalletConnect);
    const location = useLocation();
    const navigate = useNavigate();
    const { chainId } = useWeb3React();
    const isSupported = !testnet
        ? chains.some((chain) => chain.chainId === chainId)
        : chains.some((chain) => chain.tnChainId === chainId);

    const forbidden =
        chainId === to?.chainId &&
        (location.pathname === "/account" ||
            location.pathname === "/testnet/account");

    // async function switchNetwork() {
    //     setLoader(true);
    //     const info = testnet
    //       ? TESTNET_CHAIN_INFO[from?.key]
    //       : CHAIN_INFO[from?.key];
    //     const _chainId = `0x${info.chainId.toString(16)}`;
    //     try {
    //       const success = await window.ethereum.request({
    //         method: "wallet_switchEthereumChain",
    //         params: [{ _chainId }],
    //       });
    //       navigate(testnet ? `/testnet/account${location.search ? location.search : ''}` : `/account${location.search ? location.search : ''}`)
    //       dispatch(setWrongNetwork(false));
    //     } catch (error) {
    //       setLoader(false);
    //       console.log(error);
    //       try {
    //         const toHex = (num) => {
    //           return "0x" + num.toString(16);
    //         };
    //         const chain = getAddEthereumChain()[parseInt(_chainId).toString()];

    //         const params = {
    //           chainId: _chainId, // A 0x-prefixed hexadecimal string
    //           chainName: chain.name,
    //           nativeCurrency: {
    //             name: chain.nativeCurrency.name,
    //             symbol: chain.nativeCurrency.symbol, // 2-6 characters long
    //             decimals: chain.nativeCurrency.decimals,
    //           },
    //           rpcUrls: chain.rpc,
    //           blockExplorerUrls: [
    //             chain.explorers &&
    //             chain.explorers.length > 0 &&
    //             chain.explorers[0].url
    //               ? chain.explorers[0].url
    //               : chain.infoURL,
    //           ],
    //         };
    //         await window.ethereum.request({
    //           method: "wallet_addEthereumChain",
    //           params: [params, account],
    //         });
    //         dispatch(setWrongNetwork(false));
    //         setLoader(false);
    //         navigate(testnet ? `/testnet/account${location.search ? location.search : ''}` : `/account${location.search ? location.search : ''}`)
    //       } catch (error) {
    //         setLoader(false);
    //         console.log(error);
    //       }
    //     }
    // }

    useEffect(() => {}, [showWrong]);

    return forbidden ? (
        <Modal
            animation={false}
            // show={showWrong}
            // show={true}
            onHide={undefined}
            className="nftWorng"
        >
            <Modal.Header className="border-0">
                <Modal.Title>Wrong Network</Modal.Title>
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
                        <h3>
                            Destination and departure chains <br /> can't be the
                            same
                        </h3>
                        <p>
                            Please use MetaMask to switch the departure chain.
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    ) : (
        <Modal
            animation={false}
            show={showWrong}
            // show={true}
            onHide={isSupported ? handleClose : undefined}
            className="nftWorng"
        >
            <Modal.Header className="border-0">
                <Modal.Title>Wrong Network</Modal.Title>
                {!forbidden && (
                    <span className="CloseModal" onClick={handleClose}>
                        <CloseComp className="svgWidget closeIcon" />
                    </span>
                )}
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
                        <h3>
                            Switch to{" "}
                            {from?.key === "xDai" ? "Gnosis" : from?.key}{" "}
                            {testnet ? "TestNet" : "Mainnet"}
                        </h3>
                        <p>
                            XP.NETWORK Bridge requires you to <br /> connect to
                            the {from?.key === "xDai" ? "Gnosis" : from?.key}{" "}
                            {testnet ? "TestNet" : "Mainnet"}
                        </p>
                    </div>
                    {loader && (
                        <div className="switchingAcc">
                            <ChangeNetworkLoader />
                            <p className="">
                                "Switching to" {testnet ? "TestNet" : "Mainnet"}
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

export default ChangeNetworkModal;
