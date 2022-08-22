import React from "react";
import lock from "../../assets/img/icons/lockon.svg";

export default function Locked() {
    return (
        <div className="locked">
            <div className="title">
                <img src={lock} alt="" className="locked-icon" />
                <span>Locked XPNETs</span>
                {/* <span className="claim">Claim</span> */}
            </div>
            <div className="xpnet">0.00 XPNET</div>
            <div className="usd">0.00 USD</div>
        </div>
    );
}
