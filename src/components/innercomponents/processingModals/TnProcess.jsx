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
    const [two, setTwo] = useState(false)
    const [three, setThree] = useState(false)
    // const transactionStep = 0
    const transactionStep = useSelector(state => state.general.transactionStep)
    // const transactionStep = 1
    const transferModalLoader = useSelector(state => state.general.transferModalLoader)
    const [body, setBody] = useState({})

    // function counter() {
    //     debugger
    //     if(one === "")setOne(0)
    //     if(two === "")setTwo(0)
    //     if(three === "")setThree(0)
    //     setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    //         debugger         //  create a loop function
    //         //  your code here
    //       setOne(one + 1)                   //  increment the counter
    //       if(one < 100)counter()
    //       if(one === 100) setTwo(two + 1)
    //       if(two < 100) counter()
    //       if(two === 100) setThree(three + 1)
    //       if(three < 100) counter()
    //     }, 500)
    //   }

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
                setTwo(true)
                // setOne(100)
                break;
            case 3:
                setBody({
                    icon: to?.image.src,
                    message: `${to?.text} Transaction Processing`
                })
                setThree(true)
                // setTwo(100)
                break;
            case 4:
                setBody({
                    icon: false,
                    message: "Ready"
                })
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
                    <Step start={one} />
                    <Step start={two} />
                    <Step start={three} />
                </div>
            </Modal.Body>
        </Modal>
    )
}
