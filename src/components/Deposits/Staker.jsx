import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import oil from "../../assets/img/icons/oil.svg";
import info from "../../assets/img/icons/info_blue.svg";
import xpnet from "../../assets/img/icons/XPNET.svg";
import { approve, deposit } from "../../services/deposits";
import { useWeb3React } from "@web3-react/core";
import { setApproveLoader } from "../../store/reducers/generalSlice";
import { setDepositAlert } from "../../store/reducers/discountSlice";
import { useDidUpdateEffect } from "../Settings/hooks";

export default function Staker({ xpNetPrice }) {
    const innerWidth = useSelector((state) => state.general.innerWidth);
    const account = useSelector((state) => state.general.account);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState();
    const xpNetBalance = useSelector((state) => state.discount.xpNetBalance);

    const [error, setError] = useState(false);
    const [approved, setApproved] = useState(false);
    const { library } = useWeb3React();
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const token = new URLSearchParams(window.location.search).get("token");

    const approveHandler = async () => {
        if (!account) {
            dispatch(setDepositAlert(true));
            return;
        }
        dispatch(setApproveLoader(true));
        const approved = await approve(library._provider, account);
        if (approved) {
            setApproved(true);
            dispatch(setApproveLoader(false));
        } else dispatch(setApproveLoader(false));
    };

    const depositHandler = async () => {
        deposit(library._provider, account, amount);
    };

    const handleInputChange = (e) => {
        switch (e.type) {
            case "change":
                const num = Number(e.target.value);
                if (e.target.validity.valid) {
                    setAmount(num);
                    if (amount >= 1500) setError(false);
                    else if (num > xpNetBalance) {
                        setError(true);
                    }
                } else setAmount("");
                break;
            case "blur":
                if (num > xpNetBalance) setError(true);
                else if (amount < 1500) {
                    setError(true);
                } else setError(false);
                break;
            default:
                break;
        }
    };

    useDidUpdateEffect(() => {
        if (amount > xpNetBalance) setError(true);
        else if (amount && amount < 1500) setError(true);
    }, [xpNetBalance]);

    return (
        <div className="staker">
            <div className="staker__title">
                <img src={oil} alt="" />
                <span>Lock XPNET</span>
            </div>
            <form className="staker__form">
                <div className="staker__amount">
                    <label for="amount">Enter amount</label>
                    <br />
                    <div className="staker__amount__input">
                        <input
                            style={error ? { borderColor: "#C6354A" } : {}}
                            pattern="[0-9]*"
                            placeholder={
                                innerWidth < 380
                                    ? "MIN 1500"
                                    : "MIN lock requirement 1500"
                            }
                            type="text"
                            name="amount"
                            value={amount}
                            id="amount"
                            onChange={handleInputChange}
                            onBlur={handleInputChange}
                        />
                        <div className="xpnet-icon">
                            <img src={xpnet} alt="" />
                            <span>XPNET</span>
                        </div>
                    </div>
                    <div
                        style={
                            error
                                ? { visibility: "visible" }
                                : { visibility: "hidden" }
                        }
                        className="error"
                    >
                        {amount > xpNetBalance
                            ? "Amount is greater than XPNET balance"
                            : "The minimum amount is 1500 XPNET"}
                    </div>
                </div>

                <div className="staker__discount">
                    <label for="discount">Discount </label>
                    <br />
                    <input
                        placeholder={
                            amount >= 1500 &&
                            `${(
                                ((amount * xpNetPrice) / 0.25) * 0.01 +
                                amount * xpNetPrice
                            ).toFixed(3)} USD`
                        }
                        disabled
                        type="text"
                        id="discount"
                        name="discount"
                    />
                </div>
                <div
                    style={
                        !account ||
                        amount < 1500 ||
                        !amount ||
                        amount > xpNetBalance
                            ? OFF
                            : {}
                    }
                    className="staker__buttons"
                >
                    {!approved ? (
                        <div onClick={approveHandler} className="staker__btn">
                            Approve
                        </div>
                    ) : (
                        <div onClick={depositHandler} className="staker__btn">
                            Deposit
                        </div>
                    )}
                </div>
            </form>
            <hr />
            <div className="staker__information">
                <div className="info__header">
                    <img src={info} alt="" />
                    {/* <span className="info__icon">i</span> */}
                    <span>INFORMATION </span>
                </div>
                <div className="info__text">
                    After locking XPNET every transaction will be discounted
                    automatically for 40% by subtracting 75 XPNETs from your
                    locked amount.
                    <br />
                    Want to get more XPNET?
                    <br />
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.coinbase.com/how-to-buy/xp-network"
                    >
                        https://www.coinbase.com
                    </a>
                    <br />
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.binance.com/en/how-to-buy/xp-network"
                    >
                        https://www.binance.com
                    </a>
                </div>
            </div>
        </div>
    );
}
