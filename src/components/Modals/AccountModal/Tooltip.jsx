import { useState, React } from "react";
import PropTypes from "prop-types";

export default function Tooltip({ text }) {
    const [copied, setCopied] = useState();

    const copyTextToClipboard = async () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand("copy", true, text);
        }
    };

    return (
        <div onClick={copyTextToClipboard} className="copy-tooltip">
            <span className="copy-tooltip__text">
                {copied ? "Address copied" : "Copy address"}
            </span>
            <span className="copy-tooltip__icon"></span>
        </div>
    );
}

Tooltip.propTypes = {
    text: PropTypes.text,
};
