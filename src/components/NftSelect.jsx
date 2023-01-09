import React from "react";
import ConnectWallet from "./Wallet/ConnectWallet";
import ChainSelectBox from "./Chains/ChainSelectBox";

import UserConnect from "./User/UserConnect";
import AccountModal from "./Modals/AccountModal/AccountModal";

import { useSelector } from "react-redux";

function NftSelect() {
  const widget = useSelector((state) => state.widget.widget);
  return (
    <div className="NftSelect">
      {widget && (
        <>
          <UserConnect />
          {window.innerWidth < 760 && <UserConnect mobile={true} />}
          <AccountModal />
        </>
      )}
      <div className="nftSlectArea">
        <ChainSelectBox />
        <ConnectWallet />
      </div>
    </div>
  );
}

export default NftSelect;
