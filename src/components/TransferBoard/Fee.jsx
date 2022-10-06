import BigNumber from "bignumber.js";
import React from "react";
import { useSelector } from "react-redux";
import { chainsConfig } from "../values";

export default function Fee({ fees }) {
    const from = useSelector((state) => state.general.from);
    const config = chainsConfig[from?.text];

    function getNumToFix() {
        // debugger
        let num = 1;
        let str;
        if (fees > 0 && fees) {
            do {
                num++;
                str = fees?.toFixed(num).toString();
            } while (str[str.length - 2] === "0");
        }
        return num;
    }

    return (
        <span>
            {`${
                fees && fees > 0
                    ? from.key === "Tezos"
                        ? new BigNumber(fees).multipliedBy(1e12).toString()
                        : fees?.toFixed(getNumToFix(fees))
                    : "0"
            }
${config?.token} 
`}
            {/* ${discountLeftUsd && showDiscount(fees).toFixed(2)} */}
        </span>
    );
}
