import React from 'react'
import "./Checkmark.css"
import CheckGreen from '../../assets/img/icons/check_green.svg';

export default function Checkmark() {
    return (
        <div className='check-mark__container'>
           <div className="check-mark__box">
               <div className="check-mark__img">
                    <img src={CheckGreen} alt="" />
               </div>
           </div>
        </div>
    )
}
