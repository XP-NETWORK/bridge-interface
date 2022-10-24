import React from "react";
import Ledger from "../../assets/img/wallet/Ledger.svg";
import Trezor from "../../assets/img/wallet/Trezor.svg";
import PropTypes from "prop-types";

export default function USBWallet({ wallet }) {
    const OFF = { opacity: 0.6, pointerEvents: "none" };

    return wallet === "Ledger" ? (
        <li style={OFF} data-wallet="Ledger" className="wllListItem">
            <div>
                <img src={Ledger} alt="Ledger Icon" />
                <p>Ledger</p>
            </div>
            <div className="coming-chain">Coming soon</div>
        </li>
    ) : (
        <li style={OFF} data-wallet="Trezor" className="wllListItem">
            <div>
                <img
                    style={{ marginLift: "-5px" }}
                    src={Trezor}
                    alt="Trezor Icon"
                />
                <p> Trezor</p>
            </div>
            <div className="coming-chain">Coming soon</div>
        </li>
    );
}
USBWallet.propTypes = {
    wallet: PropTypes.string,
};
