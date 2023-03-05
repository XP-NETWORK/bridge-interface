/* eslint-disable no-debugger */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withServices } from "../../App/hocs/withServices";
import { Chain } from "xp.network";
import {
    setAccount,
    setError,
    setFrom,
    // setQrCodeString,
    setQrImage,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";
import { getChainObject } from "../../../components/values";
// import { chains } from "../../components/values";
import QRCode from "qrcode";
import { ExtensionProvider } from "@elrondnetwork/erdjs";
import { useNavigate } from "react-router";
import { getRightPath } from "../../../wallet/helpers";
import { WalletConnectV2Provider } from "@multiversx/sdk-wallet-connect-provider";
import { wcId } from "../EVMWallet/evmConnectors";

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
        const temporaryFrom = useSelector(
            (state) => state.general.temporaryFrom
        );

        const projectId = wcId;
        const relayUrl = "wss://relay.walletconnect.com";
        const chainId = testnet ? "T" : "1";
        const callbacks = {
            onClientLogin: async function() {
                // closeModal() is defined above
                // closeModal();
                const address = await provider.getAddress();
                console.log("Address:", address);
            },
            onClientLogout: async function() {
                console.log("onClientLogout()");
            },
            onClientEvent: async function(event) {
                console.log("onClientEvent()", event);
            },
        };
        const provider = new WalletConnectV2Provider(
            callbacks,
            chainId,
            relayUrl,
            projectId
        );

        const navigateToAccountRoute = () => {
            navigate(getRightPath());
        };

        const handleConnect = async (wallet) => {
            debugger;
            try {
                const chainWrapper = await bridge.getChain(
                    from?.nonce || Chain.ELROND
                );

                let account = {};

                switch (wallet) {
                    case "xPortal": {
                        await provider.init();
                        provider.onClientConnect = {
                            onClientLogin: async () => {
                                console.log("xPortal successful connected.");
                            },
                            onClientLogout: async () => {
                                window.localStorage.clear();
                                dispatch(setAccount(""));
                                dispatch(
                                    setError({
                                        message:
                                            "You have disconnected from Maiar, in order to transfer assets please login again",
                                    })
                                );
                            },
                        };
                        const { uri, approval } = await provider.connect();
                        const qr = await QRCode.toDataURL(uri);
                        dispatch(setQrImage(qr));
                        await provider.login({ approval });
                        account.address = provider.address;
                        account.signer = provider;
                        break;
                    }
                    case "MultiversXDeFi": {
                        const instance = ExtensionProvider.getInstance();
                        await instance
                            .init()
                            .catch(() =>
                                window.open(
                                    "https://getmaiar.com/defi",
                                    "_blank"
                                )
                            );
                        await instance.login();
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

                dispatch(setAccount(account.address));
                chainWrapper.setSigner(account.signer);
                bridge.setCurrentType(chainWrapper);
                dispatch(setWalletsModal(false));
                dispatch(setQrImage(false));
                if (to) navigateToAccountRoute();
                if (!from) {
                    dispatch(setFrom(getChainObject(Chain.ELROND)));
                }
            } catch (e) {
                dispatch(setError(e));
            }
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

        return (
            <OriginalComponent
                connectWallet={handleConnect}
                styles={getStyle}
            />
        );
    });
    return updatedComponent;
}
