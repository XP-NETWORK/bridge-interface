import React from "react";
import lock from "../../assets/img/icons/lockon.svg";
import PropTypes from "prop-types";

export default function Locked({ xpNetPrice, locked, loader }) {
    return (
        <div className="locked">
            {loader && <div className="deposit__body__loader"></div>}
            <div className="title">
                <img src={lock} alt="" className="locked-icon" />
                <span>Locked XPNETs</span>
                {/* <span className="claim">Claim</span> */}
            </div>
            <div className="xpnet">
                {locked ? `${locked?.toFixed(2)} XPNET` : "0.00 XPNET"}
            </div>
            <div className="usd">
                {locked > 0 && xpNetPrice
                    ? `${(locked * xpNetPrice)?.toFixed(3)} USD`
                    : "0.00 USD"}
            </div>
        </div>
    );
}
Locked.propTypes = {
    xpNetPrice: PropTypes.number,
    locked: PropTypes.number,
    loader: PropTypes.bool,
};
