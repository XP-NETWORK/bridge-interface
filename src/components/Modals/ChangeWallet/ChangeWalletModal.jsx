import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  //clearStateForNewConnection,
  // setAccount,
  // setAccountWalletModal,
  // setAlgorandAccount,
  // setAlgorandClaimables,
  // setAlgoSigner,
  setChangeWallet,
  setFrom,
  // setConfirmMaiarMob,
  // setConnectedWallet,
  // setElrondAccount,
  // setFrom,
  // setKeplrWallet,
  // setKukaiWallet,
  // setMaiarProvider,
  // setMyAlgo,
  // setOnMaiar,
  // setQrCodeString,
  // setQrImage,
  // setTempleWallet,
  setTemporaryFrom,
  setTo,
  setWalletsModal,
  // setTo,
  // setTronLink,
  // setTronWallet,
  // setWalletsModal,
} from "../../../store/reducers/generalSlice";
import { ReactComponent as CloseComp } from "../../../assets/img/icons/close.svg";
import { Modal } from "react-bootstrap";
import icon from "../../../assets/img/icons/book.svg";
import { useWeb3React } from "@web3-react/core";

export default function ChangeWalletModal() {
  // const location = useLocation();
  const dispatch = useDispatch();
  const { deactivate } = useWeb3React();
  // const from = useSelector((state) => state.general.from);
  // const to = useSelector((state) => state.general.to);
  const temporaryTo = useSelector((state) => state.general.temporaryTo);
  const temporaryFrom = useSelector((state) => state.general.temporaryFrom);

  // );
  const handleClose = () => {
    dispatch(setChangeWallet(false));
    dispatch(setTemporaryFrom(""));
  };

  // const handleSwitch = () => {
  //     const temp = to;
  //     dispatch(setTo(from));
  //     dispatch(setFrom(temp));
  // };

  // const chooseWalletModal = () =>
  //     isRightLocation()
  //         ? dispatch(setAccountWalletModal(true))
  //         : dispatch(setWalletsModal(true));

  // const isRightLocation = () => {
  //     switch (location.pathname) {
  //         case "/account":
  //             return true;
  //         case "/testnet/account":
  //             return true;
  //         default:
  //             break;
  //     }
  // };

  // const setTempTo = () => {
  //     dispatch(setTo(temporaryTo));
  // };

  const handleClick = () => {
    // eslint-disable-next-line no-debugger
    // debugger;
    deactivate();
    //dispatch(clearStateForNewConnection());
    dispatch(setFrom(temporaryFrom));
    dispatch(setTo(temporaryTo));
    dispatch(setChangeWallet(false));
    dispatch(setWalletsModal(true));
  };

  return (
    <>
      <span className="tron-connection-error-close" onClick={handleClose}>
        <CloseComp className="svgWidget" />
      </span>
      <Modal.Header className="border-0 tron-login-error__header">
        <Modal.Title className="switch-Wallet__title">
          Change Wallet
        </Modal.Title>
        <span className="worngImg">
          <div className="wrong-icon">
            <div className="first-wrong__bg">
              <div className="second-wrong__bg">
                <img src={icon} alt="" />
              </div>
            </div>
          </div>
        </span>
      </Modal.Header>
      <Modal.Body className="tron-connection-error__body">
        <div className="switch-Wallet__text">
          <div className="text__top">
            Selected blockchain doesn’t support this wallet
          </div>
          <div className="text__bottom">
            Changing wallet will end your current session
          </div>
          <div onClick={handleClick} className="switch__button">
            Change wallet
          </div>
        </div>
      </Modal.Body>
    </>
  );
}

//     );

//     return updatedComponent;
// }
