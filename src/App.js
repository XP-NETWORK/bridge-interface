import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Global.css";
import "./Responsive.css";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alert";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setReset, setTo, setTronPopUp } from "./store/reducers/generalSlice";
import ApproveLoader from "./components/innercomponents/ApproveLoader";
import { Modal } from "react-bootstrap"
import Error from "./components/innercomponents/Error";
import TronPopUp from "./components/innercomponents/TronPopUp";
import { chains } from "./components/values";


function App() {
  const dispatch = useDispatch()
  const loader = useSelector(state => state.general.approveLoader)
  const error = useSelector(state => state.general.error)
  const tronPopUp = useSelector(state => state.general.tronPopUp)

  function handleClose () {
    dispatch(setTronPopUp(false))
  }

  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get('from')
    const to = new URLSearchParams(window.location.search).get('to')
    if(from !== to) {
      if(from) {
        const fromChain = chains.filter(n => n.text === from.replace('/', ''))[0]
        if(fromChain) {
          dispatch(setFrom(fromChain))
        }
      }
      if(to) {
        const toChain = chains.filter(n => n.text === to.replace('/', ''))[0]
        if(toChain) {
          dispatch(setTo(toChain))
        }
      }
    }

    localStorage.clear()
  },[])


return (
    <div className={"App"}>
        <Modal 
        centered
        className="approve-modal"
        style={{
          overflow: "hidden",
          backgroundColor: "#00000090",
        }} 
        show={loader}>
          <ApproveLoader />
        </Modal>
        <Modal show={error} >
          <Error />
        </Modal>
        <Modal show={tronPopUp} onHide={() => handleClose()}>
          <TronPopUp />
        </Modal>
      <Router>
        <XpBridge/>
        <Alert />
      </Router>
    </div>
  );
}

export default App;
