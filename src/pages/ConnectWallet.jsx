import React from "react";
import NftSelect from "../components/NftSelect";
import Slider from "../components/Slider/Slider";

// import ChangeWalletModal from "../components/Modals/ChangeWallet/ChangeWalletModal";
import AuditedBy from "../components/innercomponents/AuditedBy";
import { v3chains } from "../wallet/v3-chains";

export default function ConnectWallet() {
  return (
    <div className="first-step__container__top">
      <div className="first-step__banner">
        <div className="first-step__banner__inner">
          <div className="first-step__banner__left">
            <div>Welcome to the new decentralized NFT bridge! 🔥</div>
            <div className="first-step__banner__chains">
              {v3chains.map((chain) => (
                <img
                  key={chain.chain}
                  style={{ width: "30px" }}
                  src={chain.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="first-step__container">
        {/* <ChangeWalletModal /> */}
        <Slider />
        <NftSelect />
      </div>
      <AuditedBy />
    </div>
  );
}
