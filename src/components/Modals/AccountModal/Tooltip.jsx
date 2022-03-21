import { useState } from "react";
import FileCopy from "../../../assets/img/copy_regular.svg";
import CopyHover from "../../../assets/img/copy_hovered.svg";
export default function Tooltip() {

    const [copied, setCopied] = useState();

    const copy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      };

    return (
        <div onClick={copy} className="copy-tooltip">
            <span className="copy-tooltip__text">Copy address</span>
            <span className="copy-tooltip__icon"></span>
        </div>
    )
}
