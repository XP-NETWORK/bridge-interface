import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import diamond from "../../assets/img/icons/diamond.svg";
import { checkXpNetBalance } from "../../services/deposits";
import PropTypes from "prop-types";

export default function Balance({ xpNetPrice, loader }) {
    const account = useSelector((state) => state.general.account);
    const { library } = useWeb3React();
    const [balance, setBalance] = useState();
    // const [xpNetPrice, setXpNetPrice] = useState();

    useEffect(() => {
        const checkBalance = async () => {
            if (library) {
                try {
                    const num = await checkXpNetBalance(
                        library._provider,
                        account
                    );
                    setBalance(num);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        checkBalance();
    }, [account]);

    return (
        <div className="balance">
            {loader && <div className="deposit__body__loader"></div>}
            <div className="title">
                <img src={diamond} alt="" className="balance-icon" />
                <span>Your XPNET Balance</span>
            </div>
            <div className="xpnet">
                {!balance ? "0.00 XPNET" : `${balance?.toFixed(2)} XPNET`}
            </div>
            <div className="usd">
                {balance
                    ? `${(balance * xpNetPrice).toFixed(3)} USD`
                    : "0.00 USD"}
            </div>
        </div>
    );
}

Balance.propTypes = {
    xpNetPrice: PropTypes.number,
    loader: PropTypes.bool,
};
