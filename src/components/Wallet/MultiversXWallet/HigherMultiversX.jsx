import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withServices } from "../../App/hocs/withServices";
import { Chain } from "xp.network";
import {
    setAccount,
    setError,
    setFrom,
} from "../../../store/reducers/generalSlice";
import { getChainObject } from "../../../components/values";

import { ExtensionProvider } from "@elrondnetwork/erdjs";
import { useNavigate } from "react-router";
import { getRightPath } from "../../../wallet/helpers";

export default function HigherMultiversX(OriginalComponent) {
    const updatedComponent = withServices((props) => {
        const {
            serviceContainer: { bridge },
        } = props;
        console.log(bridge);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const OFF = { opacity: 0.6, pointerEvents: "none" };
        const from = useSelector((state) => state.general.from);
        const to = useSelector((state) => state.general.to);
        const temporaryFrom = useSelector(
            (state) => state.general.temporaryFrom
        );

        const navigateToAccountRoute = () => {
            navigate(getRightPath());
        };

        const handleConnect = async (wallet) => {
            try {
                const chainWrapper = await bridge.getChain(
                    from?.nonce || Chain.ELROND
                );

                let account = {};

                switch (wallet) {
                    // case "Maiar": {
                    //   await new Promise((r) => {
                    //     (async () => {
                    //       const provider = new ProxyProvider("https://gateway.elrond.com");
                    //       const maiarProvider = new WalletConnectProvider(
                    //         provider,
                    //         "https://bridge.walletconnect.org/"
                    //       );
                    //       await maiarProvider.init();

                    //       maiarProvider.onClientConnect = {
                    //         onClientLogin: async () => {
                    //           const addess = await maiarProvider.getAddress();
                    //           account.address = addess;
                    //           account.signer = maiarProvider;
                    //           dispatch(setConfirmMaiarMob(true));
                    //           dispatch(setOnMaiar(true));
                    //           dispatch(setQrImage(null));
                    //           !from &&
                    //             dispatch(
                    //               setFrom(
                    //                 chains.find((chain) => chain.nonce === Chain.ELROND)
                    //               )
                    //             );
                    //           r();
                    //         },
                    //         onClientLogout: async () => {
                    //           chainWrapper.setSigner(null);
                    //           dispatch(
                    //             setError({
                    //               message:
                    //                 "You have disconnected from Maiar, in order to transfer assets please login again",
                    //             })
                    //           );
                    //         },
                    //       };

                    //       const qrCodeString = await maiarProvider.login();
                    //       dispatch(setQrCodeString(qrCodeString));
                    //       const qr = await QRCode.toDataURL(qrCodeString);
                    //       dispatch(setQrImage(qr));
                    //     })();
                    //   });
                    //   break;
                    // }
                    case "Maiar Extension": {
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
                close();
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
