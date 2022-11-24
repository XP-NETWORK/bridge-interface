import React from "react";
import NftSelect from "../components/NftSelect";
import Slider from "../components/Slider/Slider";

import ChangeWalletModal from "../components/Modals/ChangeWallet/ChangeWalletModal";
import AuditedBy from "../components/innercomponents/AuditedBy";

export default function ConnectWallet() {
    return (
        <>
            <div className="first-step__container">
                <ChangeWalletModal />
                <Slider />
                <NftSelect />
            </div>
            <AuditedBy />
        </>
    );
}
