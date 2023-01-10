import React from "react";

import { ReactComponent as MetaIcon } from "../../../assets/img/wallet/MetaMask.svg";
import "../Widget.css";

import Wservice from "../wservice";
import { initialState as initialWidget } from "../../../store/reducers/settingsSlice";
import mobileBanner from "../../Settings/assets/img/mobileOnlyBanner.svg";

import { useSearchParams } from "react-router-dom";

const wservice = Wservice();

const mobileOnlyBanner = `
<div class="mobileOnlyBanner"><img src=${mobileBanner} alt="mobileOnlyXP"/><div class="testComp">
    <h2>Widget</h2>
    <p>Mobile is not yet supported, please use widget on desktop.</p>
</div></div>  
`;

const overlay = document.createElement("div");

overlay.classList.add("bannerOverlay");

overlay.innerHTML = mobileOnlyBanner;

const Connect = () => {
  return (
    <div className="connectWalletCompDiv">
      <label className="connectWalletLabel">Connect your wallet </label>

      <button
        className="WalletBtn"
        onClick={async () => {
          const { signature, address } = await wservice.sign(undefined, true);

          const res = await wservice.add(
            address,
            signature,
            initialWidget,
            new URLSearchParams(window.location.search).get("name")
          );

          if (!res?.newWidget) {
            return;
          } //show error msg

          return window.open(
            `/${window.location.search
              .replace("create", res?.newWidget?._id)
              .replace(/&name=\S*/, "")}`,
            "_self"
          );
          //dispatch(setWConnect(true));
        }}
      >
        <MetaIcon className="metaIcon" />
        MetaMask
      </button>
    </div>
  );
};

export const withConnect = (App) => {
  return function Callback() {
    const [searchParams] = useSearchParams();

    const widget = searchParams.get("widget");
    const wsettings = searchParams.get("wsettings");
    const wid = searchParams.get("wid");

    const createMode = wsettings && widget && wid === "create";

    if (wsettings && window.innerWidth <= 600) {
      document.body.appendChild(overlay);
      document.body.style.pointerEvents = "none";
    }

    if (createMode) {
      document.body.classList.remove("widgetBlur");
    }

    return <>{createMode ? <Connect /> : <App />}</>;
  };
};
