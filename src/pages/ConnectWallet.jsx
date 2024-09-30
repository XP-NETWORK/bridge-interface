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
          <div className="first-step__banner__left" style={{}}>
            <div>Decentralized NFT bridge is LIVE! 🔥</div>
            <div className="first-step__banner__chains" style={{}}>
              {v3chains.map((chain) => (
                <img
                  key={chain.chain}
                  style={{ width: "30px" }}
                  src={chain.icon}
                />
              ))}
            </div>
          </div>
          <a
            className="first-step__trynow__button"
            href="https://decentralized.bridge.xp.network/"
          >
            Try now
          </a>
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
