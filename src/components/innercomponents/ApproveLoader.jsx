import React from 'react'
import { Modal } from "react-bootstrap"
import Close from '../../assets/img/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux'
import Planet from '../ApproveLoader/Planet';


export default function ApproveLoader() {

    const loader = useSelector(state => state.general.approveLoader)
    
    return (
        <Modal       
        className="approve-modal"
        style={{
          overflow: "hidden",
        }} 
        animation={true}
        show={loader}>
            <Planet />
        </Modal>
    )
}
