import React, { useState } from 'react'
import { useEffect } from 'react';
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import Close from '../../../assets/img/icons/close.svg';
import eye from "../../../assets/img/transaction-icons/eye.svg"
import Step from './Step';
import "./TnProcess.css"

export default function TnProcess() {
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const [one, setOne] = useState(false)
    const [oneFinished, setOneFinished] = useState(false)
    const [two, setTwo] = useState(false)
    const [twoFinished, setTwoFinished] = useState(false)
    const [three, setThree] = useState(false)
    const [threeFinished, setThreeFinished] = useState(false)

    // const transactionStep = useSelector(state => state.general.transactionStep)
    const transactionStep = 3
    const transferModalLoader = useSelector(state => state.general.transferModalLoader)
    const [body, setBody] = useState({})

    useEffect(() => {
        
        switch (transactionStep) {
            case 1:
                setBody({
                        icon: from?.image.src,
                        message: `${from?.text} Transaction Processing`
                    })
                setOne(true)
                break;
            case 2:
                setBody({
                    icon: eye,
                    message: "Validators Processing"
                })
                setOneFinished(true)
                setTwo(true)
                // setOne(100)
                break;
            case 3:
                setBody({
                    icon: to?.image.src,
                    message: `${to?.text} Transaction Processing`
                })
                setOneFinished(true)
                setTwoFinished(true)
                setThree(true)
                // setTwo(100)
                break;
            case 4:
                setBody({
                    icon: false,
                    message: "Ready"
                })
                setOneFinished(true)
                setTwoFinished(true)
                setThreeFinished(true)
                break;
            default:
                break;
        }
    }, [transactionStep])

    // useEffect(() => {
    //     // debugger
    //     if(transactionStep) counter()
    // }, [transactionStep])

    return (
       // <Modal  show={transferModalLoader} animation={false} className="tn-process__modal">
       
        <Modal  show={true} animation={false} className="tn-process__modal">
            <Modal.Header className='tn-process__header border-0'>
                <Modal.Title className="tn-process__title">Processing..</Modal.Title>
            </Modal.Header>
            <Modal.Body className='tn-process__body'>
                <div className="tn-process__icon">
                    { body.icon ? <img src={body.icon} /> : <div className="txt-icon">&#127881;</div>}
                </div>
                <div className="tn-process__message">{body.message}</div>
                <div className="tn-process__loader">
                    <Step start={one} finished={oneFinished} />
                    <Step start={two} finished={twoFinished} />
                    <Step start={three} finished={threeFinished} />
                </div>
            </Modal.Body>
        </Modal>
    )
}
