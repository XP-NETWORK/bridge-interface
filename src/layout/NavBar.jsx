import Logo from "../assets/img/nav/newXpLogo.svg"
import burger from "../assets/img/nav/burger.svg"
import AccountModal from "..//components/Modals/AccountModal/AccountModal"
import { Navbar, Nav, Modal, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setAccountModal, setReset, setWalletsModal } from '../store/reducers/generalSlice';
import "./NavBar.css"
import { useWeb3React } from '@web3-react/core';
import Identicon from '../components/Identicon';
import {LinkContainer} from 'react-router-bootstrap'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useLocation } from "react-router-dom";




function NavBar() {
    const dispatch = useDispatch()
    const widget = useSelector(state => state.general.widget)
    const testnet = useSelector(state => state.general.testNet)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const tezosAccount = useSelector(state => state.general.tezosAccount)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const tronWallet = useSelector(state => state.general.tronWallet)
    const { account } = useWeb3React();
    const walletAccount = account || elrondAccount || tezosAccount || algorandAccount || tronWallet
    const location = useLocation()
    
    const handleConnect = () => {
        if(!walletAccount){
        dispatch(setWalletsModal(true))
        }
        else if(walletAccount && location.pathname === "/account")dispatch(setAccountModal(true))
    }

    return (
        !widget && <header id="Header"> 
            <Navbar expand="lg">    
            <LinkContainer to="/connect">
                <Navbar.Brand onClick={() => dispatch(setReset())}  >
                    <img src={Logo} alt="Xp Network"/>
                    <div >MULTICHAIN NFT BRIDGE</div>
                    { testnet && <span className="testnet">TestNet</span>}
                </Navbar.Brand>
            </LinkContainer>
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
                            <Dropdown className='navbar-dropdown'>
                                <DropdownToggle><div className='navbar-dropdown__btn'></div></DropdownToggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item><div className="nav-about">About</div></Dropdown.Item>
                                    <Dropdown.Item><div className="nav-faqs">FAQs</div></Dropdown.Item>
                                    <Dropdown.Item><div className="nav-docs">DOCs</div></Dropdown.Item>
                                    <Dropdown.Item><div className="nav-vid">Video Tutorial</div></Dropdown.Item>
                                    <Dropdown.Item><div className="nav-xpnet">XP.NETWORK</div></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                <AccountModal />
            </Navbar>
        </header>
    )
}

export default NavBar
