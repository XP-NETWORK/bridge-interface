import React from "react";
import icon from "../../assets/img/icons/sft-icon.svg";

export default function SFTMark({ amount }) {
    const numFormatter = (num) => {
        // debugger;
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
        } else if (num > 1000000) {
            return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
        } else if (num < 999) {
            return num; // if value < 1000, nothing to do
        }
    };

    const num = numFormatter(amount);

    return (
        <div className="sft__mark">
            <img src={icon} alt="" />
            <div className="sft__amount">{num}</div>
        </div>
    );
}
