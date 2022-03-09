import { useEffect } from 'react';
import Logo from "../assets/img/nav/newXpLogo.svg"
import burger from "../assets/img/nav/burger.svg"
import AccountModal from "../components/AccountModal"
import { Navbar, Nav, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setAccountModal, setReset, setWalletsModal } from '../store/reducers/generalSlice';
import "./NavBar.css"
import { useWeb3React } from '@web3-react/core';
import Identicon from '../components/Identicon';
import {LinkContainer} from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom';



function NavBar() {
    const dispatch = useDispatch()
    const location = useLocation().pathname
    console.log("🚀 ~ file: NavBar.jsx ~ line 19 ~ NavBar ~ location", location)
    const widget = useSelector(state => state.general.widget)
    const handleShow = () => dispatch(setAccountModal(true));
    const step = useSelector(state => state.general.step)
    const testnet = useSelector(state => state.general.testNet)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const tezosAccount = useSelector(state => state.general.tezosAccount)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const tronWallet = useSelector(state => state.general.tronWallet)
    const { chainId, account } = useWeb3React();
    const style = { background: " rgba(255, 255, 255, 0.4)" }
    const walletAccount = account || elrondAccount || tezosAccount || algorandAccount || tronWallet

    const handleConnect = () => {
        dispatch(setWalletsModal(true))
    }

    return (
        !widget && <header id="Header"> 
            <Navbar expand="lg">    
                <Navbar.Brand onClick={() => dispatch(setReset())}  >
                    <img src={Logo} alt="Xp Network"/>
                    <div >MULTICHAIN NFT BRIDGE</div>
                    { testnet && <span className="testnet">TestNet</span>}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="" />
                    <Navbar.Collapse id="">
                        <Nav>
                            <LinkContainer to='/connect'>
                                <Nav.Link  target="_blank" href="#">Bridge</Nav.Link>
                            </LinkContainer>
                            <Nav.Link  target="_blank" href="#">Explorer</Nav.Link>
                            <Nav.Link  target="_blank" href="#">FAQ</Nav.Link>
                            <div onClick={handleConnect} className='navbar-connect'>
                                {walletAccount ? `${walletAccount.substring(0, window.innerWidth <= 600 ? 16 : 10)}...${walletAccount.substring(walletAccount.length - 2)}` : "Connect Wallet"}
                                {walletAccount && <Identicon account={walletAccount} />}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                <AccountModal />
            </Navbar>
        </header>
    )
}

export default NavBar


//<Nav.Link  target="_blank" href="https://docs.xp.network/">Docs</Nav.Link>
//<Nav.Link  target="_blank" href="https://xp.network/">Home</Nav.Link>
//<Nav.Link  target="_blank" href="https://stake.xp.network">Staking</Nav.Link>