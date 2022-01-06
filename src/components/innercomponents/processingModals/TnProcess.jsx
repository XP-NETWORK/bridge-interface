import React, { useState } from 'react'
import { useEffect } from 'react';
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import Close from '../../../assets/img/icons/close.svg';
import eye from "../../../assets/img/transaction-icons/eye.svg"
import "./TnProcess.css"

export default function TnProcess() {
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const [one, setOne] = useState(0)
    const [two, setTwo] = useState(0)
    const [three, setThree] = useState(0)
    const transactionStep = 1
    // const transactionStep = useSelector(state => state.general.transactionStep)

    const [body, setBody] = useState({})

    useEffect(() => {
        switch (transactionStep) {
            case 1:
                setBody({
                        icon: from?.image.src,
                        message: `${from?.text} Transaction Processing`
                    })
                break;
            case 2:
                setBody({
                    icon: eye,
                    message: "Validators Processing"
                })
                setOne(100)
                break;
            case 3:
                setBody({
                    icon: to?.image.src,
                    message: `${to.text} Transaction Processing`
                })
                setTwo(100)
                break;
            case 4:
                setBody({
                    icon: "&#127881;",
                    message: "Ready"
                })
                setThree(100)
                break;
            default:
                break;
        }
    }, [transactionStep])

    return (
        <Modal  show={false} animation={false} className="tn-process__modal">
            <Modal.Header className='tn-process__header border-0'>
                <Modal.Title className="tn-process__title">Processing..</Modal.Title>
            </Modal.Header>
            <Modal.Body className='tn-process__body'>
                <div className="tn-process__icon">
                    <img src={body.icon} />
                </div>
                <div className="tn-process__message">{body.message}</div>
                <div className="tn-process__loader">
                    <div className='process-loader--grey step-one'>
                        <div style={{width: `${one}%`}} className='process-loader--green'></div>
                    </div>
                    <div className='process-loader--grey step-two'>
                        <div style={{width: `${two}%`}} className='process-loader--green'></div>
                    </div>
                    <div className='process-loader--grey step-three'>
                        <div style={{width: `${three}%`}} className='process-loader--green'></div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
