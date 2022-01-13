import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Close from '../../../assets/img/icons/close.svg';

import "./SuccessCustom.css"

export default function SuccessCustom() {

    
    return (
        <div className='custom-success-modal__wrapper'>
            <div className="custom-success-modal">
                <div className="custom-success-modal__close">
                    <img src={Close} alt="" />
                </div>
                <div className="custom-success-modal__body">
                    <div className="custom-success-modal__header">
                        <div className="custom-success-modal__title">Bridging Report</div>
                    </div>
                    <div className="custom-success-modal__info">
                        <div className="success__info-item">
                            <label>Status</label>
                            <span><img src="" alt="" />Completed</span>
                        </div>
                        <div className="success__info-item">.</div>
                        <div className="success__info-item">.</div>
                    </div>
                    <div className="custom-success-modal__info">
                        <div className="success__info-item">.</div>
                        <div className="success__info-item">.</div>
                        <div className="success__info-item">.</div>
                        <div className="success__info-item">.</div>
                    </div>
                    <div className="custom-success-modal__info">
                        <div className="success__info-item">.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
