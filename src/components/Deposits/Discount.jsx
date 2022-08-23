import React from "react";
import ICON from "../../assets/img/icons/ICON.png";
import percent from "../../assets/img/icons/percent.svg";

export default function Discount({ txns }) {
    return (
        <div className="discount">
            <img className="discount-bg" src={ICON} alt="" />
            <div className="title">
                <img src={percent} alt="" className="discount-icon" />
                <span>Discount</span>
            </div>
            <div className="percent">40%</div>
            <div className="transactions">
                {txns ? `${txns} transactions` : "0 transactions"}
            </div>
        </div>
    );
}
