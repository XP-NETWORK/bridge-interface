import React from "react";
import icon from "../../assets/img/icons/sft-icon.svg";
import PropTypes from "prop-types";

export default function SFTMark({ amount }) {
    const numFormatter = (num) => {
        const str = num.toString();
        let amount;
        switch (true) {
            case str.length > 7:
                amount = num / 10000000;
                return `${amount.toString().slice(0, 3)} M`;
            case str.length > 6:
                return `${amount.toString().slice(0, 3)} M`;
            case str.length > 5:
                return `${(num / 100000).toFixed(1)} KK`;
            case str.length > 3:
                return `${(num / 1000).toFixed(1)} K`;

            default:
                return num;
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
SFTMark.propTypes = {
    amount: PropTypes.number,
};
