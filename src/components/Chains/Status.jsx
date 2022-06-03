import React, { useEffect, useState } from "react";

export default function Status({ status }) {
    const [dots, setDots] = useState("");

    useEffect(() => {
        let interval;
        if (status === "connecting") {
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
            case "connecting":
                return (
                    <div className="chain-connecting">{`Connecting${dots}`}</div>
                );
            case "off-line":
                return <div className="chain__off">Offline</div>;
            case "coming":
                return <div className="coming-chain">Coming soon</div>;
            case "maintenance":
                return <div className="maintenance-chain">Maintenance</div>;
            case "new":
                return <div className="new-chain">New</div>;
            case "updated":
                return <div className="updated">Updated</div>;
            default:
                break;
        }
    };

    return showStatus();
}
