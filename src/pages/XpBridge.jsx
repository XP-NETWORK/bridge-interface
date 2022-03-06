import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NFTaccount from "../components/NFTaccount";
import NftSelect from "../components/NftSelect";
import NftSlider from "../components/NftSlider";
import NFTsuccess from "../components/NFTsuccess";
import Transactionhistory from "../components/Transactionhistory";
import { Routes, Route } from "react-router";

function XpBridge() {
  useEffect(() => {}, []);
  const { widget } = useSelector((s) => s.general);
  const step = useSelector((state) => state.general.step);
  const algorandClaimables = useSelector(
    (state) => state.general.algorandClaimables
  );
  return (
    <div className="nftContainer">
      { algorandClaimables && algorandClaimables.length > 0 && <Transactionhistory /> }

      { step === 1 && <NftSelect /> }
      { step === 2 && <NFTaccount /> }
      <NFTsuccess />
    </div>
  );
}

export default XpBridge;
