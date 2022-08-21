import React, { useState } from "react";
import { useSelector } from "react-redux";
import oil from "../../assets/img/icons/oil.svg";
import { Dropdown } from "react-bootstrap";
import info from "../../assets/img/icons/info_blue.svg";
import xpnet from "../../assets/img/icons/XPNET.svg";

export default function Staker() {
    const innerWidth = useSelector((state) => state.general.innerWidth);
    const [amount, setAmount] = useState();
    const [duration, setDuration] = useState("3 months");

    const handleDurationSelect = (d) => {
        switch (d) {
            case "3":
                setDuration("3 months");
                break;
            case "6":
                setDuration("6 months");
                break;
            case "9":
                setDuration("9 months");
                break;
            case "12":
                setDuration("1 year");
                break;
            default:
                break;
        }
    };

    const handleInputChange = (e) => {
        const amount = Number(e.target.value);
        if (e.target.validity.valid) {
            setAmount(amount);
        } else setAmount("");
    };

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
                            onChange={(e) => handleInputChange(e)}
                        />
                        <div className="xpnet-icon">
                            <img src={xpnet} alt="" />
                            <span>XPNET</span>
                        </div>
                    </div>
                </div>
                <div className="staker__duration">
                    <label for="duration">Select locked duration</label>
                    <br />
                    <Dropdown
                        onSelect={(e) => handleDurationSelect(e)}
                        alignLeft
                        title="Dropdown right"
                    >
                        <div className="dropdown__place-holder">{duration}</div>
                        <Dropdown.Toggle></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="3">3 months</Dropdown.Item>
                            <Dropdown.Item eventKey="6">6 months</Dropdown.Item>
                            <Dropdown.Item eventKey="9">9 months</Dropdown.Item>
                            <Dropdown.Item eventKey="12">1 year</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="staker__discount">
                    <label for="discount">Discount </label>
                    <br />
                    <input disabled type="text" id="discount" name="discount" />
                </div>
                <div className="staker__buttons">
                    <div className="staker__btn">Approve</div>
                    {/* <div className="staker__btn">Lock</div> */}
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
                    You may not see your cross-chain transaction due to
                    unpredictable glitches on different blockchain network and
                    the decentralized nature of XP.NETWORK protocol. Please be
                    patient and follow the instructions 💙
                </div>
            </div>
        </div>
    );
}
