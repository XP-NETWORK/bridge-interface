import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccount,
    setConnectedWallet,
    setTonWallet,
    setWalletsModal,
    setFrom,
    setConnectedWalletType,
} from "../../../store/reducers/generalSlice";
import { setSigner, setWalletAddress } from "../../../store/reducers/signersSlice";
import { connectTonHub, connectTonKeeper, connectTonWallet, awaitTonHubReady } from "./TonConnectors";
import { setActiveTonWalletConnection, setQRCodeModal, setTonHubSession, setTonKeeperSession } from "./tonStore";

import { getRightPath } from "../../../utils";

import store from "../../../store/store";
import { useNavigate } from "react-router";

import { withServices } from "../../App/hocs/withServices";

import { Chain } from "xp.network";
import { getChainObject } from "../../../components/values";
import { googleAnalyticsCategories, handleGA4Event } from "../../../services/GA4";

function HigherTON(OriginalComponent) {
    //
    function updatedComponent({ serviceContainer }) {
        const { bridge } = serviceContainer;
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { from, to, temporaryFrom } = useSelector((state) => state.general);

        const tonKeeperSession = useSelector((state) => state.tonStore.tonKeeperSession);

        const ifTypeIsTonOrNotSelected = () => {
            switch (true) {
                case !from && !temporaryFrom:
                    return true;
                case temporaryFrom && temporaryFrom?.type === "TON":
                    return true;
                case from && from?.type === "TON":
                    return true;
                default:
                    return false;
            }
        };

        const getStyles = () => {
            let styles = {
                pointerEvents: ifTypeIsTonOrNotSelected() ? "" : "none",
                opacity: ifTypeIsTonOrNotSelected() ? "" : "0.6",
            };

            return styles;
        };

        const connectWallet = async (wallet, isMobile) => {
            let account;
            let signer;
            let connectedWallet;
            //const fromChain = await factory.inner(27);
            const chainWrapper = await bridge.getChain(from?.nonce || Chain.TON);
            const { chain: fromChain } = chainWrapper;

            switch (wallet) {
                case "TonWallet": {
                    account = await connectTonWallet();
                    connectedWallet = "TonWallet";
                    signer = fromChain.tonWalletWrapper({
                        wallet: account.signer,
                        config: {
                            address: account.address,
                        },
                    });

                    break;
                }
                case "TonKeeper":
                    store.dispatch(setActiveTonWalletConnection("TonKeeper"));
                    account = await connectTonKeeper(tonKeeperSession.userId);
                    connectedWallet = "TonKeeper";
                    signer = fromChain.tonKeeperWrapper({
                        wallet: {
                            send: (deepLink) => {
                                deepLink = deepLink.replace("https://app.tonkeeper.com/", "tonkeeper://");
                                store.dispatch(setActiveTonWalletConnection("TonKeeper"));

                                store.dispatch(
                                    setTonKeeperSession({
                                        message: "Approve TON transaction",
                                        deepLink,
                                        userId: tonKeeperSession.userId,
                                    })
                                );
                                store.dispatch(setQRCodeModal(true));
                            },
                            onSuccess: () => {
                                store.dispatch(setQRCodeModal(false));
                            },
                        },
                        config: {
                            ...account.signer,
                        },
                    });

                    break;
                case "TonHub": {
                    store.dispatch(setActiveTonWalletConnection("TonHub"));
                    const { connector, session } = await connectTonHub(isMobile);
                    dispatch(setTonHubSession(session));
                    signer = connector;
                    account = await awaitTonHubReady(session);

                    connectedWallet = "TonHub";
                    signer = fromChain.tonHubWrapper({
                        wallet: signer,
                        config: {
                            seed: session.seed,
                            appPublicKey: account.config.appPublicKey,
                            address: account.address,
                        },
                    });

                    break;
                }
                default:
                    break;
            }

            /*console.log(
                await chainWrapper.chain.getTokenInfo({
                    sourceNftContractAddress: "EQC_firgWJkGg8E9_IPPHaHstPtZMN-Avc0Lvs6krO3jOQrk",
                })
            );*/
            chainWrapper.setSigner(signer);
            bridge.setCurrentType(chainWrapper);
            dispatch(setAccount(account.address));
            dispatch(setConnectedWallet(connectedWallet));
            dispatch(setConnectedWalletType("TON"));
            dispatch(setWalletAddress(account.address));
            dispatch(setSigner(signer));
            dispatch(setTonWallet(true));
            dispatch(setWalletsModal(false));
            dispatch(setQRCodeModal(false));
            handleGA4Event(googleAnalyticsCategories.Connect, `Connected with: ${wallet}`);
            if (!from) {
                dispatch(setFrom(getChainObject(Chain.TON)));
            }

            if (from && to) {
                navigate(getRightPath(bridge.network, from, to, "TON"));
            }
        };

        return <OriginalComponent styles={getStyles} connectWallet={connectWallet} />;
    }

    return withServices(updatedComponent);
}

export default HigherTON;
