import React from 'react'
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";

export default function CloseButton({handleSearchTop}) {
  return (
    <div onClick={handleSearchTop} className='close__btn'>
       <div className="CloseIcon">
            <Close className="svgWidget "  />
          </div>{" "}
    </div>
  )
}
