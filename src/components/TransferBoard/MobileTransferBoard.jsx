import React from "react";

import Approval from "../TransferBoard/Approval";
import ButtonToTransfer from "./ButtonToTransfer";
import SelectedNFT from "../NFT/SelectedNFTs";

import SendFees from "./SendFees";

export default function MobileTransferBoard() {
    return (
        <div className="mobileOnly">
            <SelectedNFT />
            <Approval />
            <div className="nftSendBtn disenable">
                <SendFees />
                <ButtonToTransfer />
            </div>
        </div>
    );
}
