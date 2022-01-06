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
    const [one, setOne] = useState("")
    const [two, setTwo] = useState("")
    const [three, setThree] = useState("")
    // const transactionStep = 0
    const transactionStep = useSelector(state => state.general.transactionStep)
    const [body, setBody] = useState({})

    function counter() {
        debugger
        if(one === "")setOne(0)
        if(two === "")setTwo(0)
        if(three === "")setThree(0)
        setTimeout(function() {   //  call a 3s setTimeout when the loop is called
            debugger         //  create a loop function
            //  your code here
          setOne(one + 1)                   //  increment the counter
          if(one < 100)counter()
          if(one === 100) setTwo(two + 1)
          if(two < 100) counter()
          if(two === 100) setThree(three + 1)
          if(three < 100) counter()
        }, 500)
      }

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

    useEffect(() => {
        // debugger
        if(transactionStep) counter()
    }, [transactionStep])

    return (
        <Modal  show={transactionStep} animation={false} className="tn-process__modal">
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
