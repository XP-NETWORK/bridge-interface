import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Global.css";
import "./Responsive.css";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alert";
import NFTaccountList from "./components/NFTaccountList";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { setReset } from "./store/reducers/generalSlice";
import NFTSlider from "./components/NftSlider";


function App() {
  const dispatch = useDispatch()
  const { active } = useWeb3React();

  const checkIfActive = () => {
    return active
  }

  useEffect(() => {
    if (!active) {
      dispatch(setReset())
    }
  }, [active])

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
        {/* <Alert /> */}
        {/* <NFTaccountList/> */}
      </Router>
    </div>
  );
}

export default App;
