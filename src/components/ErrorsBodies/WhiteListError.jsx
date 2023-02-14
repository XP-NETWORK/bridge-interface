import React from "react";
import "./errors.css";

export default function WhiteListError() {
    return (
        <div className="whitelist-error-body">
            <div className="title">
                Please make sure the smart contract you are trying to whitelist
                is:
            </div>
            <div className="actions">
                <div>1. Verified</div>
                <div>2. Not a proxy contract</div>
                <div>3. Not an upgradable contract</div>
            </div>
            <div className="message">
                For more information regarding whitelisting limitations, visit
                our documentation
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://docs.xp.network/docs/Multibridge3.0/limitations"
                >
                    here
                </a>
            </div>
            <div className="message">
                If the smart contract meets the requirements, but the problem
                persists, contact XP.NETWORK support team
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://t.me/XP_NETWORK_Bridge_Support_Bot?start=startwithxpbot"
                >
                    here
                </a>
            </div>
        </div>
    );
}
// Please make sure the smart contract you are trying to whitelist is:

// Verified
// Not a proxy contract
// Not an upgradable contract

// For more information regarding whitelisting limitations, visit our documentation here

// If the smart contract meets the requirements, but the problem persists, contact XP.NETWORK support team here
