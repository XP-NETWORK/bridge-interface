import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NFTaccount from "../components/NFTsBoard/NFTaccount";
import NFTsuccess from "../components/Modals/Success/NFTsuccess";
import { Routes, Route } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import ProtectedRoute from "../pages/ProtectedRoute";

function XpBridge() {
  const testnet = useSelector((state) => state.general.testNet);
  const widget = useSelector((state) => state.general.widget);
  const wsettings = useSelector((state) => state.general.wsettings);

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
      </Routes>
      {/* <NFTsuccess /> */}
    </div>
  );
}

export default XpBridge;
