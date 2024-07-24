import React from "react";
import { useSelector } from "react-redux";
import Approval from "../TransferBoard/Approval.jsx";
import ButtonToTransfer from "./ButtonToTransfer";
import Comment from "../innercomponents/Comment";
import DestinationChain from "../innercomponents/DestinationChain";
import SelectedNFT from "../NFT/SelectedNFTs";
import SendFees from "./SendFees";
import "./TransferBoard.css";
import UnwrapWegld from "./UnwrapWegld.jsx";
import SecureTX from "./SecureTX.jsx";
import { ELROND } from "../../components/values";

import { useCheckMobileScreen } from "../Settings/hooks";
import { ButtonToClaim } from "./ButtonToClaim.jsx";

export default function DesktopTransferBoard() {
    const nfts = useSelector((state) => state.general.NFTList);
    const from = useSelector((state) => state.general.from);

    const mobile = useCheckMobileScreen();

    return (
        <div className="sendNftCol col-lg-4 desktopOnly">
            <div className="transfer-board">
                <form
                    action="#"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DestinationChain />
                    {nfts?.length ? (
                        <>
                            <SelectedNFT />
                            <Approval />
                            {!mobile && <SendFees />}
                            <ButtonToTransfer />
                            {from?.text === ELROND && <UnwrapWegld />}
                            <SecureTX />
                        </>
                    ) : (
                        <Comment />
                    )}
                    <ButtonToClaim/>
                </form>
            </div>
        </div>
    );
}
