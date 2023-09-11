import React from "react";

const {
    Provider: ServiceProvider,
    Consumer: ServiceConsumer,
} = React.createContext({});

const {
    Provider: WalletConnectProvier,
    Consumer: WalletConnectConsumer,
} = React.createContext({});

export {
    ServiceProvider,
    ServiceConsumer,
    WalletConnectProvier,
    WalletConnectConsumer,
};
