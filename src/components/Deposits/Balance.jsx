import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import diamond from "../../assets/img/icons/diamond.svg";
import { switchNetwork } from "../../services/chains/evm/evmService";
import { checkXpNetBalance } from "../../services/deposits";
import { chains } from "../values";

export default function Balance({ xpNetPrice, loader }) {
    const [innerLoader, setInnerLoader] = useState(false);
    const account = useSelector((state) => state.general.account);
    const { library } = useWeb3React();
    const [balance, setBalance] = useState();
    let balanceInterval = useRef(null);

    const checkBalance = async () => {
        // debugger;
        if (library) {
            try {
                const num = await checkXpNetBalance(library._provider, account);
                setBalance(num);
                setInnerLoader(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(async () => {
        if (account && window.ethereum?.chainId === "0x38") {
            checkBalance();
            balanceInterval = setInterval(() => checkBalance(), 5000);
        } else if (account) {
            if (!balance) setInnerLoader(true);
            await switchNetwork(chains.find((e) => e.text === "BSC"));
            checkBalance();
            balanceInterval = setInterval(() => checkBalance(), 5000);
        }
        return () => clearInterval(balanceInterval);
    }, [account]);

    return (
        <div className="balance">
            {(loader || innerLoader) && (
                <div className="deposit__body__loader"></div>
            )}
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
