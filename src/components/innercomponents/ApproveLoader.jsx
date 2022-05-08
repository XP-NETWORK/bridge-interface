import React from 'react'
import { Modal } from "react-bootstrap"
import { useSelector } from 'react-redux'
import "../ApproveLoader/Planet.css"
import logo from "../../assets/img/icons/approving_logo.svg"


export default function ApproveLoader() {

    const loader = useSelector(state => state.general.approveLoader)
    
    return (
        <Modal       
        className="approve-modal"
        style={{
          overflow: "hidden",
        }} 
        show={loader}>
            <div className="content">
                <div className="clip">
                    <p>Approving</p>
                </div>
            </div>
        </Modal>
    )
}
