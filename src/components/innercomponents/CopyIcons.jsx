import React, { useState } from 'react'
import FileCopy from '../../assets/img/icons/FileCopy.svg';
import CopyHover from '../../assets/img/icons/CopyHover.svg';
import copyTT from "../../assets/img/icons/copytt.png"
import copiedIcon from "../../assets/img/icons/Copied.png"

export default function CopyIcons() {
    
    const [copyHover, setSetCopyHover] = useState()    
    const [copied, setCopied] = useState()

    const copy = () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    return (
        <div className="copy-icon__box">
            { copyHover && <img className="copytooltip" src={copyTT} /> }
            { copied && <img className="copytooltip--v" src={copiedIcon} /> }
            <img onClick={() => copy()} onMouseDown={() => setCopied(true)} onMouseOver={() => setSetCopyHover(true)}  onMouseOut={() => setSetCopyHover(false)} src={copyHover ? CopyHover : FileCopy} className="success__copy" />
        </div>
    )
}
