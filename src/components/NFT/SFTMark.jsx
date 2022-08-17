import React from "react";
import icon from "../../assets/img/icons/sft-icon.svg";

export default function SFTMark({ amount }) {
    return (
        <div className="sft__mark">
            <img src={icon} alt="" />
            <div className="sft__amount">{amount || "23"}</div>
        </div>
    );
}
