import React from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Close from '../../assets/img/icons/close.svg';
import { setError } from '../../store/reducers/generalSlice';


export default function Error() {
    
    const dispatch = useDispatch()
    const handleClose = () => { dispatch(setError(false)) }
    const error = useSelector(state => state.general.error)

    return (
        <>
            <Modal.Header className="border-0">
                    <Modal.Title>An error has accrued</Modal.Title>
                    <span className="CloseModal" onHide={handleClose} onClick={handleClose}>
                        <img src={Close} alt="" />
                    </span>
                </Modal.Header>
                <Modal.Body className="modalBody text-center">
                    <div className="wrongNFT">
                        {error}
                    </div>
            </Modal.Body>
        </>
    )
}
