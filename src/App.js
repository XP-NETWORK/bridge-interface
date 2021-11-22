import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Global.css";
import "./Responsive.css";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alert";



function App() {
return (
    <div className={"App"}>
      <Router>
        <XpBridge/>
        {/* <NFTaccount/> */}
        {/* <NFTaccountList /> */}
        {/* <NFTOnaccount /> */}
        {/* <NFTNoaccounts/> */}
        {/* <Transactionhistory /> */}
        {/* <Aleart /> */}
        <Alert />
      </Router>
    </div>
  );
}

export default App;
