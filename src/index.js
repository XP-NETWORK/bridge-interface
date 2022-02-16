import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "../src/store/store";
import './Global.css';
import App from './App';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <Router>
          <NavBar/>
          <App />
          <Footer />
        </Router>
      </Provider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);