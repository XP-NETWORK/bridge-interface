import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./Global.css";
import "./Responsive.css";
import XpBridge from "./pages/XpBridge";
import Alert from "./components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setAlgorandClaimables, setFrom, setTo, setTronPopUp } from "./store/reducers/generalSlice";
import ApproveLoader from "./components/innercomponents/ApproveLoader";
import { Modal } from "react-bootstrap"
import Error from "./components/innercomponents/Error";
import TronPopUp from "./components/innercomponents/TronPopUp";
import { chains } from "./components/values";
import About from "./components/innercomponents/About";
import Video from "./components/innercomponents/Video";
import {getFactory, setClaimablesAlgorand} from './wallet/helpers'
import Widget from "./components/Widget";
import TechnicalSupport from "./components/innercomponents/TechnicalSupport";
import TransferLoader from "./components/innercomponents/TransferLoader";
import TronConnectionErrMod from "./components/TronConnectionErrMod";

function App() {
  const dispatch = useDispatch()
  const loader = useSelector(state => state.general.approveLoader)
  const algorandAccount = useSelector(state => state.general.algorandAccount)
  const error = useSelector(state => state.general.error)
  const tronPopUp = useSelector(state => state.general.tronPopUp)
  const nftsToWhitelist = useSelector(state => state.general.techModal)

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
  useEffect(async () => {
    if(algorandAccount) {
      try {
        setClaimablesAlgorand(algorandAccount)
      } catch(err) {
        console.log(err, 'algorand claimables error')
      }

    }
  },[algorandAccount])

return (
    <div className={"App"}>
      <About />
      <Video />
      <TechnicalSupport />
      <TransferLoader />
      <TronConnectionErrMod />
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
      <Widget />
    </div>
  );
}

export default App;
