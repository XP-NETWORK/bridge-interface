import React from 'react'
import { Modal } from "react-bootstrap"
import Close from '../../assets/img/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux'
import "./TechnicalSupport.css"


export default function ApproveLoader() {
    const dispatch = useDispatch()
    const loader = useSelector(state => state.general.approveLoader)


    return (
        <Modal       
        className="approve-modal"
        style={{
          overflow: "hidden",
          //backgroundColor: "#00000090",
        }} 
        show={loader}>
            <div className="approve-loader__container">
                <div className="approve-loader__container__text">Approving...</div>
                <div className="approve-loader"></div>
            </div>
        </Modal>
    )
}
