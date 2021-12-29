import React, { useState } from 'react'
import FileCopy from '../../assets/img/icons/FileCopy.svg';
import CopyHover from '../../assets/img/icons/CopyHover.svg';
import copyTT from "../../assets/img/icons/copytoclip.svg"
import copiedIcon from "../../assets/img/icons/copiedtoclip.svg"

export default function CopyIcons() {
    
       
    const [copied, setCopied] = useState()
    const [copyIconHover, setCopyIconHover] = useState()
    const copy = () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    return (
        <span onClick={() => copy()} onMouseOver={() => setCopyIconHover(true)} onMouseOut={()=> setCopyIconHover(false)} className="copyTokk">
            <img src={ copyIconHover ? CopyHover : FileCopy} />
        </span>
    )
}
