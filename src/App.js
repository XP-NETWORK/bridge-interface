import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Global.css";
import "./Responsive.css";
import XpBridge from "./pages/XpBridge";
import Aleart from "./components/Aleart";
import NFTaccount from "./components/NFTaccount";
import NFTsuccess from "./components/NFTsuccess";
import NFTworng from "./components/NFTworng";
import NFTaccountList from "./components/NFTaccountList";
import NFTOnaccount from "./components/NFTOnaccount";

import Transactionhistory from './components/Transactionhistory';
import NFTNoaccounts from "./components/NFTnoaccounts";

function App() {
return (
    <div className={"App"}>
      <Router>
        <XpBridge/>
        <NFTaccount/>
        <NFTaccountList />
        <NFTOnaccount />
        <NFTNoaccounts/>
        <Transactionhistory />
        <NFTsuccess />
        <NFTworng />
        <Aleart />
      </Router>
    </div>
  );
}

export default App;
