/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "../src/store/store";
import "./components/Widget/Widget.css";
import "./components/Settings/Settings.css";
import "./Global.css";
import "./Responsive.css";
import "@near-wallet-selector/modal-ui/styles.css";
import App from "./App";
/**es */

import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./layout/ErrorBoundary";

import { ServiceProvider } from "./components/App/hocs/serviceProvider";

import Bridge from "./services/bridge";
import WhiteListedPool from "./services/whiteListedPool";

import { WagmiConfig } from "wagmi";
import {
  wagmiClient,
  createSafeStorage,
} from "./components/Wallet/EVMWallet/evmConnectors";

function getLibrary(provider) {
  return new Web3(provider);
}

const Services = ({ children }) => {
  const [serviceContainer, setContainer] = useState({
    bridge: Bridge(),
    whitelistedPool: WhiteListedPool(),
    safeLocalStorage: createSafeStorage(),
  });

  return (
    <ServiceProvider value={{ serviceContainer, setContainer }}>
      {children}
    </ServiceProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Services>
          <Provider store={store}>
            <BrowserRouter>
              <ErrorBoundary>
                <NavBar />
                <App />
                <Footer />
              </ErrorBoundary>
            </BrowserRouter>
          </Provider>
        </Services>
      </Web3ReactProvider>
    </WagmiConfig>
  </React.StrictMode>,
  document.getElementById("root")
);
