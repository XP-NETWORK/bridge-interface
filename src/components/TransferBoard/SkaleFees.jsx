import React from "react";
import { ReactComponent as InfLithComp } from "../../assets/img/icons/Inf.svg";
import PropTypes from "prop-types";

import "./SkaleFees.css";
import { LittleLoader } from "../innercomponents/LittleLoader";
import { useSelector } from "react-redux";

export default function SkaleFees({ loading, balance }) {
    const eurEthBalance = useSelector((state) => state.general.eurEthBalance);

    return (
        <div className="fees skale-fees">
            <div className="skale-fees__title">Transfer Fee</div>
            <div className="skale-fee__container">
                <div className="sfuel__container">
                    <div className="skale-label">
                        <span>sFUEL</span>
                        <span className="stake-fee__inf">
                            <InfLithComp className="svgWidget nftInfIcon" />
                        </span>
                    </div>
                    <div className="skale-balance__container">
                        <div className="skale-balance fees__balance">
                            {`Balance: ${balance} sFUEL`}
                        </div>
                        <div className="transfer-fee">0 sFUEL</div>
                    </div>
                </div>
                <div className="eurEth__container">
                    <div className="eurEth-label">
                        <span>EurETH</span>
                        <span className="stake-fee__inf">
                            <InfLithComp className="svgWidget nftInfIcon" />
                        </span>
                    </div>
                    <div className="eurEth-balance__container">
                        <div className="skale-balance fees__balance">
                            {`Balance: ${eurEthBalance.toFixed(3)} EurETH`}
                        </div>
                        {loading ? (
                            <div className="transfer-fee">0 EurETH</div>
                        ) : (
                            <LittleLoader />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

SkaleFees.propTypes = {
    loading: PropTypes.bool,
    balance: PropTypes.string,
};
