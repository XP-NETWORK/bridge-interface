import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Approval from "../TransferBoard/Approval.jsx";
import ButtonToTransfer from "./ButtonToTransfer";
import Comment from "../innercomponents/Comment";
import DestinationChain from "../innercomponents/DestinationChain";
import SelectedNFT from "../innercomponents/SelectedNFT";
import SendFees from "./SendFees";
import "./TransferBoard.css";
import UnwrapWegld from "./UnwrapWegld.jsx";

export default function DesktopTransferBoard() {
    const nfts = useSelector((state) => state.general.NFTList);

    return (
        <div className="sendNftCol col-lg-4 desktopOnly">
            <div className="transfer-board">
                <form action="#">
                    <DestinationChain />
                    {nfts?.length ? (
                        <>
                            <SelectedNFT />
                            <Approval />
                            <SendFees />
                            <ButtonToTransfer />
                            <UnwrapWegld />
                        </>
                    ) : (
                        <Comment />
                    )}
                </form>
            </div>
        </div>
    );
}
