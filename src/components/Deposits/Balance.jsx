import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import diamond from "../../assets/img/icons/diamond.svg";
import { checkXpNetBalance } from "../../services/deposits";

export default function Balance() {
    const signer = useSelector((state) => state.signers.signer);
    const account = useSelector((state) => state.general.account);

    useEffect(async () => {
        if (signer) {
            await checkXpNetBalance(signer, account);
        }
    }, [account]);

    return (
        <div className="balance">
            <div className="title">
                <img src={diamond} alt="" className="balance-icon" />
                <span>Your XPNET Balance</span>
            </div>
            <div className="xpnet">15,896 XPNET</div>
            <div className="usd">150 USD</div>
        </div>
    );
}
