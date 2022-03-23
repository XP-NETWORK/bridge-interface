import { useState } from "react";
export default function Tooltip() {

    const [copied, setCopied] = useState();
    const copy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      };

    return (
        <div onClick={copy} className="copy-tooltip">
            <span className="copy-tooltip__text">{copied ? "Copied" : "Copy address"}</span>
            <span className="copy-tooltip__icon"></span>
        </div>
    )
}
