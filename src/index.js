import React from "react";
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
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./layout/ErrorBoundary";

function getLibrary(provider) {
    return new Web3(provider);
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store}>
                <BrowserRouter>
                    <ErrorBoundary>
                        <NavBar />
                        <App />
                        <Footer />
                    </ErrorBoundary>
                </BrowserRouter>
            </Provider>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
