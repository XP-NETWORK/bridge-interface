import React from "react";
import securetx from "../../assets/img/icons/securetx.svg";

export default function SecureTX() {
    return (
        <div className="secure-transaction">
            <img src={securetx} alt="" />
            <div>Secure transaction</div>
        </div>
    );
}
