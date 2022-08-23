import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import lock from "../../assets/img/icons/lockon.svg";
import { checkXpNetLocked } from "../../services/deposits";

export default function Locked({ xpNetPrice, locked }) {
    return (
        <div className="locked">
            <div className="title">
                <img src={lock} alt="" className="locked-icon" />
                <span>Locked XPNETs</span>
                {/* <span className="claim">Claim</span> */}
            </div>
            <div className="xpnet">
                {locked ? `${locked?.toFixed(2)} XPNET` : "0.00 XPNET"}
            </div>
            <div className="usd">
                {locked > 0 && xpNetPrice ? `${xpNetPrice} USD` : "0.00 USD"}
            </div>
        </div>
    );
}
