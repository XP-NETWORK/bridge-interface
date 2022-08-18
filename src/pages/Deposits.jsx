import React from "react";
import "./Deposits.css";
import diamond from "../assets/img/icons/diamond.svg";
import lock from "../assets/img/icons/lockon.svg";
import percent from "../assets/img/icons/percent.svg";
// import ICON from "../assets/img/icons/PERCENT3D.svg";
import ICON from "../assets/img/icons/ICON.png";

export default function Deposits() {
    return (
        <div className="deposit__container">
            <div className="deposit__header">
                <div className="deposit__title">XPNET deposit program</div>
                <div className="deposit__subtitle">
                    Delegate XPNET to validators to earn discounts for your
                    bridging transactions.
                </div>
            </div>
            <div className="deposit__body">
                <div className="balance">
                    <div className="title">
                        <img src={diamond} alt="" className="balance-icon" />
                        <span>Your XPNET Balance</span>
                    </div>
                    <div className="xpnet">15,896 XPNET</div>
                    <div className="usd">150 USD</div>
                </div>
                <div className="locked">
                    <div className="title">
                        <img src={lock} alt="" className="locked-icon" />
                        <span>Locked XPNETs</span>
                        <span className="claim">Claim</span>
                    </div>
                    <div className="xpnet">7,680 XPNET</div>
                    <div className="usd">64 USD</div>
                </div>
                <div className="discount">
                    <img className="discount-bg" src={ICON} alt="" />
                    <div className="title">
                        <img src={percent} alt="" className="discount-icon" />
                        <span>Discount</span>
                    </div>
                    <div className="percent">12%</div>
                    <div className="transactions">50 transactions</div>
                </div>
                <div className="staker">stakers</div>
            </div>
        </div>
    );
}
