import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Global.css";
import "./Responsive.css";
import XpBridge from "./pages/XpBridge";
import Aleart from "./components/Aleart";
import NFTaccount from "./pages/NFTaccount";

function App() {
return (
    <div className={"App"}>
      <Router>
        <XpBridge/>
        <NFTaccount/>
        <Aleart/>
      </Router>
    </div>
  );
}

export default App;
