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
            <div className="xpnet">7,680 XPNET</div>
            <div className="usd">64 USD</div>
        </div>
    );
}
