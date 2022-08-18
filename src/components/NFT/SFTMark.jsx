import React from "react";
import icon from "../../assets/img/icons/sft-icon.svg";

export default function SFTMark({ amount }) {
    const num =
        Math.abs(amount) > 999
            ? Math.sign(amount) * (Math.abs(amount) / 1000).toFixed(1) + "k"
            : Math.sign(amount) * Math.abs(amount);

    return (
        <div className="sft__mark">
            <img src={icon} alt="" />
            <div className="sft__amount">{num || "23"}</div>
        </div>
    );
}
