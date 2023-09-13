import React, { useEffect, useState } from "react";
import NFTaccount from "../components/NFTsBoard/NFTaccount";

import { Routes, Route } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import ProtectedRoute from "../pages/ProtectedRoute";
import Deposits from "./Deposits";
import PageNotFound from "./PageNotFound";
import { getRightPath } from "../utils";

import { useSelector } from "react-redux";

import { EventPage } from "../event";

//import { Helmet } from "react-helmet";

//import meta from "../event/a.png";

function XpBridge() {
    const [nftAccountPath, setPath] = useState("/account");

    const { testNet, staging } = useSelector((state) => ({
        testNet: state.general.testNet,
        staging: state.general.staging,
    }));

    useEffect(() => {
        setPath(
            getRightPath()
                .split("?")
                ?.at(0)
        );
    }, [testNet, staging]);

    const { widget, wsettings } = useSelector(({ widget }) => ({
        widget: widget.widget,
        wsettings: widget.wsettings,
    }));

    return (
        <div className="nftContainer">
            {wsettings && widget && <div id="settingsPanelContainer"></div>}
            <Routes>
                <Route path="/" element={<ConnectWallet />} />
                <Route path="/testnet" element={<ConnectWallet />} />
                <Route path="/staging" element={<ConnectWallet />} />

                <Route path="/connect" element={<ConnectWallet />} />
                <Route path="/testnet/connect" element={<ConnectWallet />} />
                <Route path="/staging/connect" element={<ConnectWallet />} />

                <Route element={<ProtectedRoute />}>
                    <Route path={nftAccountPath} element={<NFTaccount />} />
                </Route>
                <Route path="/discounts" element={<Deposits />} />
                <Route
                    path="/crossroads"
                    element={
                        <>
                            {/*                            <Helmet>
                                <title>My Title</title>
                                <meta name="twitter:image:src" content={meta} />
                                <meta property="og:image" content={meta} />
                                <meta property="image" content={meta} />
</Helmet>*/}
                            <EventPage />
                            <div className="alex">
                                <ConnectWallet />
                            </div>
                        </>
                    }
                />
                {<Route path="*" element={<PageNotFound />} />}
            </Routes>
        </div>
    );
}

export default XpBridge;
