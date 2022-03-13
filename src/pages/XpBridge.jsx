import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NFTaccount from "../components/NFTaccount";
import NftSelect from "../components/NftSelect";
import NftSlider from "../components/NftSlider";
import NFTsuccess from "../components/NFTsuccess";
import Transactionhistory from "../components/Transactionhistory";
import Slider from "../components/Slider/Slider";
import {
  Routes,
  Route,
} from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import ProtectedRoute from "../pages/ProtectedRoute"

function XpBridge() {
  useEffect(() => {}, []);
  const { widget } = useSelector((s) => s.general);
  // const step = useSelector((state) => state.general.step);
  const algorandClaimables = useSelector(
    (state) => state.general.algorandClaimables
  );
  return (
    <div className="nftContainer">
      {/* { algorandClaimables && algorandClaimables.length > 0 && <Transactionhistory /> } */}
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route path="/connect" element={<ConnectWallet />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" components={ <NFTaccount  />} />
        </Route>
      </Routes>
      <NFTsuccess />
    </div>
  );
}

export default XpBridge;
