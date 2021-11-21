import React from 'react'

import InfLith from '../../assets/img/icons/infoLifht.svg';

function Approval() {
    return (
        <div className="approValBox">
            <div className="approvTop">
                Approval
                <div className="appInf">
                    <span className="infText">
                        We'd like to make sure you really want to send the NFT and pay the associated fees.
                    </span>
                    <img src={InfLith} alt="Inf" />
                </div>
            </div>
            <div className="approveBtn">
                Approve all NFTs
                <div className="approveBtn">
                    <input type="checkbox" id="approveCheck" />
                    <label htmlFor="approveCheck">
                        <span className="checkCircle"></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Approval;
