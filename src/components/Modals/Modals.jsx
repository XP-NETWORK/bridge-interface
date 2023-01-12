import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    connectAlgorandWalletClaim,
    removeFromNotWhiteListed,
    setQrCodeString,
    setQrImage,
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
import {
    setActiveTonWalletConnection,
    setQRCodeModal,
} from "../Wallet/TONWallet/tonStore";
import MaiarModal from "./MaiarModal/MaiarModal";
import ChangeWalletModal from "./ChangeWallet/ChangeWalletModal";

export default function Modals() {
    const dispatch = useDispatch();
    const tronPopUp = useSelector((state) => state.general.tronPopUp);
    const tonQRCodeModal = useSelector((state) => state.tonStore.qrCode);
    const show = useSelector((state) => state.general.about);
    const video = useSelector((state) => state.general.video);
    const maiarQRCodeImage = useSelector((state) => state.general.qrCodeImage);
    const txnHashArr = useSelector((state) => state.general.txnHashArr);
    const qrCodeString = useSelector((state) => state.general.qrCodeString);
    const transferModalLoader = useSelector(
        (state) => state.general.transferModalLoader
    );
    const changeWallet = useSelector((state) => state.general.changeWallet);

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
    const handleCloseQRCodeModal = () => {
        dispatch(setQRCodeModal(false));
        dispatch(setActiveTonWalletConnection(""));
    };
    const handleCloseMaiarModal = () => {
        dispatch(setQrImage(""));
        dispatch(setQrCodeString(""));
    };
    const handleCloseChangeWalletModal = () => {
        //todo
    };

    return (
        <>
            <Modal
                className="ChainModal switchWallet"
                animation={false}
                size="sm"
                show={changeWallet}
                onHide={handleCloseChangeWalletModal}
            >
                <ChangeWalletModal />
            </Modal>
            <Modal
                className="maiar-modal"
                show={maiarQRCodeImage}
                animation={false}
                onHide={handleCloseMaiarModal}
            >
                <MaiarModal
                    close={handleCloseMaiarModal}
                    strQR={maiarQRCodeImage}
                    qrCodeString={qrCodeString}
                />
            </Modal>
            <Modal
                className="ton-modal__connect"
                show={tonQRCodeModal}
                onHide={handleCloseQRCodeModal}
                animation={false}
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

Modals.propTypes = {};
