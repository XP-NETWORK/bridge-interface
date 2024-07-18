/* eslint-disable no-debugger */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withServices } from "../../App/hocs/withServices";
import { Chain } from "xp.network";
import {
    setAccount,
    setConnectedWallet,
    setConnectedWalletType,
    setDeepLink,
    setError,
    setFrom,
    // setQrCodeString,
    setQrImage,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";
import { getChainObject } from "../../../components/values";
// import { chains } from "../../components/values";
import QRCode from "qrcode";
import { ExtensionProvider } from "@multiversx/sdk-extension-provider";
import { useNavigate } from "react-router";
import { getRightPath } from "../../../utils";
import { WalletConnectV2Provider } from "@multiversx/sdk-wallet-connect-provider";
import { wcId } from "../EVMWallet/WalletConnect";
import { googleAnalyticsCategories, handleGA4Event } from "../../../services/GA4";

export const connectExtension = async (chainId) => {
    const instance = ExtensionProvider.getInstance();

    await instance.init().catch(() => window.open("https://getmaiar.com/defi", "_blank"));
    await instance.login();

    instance.chainId = chainId;
    return instance;
};

export default function HigherMultiversX(OriginalComponent) {
    const updatedComponent = withServices((props) => {
        const {
            serviceContainer: { bridge },
        } = props;
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const OFF = { opacity: 0.6, pointerEvents: "none" };
        const from = useSelector((state) => state.general.from);
        const testnet = useSelector((state) => state.general.testNet);

        const to = useSelector((state) => state.general.to);
        const temporaryFrom = useSelector((state) => state.general.temporaryFrom);

        const projectId = wcId;
        const relayUrl = "wss://relay.walletconnect.com";
        const chainId = testnet ? "D" : "1";
        const callbacks = {
            onClientLogin: async function() {
                // closeModal() is defined above
                // closeModal();
                const address = await provider.getAddress();
                console.log("Address:", address);
            },
            onClientLogout: async function() {
                navigate("/");
                dispatch(setAccount(""));
                dispatch(setConnectedWallet(""));
                dispatch(setConnectedWalletType(""));
                dispatch(
                    setError({
                        message: "You are disconnected from the xPortal.",
                    })
                );
            },
            onClientEvent: async function(event) {
                console.log("onClientEvent()", event);
            },
        };
        const provider = new WalletConnectV2Provider(callbacks, chainId, relayUrl, projectId);

        const navigateToAccountRoute = () => {
            navigate(getRightPath(bridge.network));
        };

        const handleConnect = async (wallet) => {
            // debugger;
            let walletConnected;
            try {
                const chainWrapper = await bridge.getChain(from?.nonce || Chain.ELROND);

                let account = {};
                // debugger;
                switch (wallet) {
                    case "xPortal": {
                        walletConnected = "xPortal";
                        await provider.init();

                        dispatch(setWalletsModal(false));
                        const { uri, approval } = await provider.connect();
                        dispatch(setDeepLink(uri));
                        const qr = await QRCode.toDataURL(uri);
                        dispatch(setQrImage(qr));
                        await provider.login({ approval });
                        account.address = provider.address;
                        account.signer = provider;
                        break;
                    }
                    case "MultiversXDeFi": {
                        walletConnected = "MultiversX DeFi";
                        let instance;
                        try {
                            instance = await connectExtension(chainId);
                        } catch (error) {
                            if (error.message.includes("Extension provider is not initialised")) {
                                dispatch(
                                    setError({
                                        message: "MultiversX DeFi Extension required.",
                                    })
                                );
                            }
                        }

                        const {
                            account: { address },
                        } = instance;

                        if (account?.name === "CanceledError") {
                            throw new Error("CanceledError");
                        }
                        account.address = address;
                        account.signer = instance;
                        break;
                    }
                }
                dispatch(setConnectedWallet(walletConnected));
                dispatch(setConnectedWalletType('Elrond'));
                dispatch(setAccount(account.address));
                chainWrapper.setSigner(account.signer);
                bridge.setCurrentType(chainWrapper);
                /*return await chainWrapper.claim(
                    await bridge.getChain(4),
                    "0x6544a7661e4a75a80c08ee2c27bc16387c4fb571216c28938b30e734e0d55e22"
                );*/

                dispatch(setWalletsModal(false));
                dispatch(setQrImage(false));
                if (to) navigateToAccountRoute();
                if (!from) {
                    dispatch(setFrom(getChainObject(Chain.ELROND)));
                }
            } catch (e) {
                dispatch(setError(e));
            }
            handleGA4Event(googleAnalyticsCategories.Connect, `COnnected with: ${wallet}`);
        };

        const getStyle = () => {
            if (temporaryFrom?.type === "Elrond") {
                return {};
            } else if (temporaryFrom && temporaryFrom?.type !== "Elrond") {
                return OFF;
            } else if (!from) {
                return {};
            } else if (from && from.type === "Elrond") {
                return {};
            } else return OFF;
        };

        return <OriginalComponent connectWallet={handleConnect} styles={getStyle} />;
    });
    return updatedComponent;
}
