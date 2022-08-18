import React from "react";
import "./Deposits.css";
import diamond from "../assets/img/icons/diamond.svg";
import lock from "../assets/img/icons/lockon.svg";
import percent from "../assets/img/icons/percent.svg";
import { Dropdown } from "react-bootstrap";
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
                <div className="staker">
                    <div className="staker__title">
                        <img src="#" alt="" />
                        <span>Lock XPNET</span>
                    </div>
                    <form className="staker__form">
                        <div className="staker__amount">
                            <label for="amount">Enter amount</label>
                            <br />
                            <input type="text" name="amount" id="amount" />
                        </div>
                        <div className="staker__duration">
                            <label for="duration">Select locked duration</label>
                            <br />
                            <Dropdown alignLeft title="Dropdown right">
                                <Dropdown.Toggle></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="option-1">
                                        3 months
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="option-2">
                                        6 months
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="option-3">
                                        9 months
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="option-4">
                                        1 year
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="staker__discount">
                            <label for="discount">Discount </label>
                            <br />
                            <input type="text" id="discount" name="discount" />
                        </div>
                        <div className="staker__buttons">
                            <div className="staker__btn">Approve</div>
                            {/* <div className="staker__btn">Lock</div> */}
                        </div>
                    </form>
                    <hr />
                    <div className="staker__information">
                        <div className="info__header">
                            <img src="#" alt="" />
                            <span>INFORMATION </span>
                        </div>
                        <div className="info__text">
                            You may not see your cross-chain transaction due to
                            unpredictable glitches on different blockchain
                            network and the decentralized nature of XP.NETWORK
                            protocol. Please be patient and follow the
                            instructions 💙
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
