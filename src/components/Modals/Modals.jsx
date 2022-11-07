import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    connectAlgorandWalletClaim,
    removeFromNotWhiteListed,
    setRedirectModal,
    setShowAbout,
    setShowVideo,
    setTronLoginError,
    setTronPopUp,
} from "../../store/reducers/generalSlice";
import TonQeCodeModal from "./TonModal/TonQeCodeModal";
import About from "../../components/innercomponents/About";
import Video from "../../components/innercomponents//Video";
import ConnectAlgorand from "./AlgorandModal/ConnectAlgorand";
import SuccessModal from "./Success/SuccessModal";
import TechnicalSupport from "../innercomponents/TechnicalSupport";
import TransferLoader from "../innercomponents/TransferLoader";
import TronConnectionErrMod from "./TronModals/TronConnectionErrMod";
import RedirectModal from "./Redirect/RedirectModal";
import "../ApproveLoader/Planet.css";
import Error from "../innercomponents/Error";
import { setQRCodeModal } from "../Wallet/TONWallet/tonStore";

export default function Modals() {
    const dispatch = useDispatch();

    const tronPopUp = useSelector((state) => state.general.tronPopUp);
    const tonQRCodeModal = useSelector((state) => state.tonStore.qrCode);
    const show = useSelector((state) => state.general.about);
    const video = useSelector((state) => state.general.video);
    // const connectClaimAlgorand = useSelector(
    //     (state) => state.general.connectClaimAlgorand
    // );
    const txnHashArr = useSelector((state) => state.general.txnHashArr);

    const transferModalLoader = useSelector(
        (state) => state.general.transferModalLoader
    );
    const error = useSelector((state) => state.general.error);
    const tronError = useSelector((state) => state.general.tronLoginError);
    const redirectModal = useSelector((state) => state.general.redirectModal);
    const loader = useSelector((state) => state.general.approveLoader);

    const handleCloseRedirectModal = () => {
        dispatch(setRedirectModal(false));
    };
    function closeAboutModal() {
        dispatch(setShowAbout(false));
    }
    function closeVideoModal() {
        dispatch(setShowVideo(false));
    }
    const closeAlgorandClaimModal = () => {
        dispatch(connectAlgorandWalletClaim(false));
    };
    const toShowSuccess = () => {
        return txnHashArr?.length ? true : false;
        // return true;
    };
    function closeSupportModal() {
        dispatch(removeFromNotWhiteListed());
    }
    function handleTronClose() {
        dispatch(setTronPopUp(false));
    }
    const closeTronLoginError = () => {
        dispatch(setTronLoginError(undefined));
    };

    return (
        <>
            <Modal
                className="ton-modal__connect"
                show={tonQRCodeModal}
                onHide={() => dispatch(setQRCodeModal(false))}
            >
                <TonQeCodeModal />
            </Modal>
            <Modal
                className="about-nft__modal"
                show={show}
                animation={false}
                onHide={closeAboutModal}
            >
                <About />
            </Modal>
            <Modal
                animation={false}
                show={video}
                onHide={closeVideoModal}
                className="video__modal"
            >
                <Video />
            </Modal>
            <Modal
                show={false}
                onHide={closeAlgorandClaimModal}
                animation="false"
                className="ChainModal"
            >
                <ConnectAlgorand />
            </Modal>
            <Modal
                animation={false}
                className="success-modal"
                show={toShowSuccess()}
            >
                <SuccessModal />
            </Modal>
            <Modal
                className="ts-modal"
                animation={false}
                size="sm"
                show={false}
                onHide={closeSupportModal}
            >
                <TechnicalSupport />
            </Modal>
            <Modal show={tronPopUp} onHide={handleTronClose}></Modal>
            <Modal
                className="transfer-loader-modal"
                animation={false}
                show={transferModalLoader}
                size="sm"
            >
                <TransferLoader />
            </Modal>
            <Modal
                className="tron-connection-error"
                animation={false}
                size="sm"
                show={tronError}
                onHide={closeTronLoginError}
            >
                <TronConnectionErrMod />
            </Modal>
            <Modal
                className="bitkeep__popup"
                show={redirectModal}
                onHide={handleCloseRedirectModal}
            >
                <RedirectModal />
            </Modal>
            <Modal
                className="approve-modal"
                style={{
                    overflow: "hidden",
                }}
                show={loader}
            >
                <div className="content">
                    <div className="clip">
                        <p>Approving</p>
                    </div>
                </div>
            </Modal>
            <Modal show={error} className="error__modal">
                <Error />
            </Modal>
        </>
    );
}
