import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Global.css";
import "./Responsive.css";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alert";
import NFTaccountList from "./components/NFTaccountList";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setReset, setTo, setTronPopUp } from "./store/reducers/generalSlice";
import NFTSlider from "./components/NftSlider";
import ApproveLoader from "./components/innercomponents/ApproveLoader";
import { Modal } from "react-bootstrap"
import Error from "./components/innercomponents/Error";
import TronPopUp from "./components/innercomponents/TronPopUp";
import { chains } from "./components/values";


function App() {
  const dispatch = useDispatch()
  const { active } = useWeb3React();
  const loader = useSelector(state => state.general.approveLoader)
  const error = useSelector(state => state.general.error)
  const tronPopUp = useSelector(state => state.general.tronPopUp)
  const [loadedApp, setLoadedApp] = useState()
  const handleClose = () => {
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
          console.log('hellosadsa')
          dispatch(setTo(toChain))
        }
      }
    }

    localStorage.clear()
  },[])
  const checkIfActive = () => {
    return active
  }

  // useEffect(() => {
  //   if (!active && loadedApp) {
  //     dispatch(setReset())
  //   } else setLoadedApp(true)
  // }, [active])
console.log(useSelector(s => s.general))
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
        <Modal  show={tronPopUp} close={handleClose()} onHide={handleClose()}>
          <TronPopUp />
        </Modal>
      <Router>
        <XpBridge/>
        {/* <NFTaccount/> */}
        {/* <NFTaccountList /> */}
        {/* <NFTOnaccount /> */}
        {/* <NFTNoaccounts/> */}
        {/* <Transactionhistory /> */}
        {/* <Aleart /> */}
        <Alert />
        {/* <NFTaccountList/> */}
      </Router>
    </div>
  );
}

export default App;
