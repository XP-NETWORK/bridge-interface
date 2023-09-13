import React from "react";

import { ServiceConsumer, WalletConnectConsumer } from "./serviceProvider";

const withServices = (Wrapped) =>
    function CallBack(props) {
        return (
            <ServiceConsumer>
                {({ serviceContainer, setContainer }) => (
                    <Wrapped
                        {...props}
                        serviceContainer={serviceContainer}
                        setContainer={setContainer}
                    />
                )}
            </ServiceConsumer>
        );
    };

const withWalletConnect = (Wrapped) =>
    function CallBack(props) {
        return (
            <WalletConnectConsumer>
                {({ chains, ethereumClient }) => (
                    <Wrapped
                        {...props}
                        walletConnectChains={chains}
                        walletConnectClient={ethereumClient}
                    />
                )}
            </WalletConnectConsumer>
        );
    };

export { withServices, withWalletConnect };
