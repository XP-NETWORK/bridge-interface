import React from "react";
import { useSelector } from "react-redux";
import NFTaccount from "../components/NFTsBoard/NFTaccount";

import { Routes, Route } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import ProtectedRoute from "../pages/ProtectedRoute";
import Deposits from "./Deposits";
import PageNotFound from "./PageNotFound";

function XpBridge() {
  const testnet = useSelector((state) => state.general.testNet);

  const { widget, wsettings } = useSelector(({ widget }) => ({
    widget: widget.widget,
    wsettings: widget.wsettings,
  }));

  return (
    <div className="nftContainer">
      {wsettings && widget && <div id="settingsPanelContainer"></div>}
      {/* { algorandClaimables && algorandClaimables.length > 0 && <Transactionhistory /> } */}
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route path="/testnet" element={<ConnectWallet />} />
        <Route path="/connect" element={<ConnectWallet />} />
        <Route path="/testnet/connect" element={<ConnectWallet />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path={testnet ? "/testnet/account" : "/account"}
            components={<NFTaccount />}
          />
        </Route>
        <Route path="/discounts" element={<Deposits />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <NFTsuccess /> */}
    </div>
  );
}

export default XpBridge;
