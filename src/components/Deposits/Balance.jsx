import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import diamond from "../../assets/img/icons/diamond.svg";
import { checkXpNetBalance } from "../../services/deposits";

export default function Balance({ xpNetPrice }) {
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
