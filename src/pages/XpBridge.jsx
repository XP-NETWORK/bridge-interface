import React from "react";
import NFTaccount from "../components/NFTsBoard/NFTaccount";

import { Routes, Route } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import ProtectedRoute from "../pages/ProtectedRoute";
import Deposits from "./Deposits";
import PageNotFound from "./PageNotFound";
import { getRightPath } from "../wallet/helpers";

function XpBridge() {
  const nftAccountPath = getRightPath()
    .split("?")
    ?.at(0);
  return (
    <div className="nftContainer">
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route path="/testnet" element={<ConnectWallet />} />
        <Route path="/staging" element={<ConnectWallet />} />

        <Route path="/connect" element={<ConnectWallet />} />
        <Route path="/testnet/connect" element={<ConnectWallet />} />
        <Route path="/staging/connect" element={<ConnectWallet />} />

        <Route element={<ProtectedRoute />}>
          <Route path={nftAccountPath} components={<NFTaccount />} />
        </Route>
        <Route path="/discounts" element={<Deposits />} />
        {<Route path="*" element={<PageNotFound />} />}
      </Routes>
    </div>
  );
}

export default XpBridge;
