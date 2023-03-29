import React from "react";
import certik from "../../assets/img/audited_by/certik.svg";
import hacken from "../../assets/img/audited_by/hacken.svg";
import smart_state from "../../assets/img/audited_by/smart_state.svg";
import safepress from "../../assets/img/audited_by/safepress.svg";
import blocksec from "../../assets/img/audited_by/blocksec.svg";

import "./AuditedBy.css";
export default function AuditedBy() {
    return (
        <div className="audited__wrapper">
            <div className="audited">
                <div className="audited__title">Audited by: </div>
                <div className="audited__stickers">
                    <img src={certik} alt="Certik" />
                    <img src={hacken} alt="Hacken" />
                    <img src={smart_state} alt="Smart state" />
                    <img src={safepress} alt="Safepress" />
                    <img src={blocksec} alt="Blocksec" />
                </div>
            </div>
        </div>
    );
}
