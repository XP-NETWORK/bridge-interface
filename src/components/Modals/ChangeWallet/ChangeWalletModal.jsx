import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setAlgorandAccount, setAlgoSigner, setChangeWallet, setMyAlgo } from '../../../store/reducers/generalSlice';
import { ReactComponent as CloseComp } from "../../../assets/img/icons/close.svg";
import { Modal } from "react-bootstrap";
import icon from "../../../assets/img/icons/book.svg"

export default function ChangeWalletModal() {
  const changeWallet = useSelector((state) => state.general.changeWallet);
  const from = useSelector((state) => state.general.from);
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setChangeWallet(false))
  }

  const handleClick = () => {
      switch (from.type) {
        case "EVM":
        console.log("Disconnect from EVM")
            break;
        case "Tron":
        console.log("Disconnect from Tron")
            break;
        case "Elrond":
        console.log("Disconnect from Elrond")
            break;
        case "Tezos":
        console.log("Disconnect from Tezos")
            break;
        case "VeChain":
        console.log("Disconnect from VeChain")
            break;
        case "Algorand":
            dispatch(setAlgoSigner(''))
            dispatch(setAlgorandAccount(''))
            dispatch(setAlgorandAccount(''))
            dispatch(setMyAlgo(''))
            break;
          default:
              break;
      }

  }

  return (
    <Modal
    className="ChainModal switchWallet"
    animation={false}
    size="sm"
    show={changeWallet}
    onHide={() => handleClose()}
  >
    <span className="tron-connection-error-close" onClick={handleClose}>
      <CloseComp className="svgWidget" />
    </span>
    <Modal.Header className="border-0 tron-login-error__header">
      <Modal.Title className="switch-Wallet__title">Change Wallet</Modal.Title>
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
            <div className='text__top'>Selected blockchain doesn’t support this wallet</div>
            <div className='text__bottom'>Changing wallet will end your current session</div>
            <div onClick={handleClick} className='switch__button' >Change wallet</div>
        </div>
    </Modal.Body>
  </Modal>
  )
}
