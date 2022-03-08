import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Close from "../../assets/img/icons/close.svg";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import ChangeNetworkModal from "../Modals/ChangeNetwork/ChangeNetworkModal"
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { algoConnector } from "../../wallet/connectors";
import { setAccount, setAlgorandWallet, setStep, setWrongNetwork, setAlgorandAccount, setQrCodeString, setShowAbout, setShowVideo, setWalletsModal } from "../../store/reducers/generalSlice";
import { CHAIN_INFO, TESTNET_CHAIN_INFO } from "../values";
import MaiarModal from "../MaiarModal";
import WalletList from "./WalletList";
import Video from '../../assets/img/icons/Video_icon.svg';
import INF from '../../assets/img/icons/Inf.svg';
import { useNavigate } from 'react-router';

function ConnectWallet() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const [show, setShow] = useState();
  const qrCodeString = useSelector((state) => state.general.qrCodeString);
  const qrCodeImage = useSelector((state) => state.general.qrCodeImage);
  const handleClose = () => {
    setShow(false);
    dispatch(setWalletsModal(false))
    if (qrCodeImage) {
      dispatch(setQrCodeString(""));
    }
  };
  const walletsModal = useSelector(state => state.general.walletsModal)
  const widget = useSelector((state) => state.general.widget);

  const handleShow = () => {
    if(from && to){
      setShow(true)
    }
  };

  function handleAboutClick() {
    dispatch(setShowAbout(true))
}
function handleVideoClick() {
    dispatch(setShowVideo(true))
}

  // useEffect(() => {
  //   algoConnector.on("connect", (error, payload) => {
  //     if (error) {
  //       throw error;
  //     }
  //     // Get provided accounts
  //     const { accounts } = payload.params[0];
  //     if (accounts) {
  //       dispatch(setAlgorandWallet(true));
  //       dispatch(setAlgorandAccount(accounts[0]));
  //     }
  //   });
  //   // debugger;
  //   let correct;
  //   if (testnet) {
  //     correct = from ? TESTNET_CHAIN_INFO[from?.key].chainId === chainId : "";
  //   } else {
  //     correct = from ? CHAIN_INFO[from?.key].chainId === chainId : "";
  //   }

  //   if (from?.type === "EVM") {
  //     dispatch(setAccount(account));
  //   }
  //   if (from) {
  //     // debugger;
  //     dispatch(
  //       setWrongNetwork(
  //         testnet
  //           ? TESTNET_CHAIN_INFO[from.key].chainId !== chainId
  //           : CHAIN_INFO[from.key].chainId !== chainId
  //       )
  //     );
  //   }
  //   if (
  //     ((metaMask || tronLink || onWC || trustWallet || MaiarWallet) &&
  //       correct) ||
  //     MyAlgo ||
  //     algorandWallet ||
  //     AlgoSigner ||
  //     kukaiWallet ||
  //     templeWallet
  //   ) {
  //   }
  // }, [
  //   account,
  //   metaMask,
  //   chainId,
  //   tronLink,
  //   onWC,
  //   trustWallet,
  //   AlgoSigner,
  //   algorandWallet,
  //   MaiarWallet,
  //   MyAlgo,
  //   templeWallet,
  //   kukaiWallet,
  // ]);

  return (
    <div>
      <ChangeNetworkModal />
      <div onClick={handleShow} className={from && to ? "connect-wallet__button" : "connect-wallet__button--disabled"}>
        Continue bridging -<span>{">"}</span>{" "}
      </div>
      <div id="aboutnft" className="aboutNft">
          <a onClick={() => handleVideoClick()} target="_blank" className="videoLink"><img src={Video} />   Learn how to use NFT bridge</a>
          <a onClick={() => handleAboutClick()} target="_blank" className="about_Nft"><img src={INF} alt=""/> What is NFT</a>
      </div>
      {!qrCodeString ? (
        <Modal
          show={show || walletsModal}
          onHide={handleClose}
          animation={false}
          className="ChainModal"
        >
          <Modal.Header>
            <Modal.Title>Connect Wallet</Modal.Title>
            <span className="CloseModal" onClick={handleClose}>
              {widget ? (
                <CloseComp className="svgWidget" />
              ) : (
                <img src={Close} alt="" />
              )}
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className="walletListBox">
              <WalletList />
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <MaiarModal
          handleClose={handleClose}
          strQR={qrCodeImage}
          qrCodeString={qrCodeString}
          show={show}
        />
      )}
    </div>
  );
}
//
export default ConnectWallet;
