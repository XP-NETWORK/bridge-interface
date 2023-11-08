import React, { useEffect, useState } from "react";
import processing from "../../../assets/img/icons/processing.svg";
import pending from "../../../assets/img/icons/Pending.svg";
import complete from "../../../assets/img/icons/completed.svg";
import failed from "../../../assets/img/icons/Failed.svg";

export default function TxStatus({ status }) {
    const [dots, setDots] = useState("");

    useEffect(() => {
        let interval;
        if (status === "pending" || status === "processing") {
            interval = setInterval(() => {
                if (dots?.length !== 3) {
                    setDots(dots + ".");
                } else if (dots?.length === 3) {
                    setDots("");
                }
            }, 500);
        }
        return () => clearInterval(interval);
    });

    const showStatus = () => {
        switch (status) {
            case "failed":
                return (
                    <div className="tx-status failed">
                        <div className="tx-icon">
                            <img
                                style={{ height: "18px" }}
                                src={failed}
                                alt=""
                            />
                        </div>
                        <div className="tx-txt">Failed</div>
                    </div>
                );
            case "processing":
                return (
                    <div className="tx-status processing">
                        <div className="tx-icon">
                            <img
                                style={{ height: "18px" }}
                                src={processing}
                                alt=""
                            />
                        </div>
                        <div className="tx-txt">{`Processing${dots}`}</div>
                        <div className="txn-processing__inf"></div>
                    </div>
                );
            case "pending":
                return (
                    <div className="tx-status pending">
                        <div className="tx-icon">
                            <img src={pending} alt="" />
                        </div>
                        <div className="tx-txt">{`Pending${dots}`}</div>
                    </div>
                );
            case "completed":
                return (
                    <div className="tx-status completed">
                        <div className="tx-icon">
                            <img src={complete} alt="" />
                        </div>
                        <div className="tx-txt">Completed</div>
                    </div>
                );
            case "claimed":
                return (
                    <div className="tx-status completed">
                        <div className="tx-icon">
                            <img src={complete} alt="" />
                        </div>
                        <div className="tx-txt">Claimed</div>
                    </div>
                );
            default:
                return (
                    <div className="tx-status pending">
                        <div className="tx-icon">
                            <img src={pending} alt="" />
                        </div>
                        <div className="tx-txt">{`Pending${dots}`}</div>
                    </div>
                );
        }
    };

    return showStatus();
}
