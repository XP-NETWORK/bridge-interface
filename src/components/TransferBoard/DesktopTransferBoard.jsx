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
import SecureTX from "./SecureTX.jsx";

import { useCheckMobileScreen } from "../Settings/hooks";

export default function DesktopTransferBoard() {
  const nfts = useSelector((state) => state.general.NFTList);

  const mobile = useCheckMobileScreen();

  return (
    <div className="sendNftCol col-lg-4 desktopOnly">
      <div className="transfer-board">
        <form action="#">
          <DestinationChain />
          {nfts?.length ? (
            <>
              <SelectedNFT />
              <Approval />
              {!mobile && <SendFees />}
              <ButtonToTransfer />
              <UnwrapWegld />
              <SecureTX />
            </>
          ) : (
            <Comment />
          )}
        </form>
      </div>
    </div>
  );
}
