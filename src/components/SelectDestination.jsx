// import React, { useEffect, useState} from 'react'
// import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
// import Close from '../assets/img/icons/close.svg';
// import { useDispatch, useSelector } from 'react-redux';
// import { setChainModal, setDepartureOrDestination } from "../store/reducers/generalSlice"

import NFTSelectBox from "./NFTSelectBox";
import NFTChainListBox from "./NFTChainListBox";

function SelectDestination() {
  // const departureOrDestination = useSelector(state => state.general.departureOrDestination)
  // const dispatch = useDispatch()
  // const handleClose = () => {
  //     dispatch(setChainModal(false))
  //     dispatch(setDepartureOrDestination(""))
  // }
  // const show = useSelector(state => state.general.showChainModal)

  return (
    <div>
      <NFTSelectBox />
      <NFTChainListBox />
      {/* <Modal animation={false} show={show} onHide={() => handleClose()} className="ChainModal">
                <Modal.Header className="text-left">
                    <Modal.Title>{`Select ${departureOrDestination === 'destination' ? 'destination' : 'departure'} chain`}</Modal.Title>
                    <span className="CloseModal" onClick={() => handleClose()}>
                    <img src={Close} alt="" />
                    </span>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
            </Modal> */}
    </div>
  );
}

export default SelectDestination;
