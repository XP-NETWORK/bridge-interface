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

function getLibrary(provider) {
  return new Web3(provider);
}

const Services = ({ children }) => {
  const [serviceContainer, setContainer] = useState({
    bridge: Bridge(),
    whitelistedPool: WhiteListedPool(),
    safeLocalStorage: (() => {
      window.safeLocalStorage = {
        getItem(key) {
          try {
            return localStorage.getItem(key);
          } catch (e) {
            console.log("error in safeLocalStorage", e);
            return undefined;
          }
        },
        setItem(key, val) {
          try {
            return localStorage.setItem(key, val);
          } catch (e) {
            console.log("error in safeLocalStorage", e);
            return undefined;
          }
        },
        removeItem(key) {
          try {
            return localStorage.removeItem(key);
          } catch (e) {
            console.log("error in safeLocalStorage", e);
            return undefined;
          }
        },
        clear() {
          try {
            return localStorage.clear();
          } catch (e) {
            console.log("error in safeLocalStorage", e);
            return undefined;
          }
        },
      };
    })(),
  });

  return (
    <ServiceProvider value={{ serviceContainer, setContainer }}>
      {children}
    </ServiceProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById("root")
);
